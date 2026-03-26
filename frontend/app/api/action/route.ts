import { NextRequest, NextResponse } from 'next/server';
import { saveAction } from '@/lib/action';
import { getBalance } from '@/lib/balance';

export async function POST(req: NextRequest) {
  const body = await req.json();

  await saveAction({
    lineUserId: body.lineUserId,
    actionType: body.actionType,
    actionLabel: body.actionLabel,
    lineEventId: body.lineEventId,
    amount: 500,
  });
  const total = await getBalance(body.lineUserId);

  return NextResponse.json({
    message: `💎 ごほうび貯金
  
  ＋500円貯金しました！✨
  現在の残高は${total.toLocaleString()}円です`,
    amount: 500,
    total,
  });
}
