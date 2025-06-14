import { useQuery } from "@tanstack/react-query";
import { formatCurrency, formatDate, getCategoryColorClasses, getCurrentMonth } from "@/lib/utils";
import { SOURCE_LABELS, SOURCE_COLORS } from "@/lib/constants";
import type { ExpenseWithCategory } from "@shared/schema";

export default function RecentExpenses() {
  const { year, month } = getCurrentMonth();
  
  const { data: expenses = [], isLoading } = useQuery<ExpenseWithCategory[]>({
    queryKey: ["/api/expenses", { year, month }],
  });

  if (isLoading) {
    return (
      <section className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-neutral-800 font-semibold">Recent Expenses</h3>
          <button className="text-primary text-sm font-medium">See All</button>
        </div>
        
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-4 border border-neutral-100 flex items-center space-x-4 animate-pulse">
              <div className="w-12 h-12 bg-gray-200 rounded-xl flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded mb-2 w-1/2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
              <div className="text-right">
                <div className="h-4 bg-gray-200 rounded mb-2 w-16"></div>
                <div className="h-3 bg-gray-200 rounded w-8"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  const recentExpenses = expenses.slice(0, 5);

  if (recentExpenses.length === 0) {
    return (
      <section className="px-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-neutral-800 font-semibold">Recent Expenses</h3>
        </div>
        <div className="bg-white rounded-xl p-8 text-center border border-neutral-100">
          <i className="fas fa-receipt text-4xl text-neutral-300 mb-4"></i>
          <p className="text-neutral-500">No expenses yet</p>
          <p className="text-neutral-400 text-sm mt-1">Add your first expense to get started</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-neutral-800 font-semibold">Recent Expenses</h3>
        <button className="text-primary text-sm font-medium">See All</button>
      </div>
      
      <div className="space-y-3">
        {recentExpenses.map((expense) => {
          const { bg, text } = getCategoryColorClasses(expense.category.color);
          const sourceLabel = SOURCE_LABELS[expense.source as keyof typeof SOURCE_LABELS];
          const sourceColor = SOURCE_COLORS[expense.source as keyof typeof SOURCE_COLORS];
          
          return (
            <div
              key={expense.id}
              className="bg-white rounded-xl p-4 border border-neutral-100 flex items-center space-x-4"
            >
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
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`text-xs px-2 py-1 rounded-full ${sourceColor}`}>
                    {sourceLabel}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-neutral-800 font-semibold">
                  -{formatCurrency(expense.amount)}
                </p>
                <button className="text-neutral-400 hover:text-neutral-600 mt-1">
                  {expense.receiptUrl ? (
                    <i className="fas fa-receipt text-xs"></i>
                  ) : (
                    <i className="fas fa-edit text-xs"></i>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
