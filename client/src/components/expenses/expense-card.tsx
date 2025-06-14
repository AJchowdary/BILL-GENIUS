import { formatCurrency, formatDate, getCategoryColorClasses } from "@/lib/utils";
import { SOURCE_LABELS, SOURCE_COLORS } from "@/lib/constants";
import type { ExpenseWithCategory } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Receipt } from "lucide-react";

interface ExpenseCardProps {
  expense: ExpenseWithCategory;
  onEdit?: (expense: ExpenseWithCategory) => void;
  onDelete?: (id: number) => void;
}

export default function ExpenseCard({ expense, onEdit, onDelete }: ExpenseCardProps) {
  const { bg, text } = getCategoryColorClasses(expense.category.color);
  const sourceLabel = SOURCE_LABELS[expense.source as keyof typeof SOURCE_LABELS];
  const sourceColor = SOURCE_COLORS[expense.source as keyof typeof SOURCE_COLORS];

  return (
    <div className="bg-white rounded-xl p-4 border border-neutral-100 flex items-center space-x-4">
      <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
        <i className={`${expense.category.icon} ${text}`}></i>
      </div>
      
      <div className="flex-1 min-w-0">
        <h4 className="text-neutral-800 font-medium text-sm">
          {expense.merchant || expense.description || "Expense"}
        </h4>
        <p className="text-neutral-500 text-xs">
          {expense.category.name} • {formatDate(expense.date)}
        </p>
        {expense.notes && (
          <p className="text-neutral-400 text-xs mt-1 truncate">
            {expense.notes}
          </p>
        )}
        <div className="flex items-center space-x-2 mt-1">
          <span className={`text-xs px-2 py-1 rounded-full ${sourceColor}`}>
            {sourceLabel}
          </span>
          {expense.receiptUrl && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
              <Receipt className="inline w-3 h-3 mr-1" />
              Receipt
            </span>
          )}
        </div>
      </div>
      
      <div className="text-right flex flex-col items-end space-y-2">
        <p className="text-neutral-800 font-semibold">
          -{formatCurrency(expense.amount)}
        </p>
        <div className="flex space-x-1">
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-neutral-400 hover:text-neutral-600"
              onClick={() => onEdit(expense)}
            >
              <Edit className="h-3 w-3" />
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 text-neutral-400 hover:text-red-500"
              onClick={() => onDelete(expense.id)}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
