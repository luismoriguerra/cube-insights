import {
  createCategory,
  deleteCategory,
  getCategories,
} from "@/services/category.service";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const users = await getCategories();

  return new Response(JSON.stringify(users), {
    headers: { "content-type": "application/json" },
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  const category = await createCategory({
    name: body.name,
  });
  return NextResponse.json({ category });
}
