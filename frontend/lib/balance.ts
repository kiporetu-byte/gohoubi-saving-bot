import { prisma } from "./prisma";

export async function getBalance(lineUserId: string) {
  const user = await prisma.user.findUnique({
    where: { lineUserId },
    include: { savings: true },
  });

  if (!user) return 0;

  return user.savings.reduce((sum, s) => sum + s.amount, 0);
}
