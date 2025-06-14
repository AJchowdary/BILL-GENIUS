import { 
  users, 
  categories, 
  expenses, 
  type User, 
  type InsertUser, 
  type Category, 
  type InsertCategory, 
  type Expense, 
  type InsertExpense,
  type ExpenseWithCategory 
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Categories
  getAllCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;
  
  // Expenses
  getExpensesByUserId(userId: number): Promise<ExpenseWithCategory[]>;
  getExpensesByUserIdAndMonth(userId: number, year: number, month: number): Promise<ExpenseWithCategory[]>;
  getExpensesByUserIdAndPeriod(userId: number, period: 'day' | 'week' | 'month' | 'year', date?: Date): Promise<ExpenseWithCategory[]>;
  createExpense(expense: InsertExpense): Promise<Expense>;
  updateExpense(id: number, expense: Partial<InsertExpense>): Promise<Expense | undefined>;
  deleteExpense(id: number): Promise<boolean>;
  getCategoryTotals(userId: number, year: number, month: number): Promise<{ categoryId: number; categoryName: string; total: number; color: string; icon: string }[]>;
  getCategoryTotalsByPeriod(userId: number, period: 'day' | 'week' | 'month' | 'year', date?: Date): Promise<{ categoryId: number; categoryName: string; total: number; color: string; icon: string }[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private expenses: Map<number, Expense>;
  private currentUserId: number;
  private currentCategoryId: number;
  private currentExpenseId: number;

  constructor() {
    this.users = new Map();
    this.categories = new Map();
    this.expenses = new Map();
    this.currentUserId = 1;
    this.currentCategoryId = 1;
    this.currentExpenseId = 1;
    
    // Initialize default categories
    this.initializeDefaultCategories();
  }

  private initializeDefaultCategories() {
    const defaultCategories = [
      { name: "Food", icon: "fas fa-utensils", color: "blue" },
      { name: "Transport", icon: "fas fa-car", color: "green" },
      { name: "Shopping", icon: "fas fa-shopping-bag", color: "purple" },
      { name: "Business", icon: "fas fa-briefcase", color: "amber" },
      { name: "Entertainment", icon: "fas fa-film", color: "red" },
      { name: "Health", icon: "fas fa-heart", color: "pink" },
      { name: "Education", icon: "fas fa-graduation-cap", color: "indigo" },
      { name: "Utilities", icon: "fas fa-bolt", color: "yellow" },
    ];

    defaultCategories.forEach(cat => {
      const category: Category = {
        id: this.currentCategoryId++,
        name: cat.name,
        icon: cat.icon,
        color: cat.color,
      };
      this.categories.set(category.id, category);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  async getExpensesByUserId(userId: number): Promise<ExpenseWithCategory[]> {
    const userExpenses = Array.from(this.expenses.values())
      .filter(expense => expense.userId === userId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return userExpenses.map(expense => ({
      ...expense,
      category: this.categories.get(expense.categoryId)!,
    }));
  }

  async getExpensesByUserIdAndMonth(userId: number, year: number, month: number): Promise<ExpenseWithCategory[]> {
    const userExpenses = Array.from(this.expenses.values())
      .filter(expense => {
        if (expense.userId !== userId) return false;
        const expenseDate = new Date(expense.date);
        return expenseDate.getFullYear() === year && expenseDate.getMonth() === month - 1;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return userExpenses.map(expense => ({
      ...expense,
      category: this.categories.get(expense.categoryId)!,
    }));
  }

  async createExpense(insertExpense: InsertExpense): Promise<Expense> {
    const id = this.currentExpenseId++;
    const expense: Expense = {
      id,
      userId: insertExpense.userId!,
      amount: insertExpense.amount,
      categoryId: insertExpense.categoryId!,
      merchant: insertExpense.merchant || null,
      description: insertExpense.description || null,
      date: new Date(insertExpense.date),
      receiptUrl: insertExpense.receiptUrl || null,
      notes: insertExpense.notes || null,
      source: insertExpense.source || "manual",
      createdAt: new Date(),
    };
    this.expenses.set(id, expense);
    return expense;
  }

  async updateExpense(id: number, updateData: Partial<InsertExpense>): Promise<Expense | undefined> {
    const expense = this.expenses.get(id);
    if (!expense) return undefined;

    const updatedExpense = {
      ...expense,
      ...updateData,
      date: updateData.date ? new Date(updateData.date) : expense.date,
    };
    this.expenses.set(id, updatedExpense);
    return updatedExpense;
  }

  async deleteExpense(id: number): Promise<boolean> {
    return this.expenses.delete(id);
  }

  async getCategoryTotals(userId: number, year: number, month: number): Promise<{ categoryId: number; categoryName: string; total: number; color: string; icon: string }[]> {
    const monthlyExpenses = await this.getExpensesByUserIdAndMonth(userId, year, month);
    
    const categoryTotals = new Map<number, number>();
    
    monthlyExpenses.forEach(expense => {
      const current = categoryTotals.get(expense.categoryId) || 0;
      categoryTotals.set(expense.categoryId, current + parseFloat(expense.amount));
    });

    const result = Array.from(categoryTotals.entries()).map(([categoryId, total]) => {
      const category = this.categories.get(categoryId)!;
      return {
        categoryId,
        categoryName: category.name,
        total,
        color: category.color,
        icon: category.icon,
      };
    });

    return result.sort((a, b) => b.total - a.total);
  }

  async getExpensesByUserIdAndPeriod(userId: number, period: 'day' | 'week' | 'month' | 'year', date: Date = new Date()): Promise<ExpenseWithCategory[]> {
    const userExpenses = Array.from(this.expenses.values())
      .filter(expense => {
        if (expense.userId !== userId) return false;
        
        const expenseDate = new Date(expense.date);
        const referenceDate = new Date(date);
        
        switch (period) {
          case 'day':
            return expenseDate.toDateString() === referenceDate.toDateString();
          
          case 'week':
            const weekStart = new Date(referenceDate);
            weekStart.setDate(referenceDate.getDate() - referenceDate.getDay());
            weekStart.setHours(0, 0, 0, 0);
            
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);
            weekEnd.setHours(23, 59, 59, 999);
            
            return expenseDate >= weekStart && expenseDate <= weekEnd;
          
          case 'month':
            return expenseDate.getFullYear() === referenceDate.getFullYear() && 
                   expenseDate.getMonth() === referenceDate.getMonth();
          
          case 'year':
            return expenseDate.getFullYear() === referenceDate.getFullYear();
          
          default:
            return false;
        }
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return userExpenses.map(expense => ({
      ...expense,
      category: this.categories.get(expense.categoryId)!,
    }));
  }

  async getCategoryTotalsByPeriod(userId: number, period: 'day' | 'week' | 'month' | 'year', date: Date = new Date()): Promise<{ categoryId: number; categoryName: string; total: number; color: string; icon: string }[]> {
    const periodExpenses = await this.getExpensesByUserIdAndPeriod(userId, period, date);
    
    const categoryTotals = new Map<number, number>();
    
    periodExpenses.forEach(expense => {
      const current = categoryTotals.get(expense.categoryId) || 0;
      categoryTotals.set(expense.categoryId, current + parseFloat(expense.amount));
    });

    const result = Array.from(categoryTotals.entries()).map(([categoryId, total]) => {
      const category = this.categories.get(categoryId)!;
      return {
        categoryId,
        categoryName: category.name,
        total,
        color: category.color,
        icon: category.icon,
      };
    });

    return result.sort((a, b) => b.total - a.total);
  }
}

export const storage = new MemStorage();
