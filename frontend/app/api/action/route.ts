import { NextRequest, NextResponse } from "next/server";
import { saveAction } from "@/lib/action";
import { getBalance } from "@/lib/balance";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const saving = await saveAction({
    lineUserId: body.lineUserId,
    actionType: body.actionType,
    actionLabel: body.actionLabel,
    amount: 500,
  });
  const total = await getBalance(body.lineUserId);

  return NextResponse.json({
    message: "貯金しました",
    amount: 500,
    total,
  });
}
