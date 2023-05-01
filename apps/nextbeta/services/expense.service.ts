import { Expense, ExpenseCategory } from "@/../../packages/database";
import { prismaClient } from "./prisma";

const prisma = prismaClient;

export async function getExpenseById(id: number): Promise<Expense | null> {
  return await prisma.expense.findUnique({
    where: { id },
    include: { expenseCategory: { include: { category: true } } },
  });
}

export async function getExpenses(): Promise<Expense[]> {
  return await prisma.expense.findMany({
    include: { expenseCategory: { include: { category: true } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function createExpense(
  expense: Partial<Expense>,
  categoryIds: number[],
  createdAt?: Date
): Promise<Expense> {
  return await prisma.expense.create({
    data: {
      ...expense,
      createdAt: createdAt || undefined,
      expenseCategory: {
        create: categoryIds.map((categoryId) => ({ categoryId })),
      },
    },
    include: { expenseCategory: { include: { category: true } } },
  });
}

export async function updateExpense(
  id: number,
  expense: Partial<Expense>,
  categoryIds?: number[]
): Promise<Expense> {
  const updatedExpense = await prisma.expense.update({
    where: { id },
    data: {
      ...expense,
      expenseCategory: categoryIds
        ? {
            set: [],
            create: categoryIds.map((categoryId) => ({ categoryId })),
          }
        : undefined,
    },
    include: { expenseCategory: { include: { category: true } } },
  });

  return updatedExpense;
}

export async function deleteExpense(expenseId: number): Promise<Expense> {
  await prisma.expenseCategory.deleteMany({
    where: { expenseId },
  });

  // Then, delete the expense
  const deletedExpense = await prisma.expense.delete({
    where: { id: expenseId },
  });

  return deletedExpense;
}

export async function removeCategoryFromExpense(
  expenseId: number,
  categoryId: number
): Promise<ExpenseCategory> {
  return await prisma.expenseCategory.delete({
    where: {
      expenseId_categoryId: {
        expenseId,
        categoryId,
      },
    },
  });
}

export async function getExpensesByCategory(
  categoryId: number
): Promise<Expense[]> {
  return await prisma.expense.findMany({
    include: { expenseCategory: { include: { category: true } } },
    where: { expenseCategory: { some: { categoryId } } },
    orderBy: { createdAt: "desc" },
  });
}

export async function addCategoryToExpense(
  expenseId: number,
  categoryId: number
): Promise<Expense> {
  await prisma.expenseCategory.create({
    data: {
      expenseId,
      categoryId,
    },
  });

  const updatedExpense = await prisma.expense.findUnique({
    where: { id: expenseId },
    include: { expenseCategory: { include: { category: true } } },
  });

  return updatedExpense!;
}
