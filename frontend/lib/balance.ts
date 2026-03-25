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

  return `最近の貯金履歴です\n${lines.join("\n")}`;
}

// 貯金成功 → LINE表示用
export function formatSavingMessage(amount: number, total: number) {
  return `＋${amount.toLocaleString()}円貯金しました！\n今の残高は${total.toLocaleString()}円です。`;
}

// エラー → LINE表示用
export function formatErrorMessage() {
  return "エラーが発生しました。時間をおいてもう一度お試しください。";
}

console.log(formatBalanceMessage(4500));
console.log(formatSavingMessage(500, 4500));
console.log(formatErrorMessage());
console.log(
  formatHistoryMessage([
    { actionLabel: "運動", amount: 1000 },
    { actionLabel: "スタバ我慢", amount: 500 },
  ])
);