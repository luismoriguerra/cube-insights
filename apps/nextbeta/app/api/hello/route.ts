import { prismaClient } from "@/services/prisma";
import { getUsers } from "@/services/user.service";

export async function GET(request: Request) {
  const users = await getUsers();

  return new Response(JSON.stringify(users), {
    headers: { "content-type": "application/json" },
  });
}
