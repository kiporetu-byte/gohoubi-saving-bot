//LINE Webhook受信用のAPI(LINEからのメッセージを受け取る入口)
// LINE Webhook受信用のAPI(LINEからのメッセージを受け取る入口)
import { replyText } from "@/lib/line";

function judgeMessage(messageText?: string) {
  if (messageText === "運動した") return "exercise";
  if (messageText === "スタバ我慢した") return "saveCoffee";
  if (messageText === "残高照会") return "checkBalance";
  return "unsupported";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const event = body.events?.[0];
    const messageText = event?.message?.text;
    const replyToken = event?.replyToken;
    const lineUserId = event?.source?.userId;

    const appBaseUrl = process.env.APP_BASE_URL;

    if (!appBaseUrl) {
      throw new Error("APP_BASE_URL is not set");
    }

    console.log("受信メッセージ:", messageText);
    console.log("replyToken:", replyToken);
    console.log("lineUserId:", lineUserId);

    const messageType = judgeMessage(messageText);

    if (messageType === "exercise") {
      const actionResponse = await fetch(`${appBaseUrl}/api/action`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lineUserId,
          actionType: "EXERCISE",
          actionLabel: "運動した",
          lineEventId: event?.webhookEventId,
        }),
      });

      const actionData = await actionResponse.json();

      await replyText(replyToken, actionData.message);
    } else if (messageType === "saveCoffee") {
      const actionResponse = await fetch(`${appBaseUrl}/api/action`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lineUserId,
          actionType: "SKIP_STARBUCKS",
          actionLabel: "スタバ我慢した",
          lineEventId: event?.webhookEventId,
        }),
      });

      const actionData = await actionResponse.json();

      await replyText(replyToken, actionData.message);
    } else if (messageType === "checkBalance") {
      const balanceResponse = await fetch(
        `${appBaseUrl}/api/balance?lineUserId=${lineUserId}`
      );

      const balanceData = await balanceResponse.json();

      await replyText(
        replyToken,
        `💎 ごほうび貯金

現在の残高は${balanceData.total.toLocaleString()}円です✨`
      );
    } else {
      await replyText(replyToken, "未対応のメッセージです");
    }

    return Response.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return Response.json({ ok: false }, { status: 500 });
  }
}