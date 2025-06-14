import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/layout/header";
import BottomNavigation from "@/components/layout/bottom-navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency, getCurrentMonth, getMonthName, getCategoryColorClasses } from "@/lib/utils";
import { BarChart3, PieChart, TrendingUp } from "lucide-react";

interface CategoryTotal {
  categoryId: number;
  categoryName: string;
  total: number;
  color: string;
  icon: string;
}

interface MonthlySummary {
  total: number;
  expenseCount: number;
  changePercent: number;
  budget: number;
  month: number;
  year: number;
}

type TimePeriod = "day" | "week" | "month" | "year";

export default function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("month");
  const { year, month } = getCurrentMonth();
  
  // Helper function to get period display text
  const getPeriodDisplayText = () => {
    const now = new Date();
    switch (selectedPeriod) {
      case "day":
        return `Today, ${now.toLocaleDateString("en-US", { month: "short", day: "numeric" })}`;
      case "week":
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        return `This Week (${weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })})`;
      case "month":
        return `${getMonthName(month)} ${year}`;
      case "year":
        return `${year}`;
      default:
        return `${getMonthName(month)} ${year}`;
    }
  };

  // Use a stable date reference to prevent infinite queries
  const currentDate = new Date().toISOString().split('T')[0]; // Just the date part

  const { data: categoryTotals = [] } = useQuery<CategoryTotal[]>({
    queryKey: ["/api/analytics/category-totals", selectedPeriod, currentDate],
  });

  const { data: summary } = useQuery<MonthlySummary>({
    queryKey: ["/api/analytics/monthly-summary", selectedPeriod, currentDate],
  });

  const timePeriods = [
    { key: "day" as TimePeriod, label: "Day" },
    { key: "week" as TimePeriod, label: "Week" },
    { key: "month" as TimePeriod, label: "Month" },
    { key: "year" as TimePeriod, label: "Year" },
  ];

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <main className="max-w-md mx-auto pb-20 p-4">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-neutral-800 mb-2">Analytics</h2>
          <p className="text-neutral-500">
            {getPeriodDisplayText()} spending insights
          </p>
        </div>

        {/* Time Period Tabs */}
        <div className="mb-6">
          <div className="flex bg-white rounded-xl p-1 border border-neutral-100">
            {timePeriods.map((period) => (
              <Button
                key={period.key}
                onClick={() => setSelectedPeriod(period.key)}
                variant={selectedPeriod === period.key ? "default" : "ghost"}
                className={`flex-1 text-sm ${
                  selectedPeriod === period.key
                    ? "bg-primary text-white shadow-sm"
                    : "text-neutral-600 hover:text-neutral-800"
                }`}
                size="sm"
              >
                {period.label}
              </Button>
            ))}
          </div>
        </div>

        {summary && (
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Monthly Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-neutral-500 text-sm">Total Spent</p>
                  <p className="text-2xl font-bold text-neutral-800">
                    {formatCurrency(summary.total)}
                  </p>
                </div>
                <div>
                  <p className="text-neutral-500 text-sm">Transactions</p>
                  <p className="text-2xl font-bold text-neutral-800">
                    {summary.expenseCount}
                  </p>
                </div>
                <div>
                  <p className="text-neutral-500 text-sm">Budget Left</p>
                  <p className="text-2xl font-bold text-neutral-800">
                    {formatCurrency(Math.max(0, summary.budget - summary.total))}
                  </p>
                </div>
                <div>
                  <p className="text-neutral-500 text-sm">Avg per Day</p>
                  <p className="text-2xl font-bold text-neutral-800">
                    {formatCurrency(summary.total / new Date().getDate())}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <PieChart className="w-5 h-5 mr-2" />
              Spending by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            {categoryTotals.length === 0 ? (
              <div className="text-center py-8">
                <BarChart3 className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                <p className="text-neutral-500">No expenses to analyze</p>
                <p className="text-neutral-400 text-sm">Start adding expenses to see insights</p>
              </div>
            ) : (
              <div className="space-y-4">
                {categoryTotals.map((category) => {
                  const { bg, text } = getCategoryColorClasses(category.color);
                  const percentage = summary ? (category.total / summary.total) * 100 : 0;
                  
                  return (
                    <div key={category.categoryId} className="flex items-center space-x-4">
                      <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center`}>
                        <i className={`${category.icon} ${text}`}></i>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-neutral-800">
                            {category.categoryName}
                          </span>
                          <span className="text-neutral-600 font-semibold">
                            {formatCurrency(category.total)}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-neutral-100 rounded-full h-2">
                            <div
                              className="bg-primary h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-xs text-neutral-500">
                            {percentage.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <BottomNavigation />
    </div>
  );
}
