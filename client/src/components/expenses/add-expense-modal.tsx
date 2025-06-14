import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { formatDateInput, getCategoryColorClasses } from "@/lib/utils";
import type { Category } from "@shared/schema";
import { Camera, Upload } from "lucide-react";

const addExpenseSchema = z.object({
  amount: z.string().refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, {
    message: "Amount must be a positive number",
  }),
  categoryId: z.number().min(1, "Please select a category"),
  merchant: z.string().optional(),
  description: z.string().optional(),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  notes: z.string().optional(),
  source: z.string().default("manual"),
});

type AddExpenseFormData = z.infer<typeof addExpenseSchema>;

interface AddExpenseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AddExpenseModal({ open, onOpenChange }: AddExpenseModalProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: categories = [] } = useQuery<Category[]>({
    queryKey: ["/api/categories"],
  });

  const form = useForm<AddExpenseFormData>({
    resolver: zodResolver(addExpenseSchema),
    defaultValues: {
      amount: "",
      categoryId: 0,
      merchant: "",
      description: "",
      date: formatDateInput(new Date()),
      notes: "",
      source: "manual",
    },
  });

  const addExpenseMutation = useMutation({
    mutationFn: async (data: AddExpenseFormData) => {
      const response = await apiRequest("POST", "/api/expenses", {
        ...data,
        categoryId: selectedCategoryId,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/expenses"] });
      queryClient.invalidateQueries({ queryKey: ["/api/analytics/monthly-summary"] });
      queryClient.invalidateQueries({ queryKey: ["/api/analytics/category-totals"] });
      toast({
        title: "Success",
        description: "Expense added successfully",
      });
      onOpenChange(false);
      form.reset();
      setSelectedCategoryId(null);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add expense",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: AddExpenseFormData) => {
    if (!selectedCategoryId) {
      toast({
        title: "Error",
        description: "Please select a category",
        variant: "destructive",
      });
      return;
    }
    addExpenseMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-neutral-800">
            Add Expense
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Amount Input */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-neutral-700">
                    Amount
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <span className="text-neutral-500">$</span>
                      </div>
                      <Input
                        {...field}
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="pl-8 text-lg font-medium"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Category
              </label>
              <div className="grid grid-cols-4 gap-2">
                {categories.map((category) => {
                  const { bg, text } = getCategoryColorClasses(category.color);
                  const isSelected = selectedCategoryId === category.id;
                  
                  return (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setSelectedCategoryId(category.id)}
                      className={`flex flex-col items-center p-3 border rounded-xl transition-colors ${
                        isSelected
                          ? "border-primary bg-primary/5"
                          : "border-neutral-200 hover:border-primary"
                      }`}
                    >
                      <div className={`w-8 h-8 ${bg} rounded-lg flex items-center justify-center mb-1`}>
                        <i className={`${category.icon} ${text} text-sm`}></i>
                      </div>
                      <span className="text-xs">{category.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Merchant/Description */}
            <FormField
              control={form.control}
              name="merchant"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-neutral-700">
                    Merchant/Description
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g., Starbucks, Lunch with client"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Receipt Upload */}
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">
                Receipt (Optional)
              </label>
              <div className="border-2 border-dashed border-neutral-200 rounded-xl p-6 text-center hover:border-primary transition-colors cursor-pointer">
                <Camera className="mx-auto h-8 w-8 text-neutral-400 mb-2" />
                <p className="text-neutral-600 text-sm">Tap to take photo or upload receipt</p>
                <p className="text-neutral-400 text-xs mt-1">AI will extract details automatically</p>
              </div>
            </div>

            {/* Date */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-neutral-700">
                    Date
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Notes */}
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-neutral-700">
                    Notes (Optional)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Add any additional details..."
                      rows={3}
                      className="resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                disabled={addExpenseMutation.isPending}
              >
                {addExpenseMutation.isPending ? "Adding..." : "Add Expense"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
