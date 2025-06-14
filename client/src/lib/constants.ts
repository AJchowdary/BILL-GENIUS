export const EXPENSE_CATEGORIES = [
  { id: 1, name: "Food", icon: "fas fa-utensils", color: "blue" },
  { id: 2, name: "Transport", icon: "fas fa-car", color: "green" },
  { id: 3, name: "Shopping", icon: "fas fa-shopping-bag", color: "purple" },
  { id: 4, name: "Business", icon: "fas fa-briefcase", color: "amber" },
  { id: 5, name: "Entertainment", icon: "fas fa-film", color: "red" },
  { id: 6, name: "Health", icon: "fas fa-heart", color: "pink" },
  { id: 7, name: "Education", icon: "fas fa-graduation-cap", color: "indigo" },
  { id: 8, name: "Utilities", icon: "fas fa-bolt", color: "yellow" },
];

export const EXPENSE_SOURCES = {
  MANUAL: "manual",
  AI_SCAN: "ai_scan",
  BANK_SYNC: "bank_sync",
} as const;

export const SOURCE_LABELS = {
  [EXPENSE_SOURCES.MANUAL]: "Manual Entry",
  [EXPENSE_SOURCES.AI_SCAN]: "AI Matched",
  [EXPENSE_SOURCES.BANK_SYNC]: "Auto-Synced",
};

export const SOURCE_COLORS = {
  [EXPENSE_SOURCES.MANUAL]: "bg-amber-100 text-amber-700",
  [EXPENSE_SOURCES.AI_SCAN]: "bg-green-100 text-green-700",
  [EXPENSE_SOURCES.BANK_SYNC]: "bg-blue-100 text-blue-700",
};

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
