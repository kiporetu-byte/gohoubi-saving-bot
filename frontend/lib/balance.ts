import { prisma } from "./prisma";
import { fetchBalanceFromSunabar } from "@/lib/sunabar";

//残高取得
export async function getBalance() { 
  const balanceUrl = process.env.SUNABAR_BALANCE_URL;
  const token = process.env.SUNABAR_API_TOKEN;

  // 🔵 Sunabar設定がある場合はAPIから残高取得
  if (balanceUrl && token) {
    const data = await fetchBalanceFromSunabar();

    // spAccountBalances → つかいわけ口座の残高
    return Number(data.spAccountBalances?.[0]?.odBalance ?? 0);
  }

  // 🟡 fallback:
  // Sunabar未設定時（ローカル環境・開発用）はDBの合計を返す
   const savings = await prisma.saving.findMany();
  return savings.reduce((sum, s) => sum + (s.amount ?? 0), 0);
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

// 履歴 → LINE表示用
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

// C担当が呼ぶ用
export function getBalanceReplyMessage(total: number) {
  return formatBalanceMessage(total);
}

export function getSavingReplyMessage(amount: number, total: number) {
  return formatSavingMessage(amount, total);
}

export function getHistoryReplyMessage(
  history: { actionLabel: string; amount: number }[]
) {
  return formatHistoryMessage(history);
}

export function getErrorReplyMessage() {
  return formatErrorMessage();
}