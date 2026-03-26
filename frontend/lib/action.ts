import { prisma } from './prisma';
import { transferToSaving } from './sunabar';

export async function saveAction({
  lineUserId,
  actionType,
  amount,
  messageText,
  lineEventId,
}: {
  lineUserId: string;
  actionType: 'EXERCISE' | 'SKIP_STARBUCKS';
  actionLabel: string;
  amount: number;
  messageText?: string;
  lineEventId: string;
}) {
  // 二重登録防止

  const exists = await prisma.saving.findUnique({
    where: { lineEventId },
  });

  if (exists) {
    return exists;
  }

  // actionLabel 自動設定
  const labelMap = {
    EXERCISE: '運動した',
    SKIP_STARBUCKS: 'スタバ我慢した',
  };

  const finalActionLabel = labelMap[actionType];

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
      actionLabel: finalActionLabel,
      amount,
      messageText,
      lineEventId,
    },
  });

  // sunabar振替
  const result = await transferToSaving(500);

  if (!result) {
    throw new Error('sunabar transfer failed');
  }

  return saving;
}
