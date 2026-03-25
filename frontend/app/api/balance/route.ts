import { prisma } from "@/lib/prisma";

export async function GET() {
  const savings = await prisma.saving.findMany();

  const total = savings.reduce((sum, s) => sum + s.amount, 0);

  return Response.json({ total });
}