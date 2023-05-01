import {
  addCategoryToExpense,
  deleteExpense,
  getExpenseById,
} from "@/services/expense.service";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const expense = await getExpenseById(id);
  return NextResponse.json({ expense });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const deletedExpense = await deleteExpense(Number(id));
  return NextResponse.json({ expense: deletedExpense });
}

export async function PATCH(
  request: Request,
  { params, body }: { params: { id: string }; body: { categoryId: number } }
) {
  const expenseId = Number(params.id);
  const { categoryId } = body;

  const updatedExpense = await addCategoryToExpense(expenseId, categoryId);

  return NextResponse.json({ expense: updatedExpense });
}
