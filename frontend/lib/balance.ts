import { prisma } from "./prisma";
import { fetchBalanceFromSunabar } from "@/lib/sunabar";

//残高取得
export async function getBalance(lineUserId: string) { 
  const balanceUrl = process.env.SUNABAR_BALANCE_URL;
  const token = process.env.SUNABAR_API_TOKEN;
  const depositAccountId = process.env.SUNABAR_DEPOSIT_ACCOUNT;

  // 🔵 Sunabar設定がある場合はAPIから残高取得
  if (balanceUrl && token && depositAccountId) {
    const data = await fetchBalanceFromSunabar(lineUserId);

    const targetAccount = data.spAccountBalances?.find(
      (account: { accountId?: string; spAccountId?: string; odBalance?: string | number }) =>
        account.accountId === depositAccountId || account.spAccountId === depositAccountId
    );

    return Number(targetAccount?.odBalance ?? 0);
  }

  // 🟡 fallback:
  // Sunabar未設定時（ローカル環境・開発用）はDBの合計を返す
   const savings = await prisma.saving.findMany();
  return savings.reduce((sum, s) => sum + (s.amount ?? 0), 0);
}

// 残高 → LINE表示用
export function formatBalanceMessage(total: number) {
  return `今の残高は${total.toLocaleString()}円です。`;
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

export function getErrorReplyMessage() {
  return formatErrorMessage();
}