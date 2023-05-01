import { Expense } from "@/../../packages/database";
import {
  getExpenses,
  createExpense,
  updateExpense,
  removeCategoryFromExpense,
} from "@/services/expense.service";
import { NextResponse } from "next/server";

export async function GET() {
  const expenses = await getExpenses();
  return NextResponse.json({ expenses });
}

export async function POST(request: Request) {
  const {
    categories,
    ...expense
  }: Partial<Expense> & { categories: number[] } = await request.json();

  const newExpense = await createExpense(expense, categories);

  // if error ,return error message
  if (newExpense instanceof Error) {
    return NextResponse.json({ error: newExpense.message }, { status: 400 });
  }

  return NextResponse.json({ expense: newExpense });
}

export async function PUT(request: Request) {
  const {
    id,
    categories,
    ...expense
  }: Partial<Expense> & { id: number; categories?: number[] } =
    await request.json();
  const updatedExpense = await updateExpense(id, expense, categories);
  return NextResponse.json({ expense: updatedExpense });
}

export async function PATCH(request: Request) {
  const { expenseId, categoryId } = await request.json();
  const removedCategory = await removeCategoryFromExpense(
    expenseId,
    categoryId
  );
  return NextResponse.json({ expenseCategory: removedCategory });
}
