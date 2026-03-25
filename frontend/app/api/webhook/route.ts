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
  
      console.log("受信メッセージ:", messageText);
  
      const messageType = judgeMessage(messageText);
  
      if (messageType === "exercise") {
        console.log("→ 運動した と判定されました");
      } else if (messageType === "saveCoffee") {
        console.log("→ スタバ我慢した と判定されました");
      } else if (messageType === "checkBalance") {
        console.log("→ 残高照会 と判定されました");
      } else {
        console.log("→ 未対応メッセージです");
  
        await replyText(replyToken, "未対応のメッセージです");
      }
  
      return Response.json({ ok: true }, { status: 200 });
    } catch (error) {
      console.error("Webhook error:", error);
      return Response.json({ ok: false }, { status: 500 });
    }
}
