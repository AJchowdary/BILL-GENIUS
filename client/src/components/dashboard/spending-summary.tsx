import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { formatCurrency, getCurrentMonth, getMonthName } from "@/lib/utils";
import { ArrowUp, ArrowDown } from "lucide-react";

interface MonthlySummary {
  total: number;
  expenseCount: number;
  changePercent: number;
  budget: number;
  month: number;
  year: number;
}

export default function SpendingSummary() {
  const { year, month } = getCurrentMonth();
  
  const { data: summary, isLoading } = useQuery<MonthlySummary>({
    queryKey: ["/api/analytics/monthly-summary", { year, month }],
  });

  if (isLoading || !summary) {
    return (
      <div className="p-4">
        <Card className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
          <div className="animate-pulse">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="h-6 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="mb-6">
              <div className="h-8 bg-gray-200 rounded w-32 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-40"></div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="h-4 bg-gray-200 rounded w-24"></div>
                <div className="h-4 bg-gray-200 rounded w-20"></div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2"></div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  const budgetProgress = (summary.total / summary.budget) * 100;
  const isOverBudget = budgetProgress > 100;
  const isIncrease = summary.changePercent > 0;

  return (
    <div className="p-4">
      <Card className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-neutral-800 font-semibold text-lg">This Month</h2>
            <p className="text-neutral-500 text-sm">
              {getMonthName(summary.month)} {summary.year}
            </p>
          </div>
          <button className="text-primary text-sm font-medium">View All</button>
        </div>
        
        <div className="mb-6">
          <div className="text-3xl font-bold text-neutral-800 mb-2">
            {formatCurrency(summary.total)}
          </div>
          <div className="flex items-center space-x-2">
            <div className={`flex items-center text-sm ${isIncrease ? 'text-red-500' : 'text-green-500'}`}>
              {isIncrease ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
              <span>{Math.abs(summary.changePercent)}% vs last month</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-neutral-600 text-sm">Budget Progress</span>
            <span className="text-neutral-800 font-medium text-sm">
              {formatCurrency(summary.total)} / {formatCurrency(summary.budget)}
            </span>
          </div>
          <Progress 
            value={Math.min(budgetProgress, 100)} 
            className={`w-full h-2 ${isOverBudget ? 'bg-red-100' : 'bg-neutral-100'}`}
          />
          {isOverBudget && (
            <p className="text-red-500 text-xs">
              Over budget by {formatCurrency(summary.total - summary.budget)}
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}
