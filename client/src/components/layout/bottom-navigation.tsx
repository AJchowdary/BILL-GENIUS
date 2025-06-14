import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", icon: "fas fa-home", label: "Home" },
  { path: "/analytics", icon: "fas fa-chart-pie", label: "Analytics" },
  { path: "/scan", icon: "fas fa-camera", label: "Scan" },
  { path: "/expenses", icon: "fas fa-list", label: "Expenses" },
  { path: "/settings", icon: "fas fa-cog", label: "Settings" },
];

export default function BottomNavigation() {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-neutral-100 z-50">
      <div className="max-w-md mx-auto px-4 py-2">
        <div className="flex items-center justify-around">
          {navItems.map((item) => {
            const isActive = location === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <button
                  className={cn(
                    "flex flex-col items-center py-2 px-3 transition-colors",
                    isActive ? "text-primary" : "text-neutral-400 hover:text-primary"
                  )}
                >
                  <i className={`${item.icon} text-lg mb-1`}></i>
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
