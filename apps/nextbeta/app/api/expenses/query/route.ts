import { findOrCreateCategoryByName } from "@/services/category.service";
import { createExpense, getExpenses } from "@/services/expense.service";
import { NextResponse } from "next/server";
import { text } from "stream/consumers";

//"2023-01-01, gasto  menu, 10, category-1,category-2"
function parseExpenseText(text: string): {
  date: string;
  description: string;
  amount: number;
  categoryNames: string[];
} {
  const [date, description, amount, ...categoryNames] = text
    .split(",")
    .map((part) => part.trim());

  return {
    date,
    description,
    amount: Number(amount),
    categoryNames,
  };
}

export async function POST(request: Request) {
  const { query } = await request.json();
  const { date, description, amount, categoryNames } = parseExpenseText(query);

  console.log(
    "> date, description, amount, categoryNames ",
    JSON.stringify({ date, description, amount, categoryNames }, null, 2)
  );

  const categories = await Promise.all(
    categoryNames.map(async (name) => await findOrCreateCategoryByName(name))
  );

  const newExpense = await createExpense(
    { description, amount },
    categories.map((category) => category.id),
    new Date(date)
  );

  return NextResponse.json({ expense: newExpense });
}
