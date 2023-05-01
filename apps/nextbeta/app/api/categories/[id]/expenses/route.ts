import { getExpensesByCategory } from "@/services/expense.service";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const categoryId = Number(params.id);
  const expenses = await getExpensesByCategory(categoryId);
  return NextResponse.json({ expenses });
}
