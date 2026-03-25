import { prisma } from "./prisma";

export async function saveAction({
  lineUserId,
  actionType,
  actionLabel,
  amount,
  messageText,
  lineEventId,
}: {
  lineUserId: string;
  actionType: "EXERCISE" | "SKIP_STARBUCKS";
  actionLabel: string;
  amount: number;
  messageText?: string;
  lineEventId?: string;
}) {
  // ユーザー取得 or 作成
  const user = await prisma.user.upsert({
    where: { lineUserId },
    update: {},
    create: { lineUserId },
  });

  // 貯金保存
  const saving = await prisma.saving.create({
    data: {
      userId: user.id,
      actionType,
      actionLabel,
      amount,
      messageText,
      lineEventId,
    },
  });

  return saving;
}
