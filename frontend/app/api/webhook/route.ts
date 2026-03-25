//LINE Webhook受信用のAPI(LINEからのメッセージを受け取る入口)
import { replyText } from "@/lib/line";

function judgeMessage(messageText?: string) {
  if (messageText === "運動した") {
    return "exercise";
  }

  if (messageText === "スタバ我慢した") {
    return "saveCoffee";
  }

  if (messageText === "残高照会") {
    return "checkBalance";
  }

  return "unsupported";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const event = body.events?.[0];
    const messageText = event?.message?.text;
    const replyToken = event?.replyToken;
    const lineUserId = event?.source?.userId;

    console.log("受信メッセージ:", messageText);
    console.log("replyToken:", replyToken);
    console.log("lineUserId:", lineUserId);
    

    const messageType = judgeMessage(messageText);

    if (messageType === "exercise") {
      const actionType = "EXERCISE";
      const actionLabel = "運動した";

      console.log("→ /api/action を呼ぶ予定です");
      console.log("actionType:", actionType);
      console.log("actionLabel:", actionLabel);

       // API完成後はこのように呼ぶ想定
  // const actionResponse = await fetch("http://localhost:3000/api/action", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     lineUserId,
  //     actionType,
  //     actionLabel,
  //   }),
  // });
  //
  // const actionData = await actionResponse.json();
  //
  // await replyText(replyToken, `${actionData.message} 今の残高は${actionData.total}円です。`);
  
    } else if (messageType === "saveCoffee") {
      const actionType = "SKIP_STARBUCKS";
      const actionLabel = "スタバ我慢した";

      console.log("→ /api/action を呼ぶ予定です");
      console.log("actionType:", actionType);
      console.log("actionLabel:", actionLabel);
    } else if (messageType === "checkBalance") {
      console.log("→ /api/balance を呼ぶ予定です");
    } else {
      await replyText(replyToken, "未対応のメッセージです");
    }

    return Response.json({ ok: true }, { status: 200 });
  } catch (error) {
    console.error("Webhook error:", error);
    return Response.json({ ok: false }, { status: 500 });
  }
}