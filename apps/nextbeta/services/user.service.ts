import { User } from "@/../../packages/database";
import { prismaClient } from "./prisma";

const prisma = prismaClient;

export async function getUsers(): Promise<User[]> {
  return await prisma.user.findMany();
}

export async function createUser(user: User): Promise<User> {
  return await prisma.user.create({ data: user });
}

export async function updateUser(
  id: number,
  user: Partial<User>
): Promise<User> {
  return await prisma.user.update({ where: { id }, data: user });
}

export async function deleteUser(id: number): Promise<User> {
  return await prisma.user.delete({ where: { id } });
}
