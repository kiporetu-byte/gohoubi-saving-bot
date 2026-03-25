import { prisma } from "./prisma";

//残高取得
export async function getBalance(lineUserId: string) {
  const user = await prisma.user.findUnique({
    where: { lineUserId },
    include: { savings: true },
  });

  if (!user) return 0;

  return user.savings.reduce((sum, s) => sum + s.amount, 0);
}

//履歴取得
export async function getHistory(lineUserId: string, limit = 5) {
  const user = await prisma.user.findUnique({
    where: { lineUserId },
    include: {
      savings: {
        orderBy: { createdAt: "desc" },
        take: limit,
      },
    },
  });

  if (!user) return [];

  return user.savings;
}

// 残高 → LINE表示用
export function formatBalanceMessage(total: number) {
  return `今の残高は${total.toLocaleString()}円です。`;
}

//履歴 → LINE表示用
export function formatHistoryMessage(
  history: { actionLabel: string; amount: number }[]
) {
  if (history.length === 0) {
    return "まだ貯金履歴がありません。";
  }

  const lines = history.map(
    (item) => `・${item.actionLabel} +${item.amount.toLocaleString()}円`
  );

  return ["最近の貯金履歴です", ...lines].join("\n");
}