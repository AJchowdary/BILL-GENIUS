import { useQuery } from "@tanstack/react-query";
import { formatCurrency, getCurrentMonth, getCategoryColorClasses } from "@/lib/utils";

interface CategoryTotal {
  categoryId: number;
  categoryName: string;
  total: number;
  color: string;
  icon: string;
}

export default function CategoryOverview() {
  const { year, month } = getCurrentMonth();
  
  const { data: categoryTotals = [], isLoading } = useQuery<CategoryTotal[]>({
    queryKey: ["/api/analytics/category-totals", { year, month }],
  });

  if (isLoading) {
    return (
      <section className="px-4 mb-6">
        <h3 className="text-neutral-800 font-semibold mb-4">Categories</h3>
        <div className="grid grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl p-4 text-center border border-neutral-100 animate-pulse">
              <div className="w-10 h-10 bg-gray-200 rounded-lg mx-auto mb-2"></div>
              <div className="h-3 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Show top 4 categories or all if less than 4
  const displayCategories = categoryTotals.slice(0, 4);

  return (
    <section className="px-4 mb-6">
      <h3 className="text-neutral-800 font-semibold mb-4">Categories</h3>
      <div className="grid grid-cols-4 gap-3">
        {displayCategories.map((category) => {
          const { bg, text } = getCategoryColorClasses(category.color);
          
          return (
            <div
              key={category.categoryId}
              className="bg-white rounded-xl p-4 text-center border border-neutral-100 hover:border-primary transition-colors cursor-pointer"
            >
              <div className={`w-10 h-10 ${bg} rounded-lg flex items-center justify-center mx-auto mb-2`}>
                <i className={`${category.icon} ${text}`}></i>
              </div>
              <p className="text-xs text-neutral-600 font-medium">{category.categoryName}</p>
              <p className="text-xs text-neutral-800 font-semibold mt-1">
                {formatCurrency(category.total)}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
