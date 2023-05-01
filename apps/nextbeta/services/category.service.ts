import { Category } from "@/../../packages/database";
import { prismaClient } from "./prisma";

const prisma = prismaClient;

export async function getCategoryById(id: number): Promise<Category | null> {
  return await prisma.category.findUnique({
    where: { id },
  });
}

export async function getCategories(): Promise<Category[]> {
  return await prisma.category.findMany();
}

export async function createCategory(
  category: Partial<Category>
): Promise<Category> {
  return await prisma.category.create({ data: category });
}

export async function updateCategory(
  id: number,
  category: Partial<Category>
): Promise<Category> {
  return await prisma.category.update({ where: { id }, data: category });
}

export async function deleteCategory(categoryId: number): Promise<Category> {
  // return await prisma.category.delete({ where: { id } });

  await prisma.expenseCategory.deleteMany({
    where: { categoryId },
  });

  // Then, delete the category
  const deletedCategory = await prisma.category.delete({
    where: { id: categoryId },
  });

  return deletedCategory;
}

export async function findOrCreateCategoryByName(
  name: string
): Promise<Category> {
  return await prisma.category.upsert({
    where: { name },
    update: {},
    create: { name },
  });
}
