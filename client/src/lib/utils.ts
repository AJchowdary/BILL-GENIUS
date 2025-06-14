import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number | string): string {
  const numAmount = typeof amount === "string" ? parseFloat(amount) : amount;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(numAmount);
}

export function formatDate(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  
  if (dateObj.toDateString() === today.toDateString()) {
    return "Today";
  } else if (dateObj.toDateString() === yesterday.toDateString()) {
    return "Yesterday";
  } else {
    return dateObj.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric" 
    });
  }
}

export function formatDateInput(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toISOString().split('T')[0];
}

export function getCategoryColorClasses(color: string): { bg: string; text: string } {
  const colorMap = {
    blue: { bg: "bg-blue-50", text: "text-blue-500" },
    green: { bg: "bg-green-50", text: "text-green-500" },
    purple: { bg: "bg-purple-50", text: "text-purple-500" },
    amber: { bg: "bg-amber-50", text: "text-amber-500" },
    red: { bg: "bg-red-50", text: "text-red-500" },
    pink: { bg: "bg-pink-50", text: "text-pink-500" },
    indigo: { bg: "bg-indigo-50", text: "text-indigo-500" },
    yellow: { bg: "bg-yellow-50", text: "text-yellow-500" },
  };
  
  return colorMap[color as keyof typeof colorMap] || { bg: "bg-gray-50", text: "text-gray-500" };
}

export function getCurrentMonth(): { year: number; month: number } {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  };
}

export function getMonthName(month: number): string {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  return months[month - 1] || "";
}
