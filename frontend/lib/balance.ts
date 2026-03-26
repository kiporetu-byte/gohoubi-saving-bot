import { prisma } from "./prisma";
import { fetchBalanceFromSunabar } from "@/lib/sunabar";

//残高取得
export async function getBalance(lineUserId: string) {
  const balanceUrl = process.env.SUNABAR_BALANCE_URL;
  const token = process.env.SUNABAR_API_TOKEN;
  const depositAccountId = process.env.SUNABAR_DEPOSIT_ACCOUNT;

  console.log("getBalance lineUserId:", lineUserId);
  console.log("SUNABAR_BALANCE_URL exists:", !!balanceUrl);
  console.log("SUNABAR_API_TOKEN exists:", !!token);
  console.log("SUNABAR_DEPOSIT_ACCOUNT:", depositAccountId);

  // Sunabar設定がある場合はAPIから残高取得
  if (balanceUrl && token && depositAccountId) {
    const data = await fetchBalanceFromSunabar(lineUserId);

    const targetAccount = data.spAccountBalances?.find(
      (account: {
        accountId?: string;
        spAccountId?: string;
        odBalance?: string | number;
      }) =>
        account.accountId === depositAccountId ||
        account.spAccountId === depositAccountId
    );

    console.log("targetAccount:", targetAccount);

    return Number(targetAccount?.odBalance ?? 0);
  }

  // fallback: ユーザー別にDB合計を返す
  const user = await prisma.user.findUnique({
    where: { lineUserId },
    include: { savings: true },
  });

  console.log("fallback user:", user);

  if (!user) return 0;

  return user.savings.reduce(
    (sum: number, s: { amount?: number }) => sum + (s.amount ?? 0),
    0
  );
}