import { deleteCategory, getCategoryById } from "@/services/category.service";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const id = params.id;

  const category = await getCategoryById(Number(id));

  return NextResponse.json({ category });
}

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const id = params.id;

  const deleted = await deleteCategory(Number(id));

  return NextResponse.json({ deleted });
}
