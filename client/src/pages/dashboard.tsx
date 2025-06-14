import { useState } from "react";
import Header from "@/components/layout/header";
import BottomNavigation from "@/components/layout/bottom-navigation";
import SpendingSummary from "@/components/dashboard/spending-summary";
import CategoryOverview from "@/components/dashboard/category-overview";
import RecentExpenses from "@/components/dashboard/recent-expenses";
import FloatingActionButton from "@/components/ui/floating-action-button";
import AddExpenseModal from "@/components/expenses/add-expense-modal";

export default function Dashboard() {
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      
      <main className="max-w-md mx-auto pb-20">
        <SpendingSummary />
        <CategoryOverview />
        <RecentExpenses />
      </main>

      <FloatingActionButton onClick={() => setIsAddExpenseOpen(true)} />
      <BottomNavigation />
      
      <AddExpenseModal 
        open={isAddExpenseOpen} 
        onOpenChange={setIsAddExpenseOpen}
      />
    </div>
  );
}
