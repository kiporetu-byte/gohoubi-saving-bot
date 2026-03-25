import { prisma } from "@/lib/prisma";

export async function GET() {
  const savings = await prisma.saving.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json(savings);
}