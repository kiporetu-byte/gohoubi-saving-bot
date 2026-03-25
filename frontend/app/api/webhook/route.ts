//LINE Webhook受信用のAPI(LINEからのメッセージを受け取る入口)

//LINE Developersに設定したWebhook URLからのPOSTリクエストを受け取るエンドポイント。
//疎通確認のため、受信した内容をログに出力し、正常時は200を返す。
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
  
      console.log("受信メッセージ:", messageText);
  
      if (messageText === "運動した") {
        console.log("→ 運動した と判定されました");
      } else if (messageText === "スタバ我慢した") {
        console.log("→ スタバ我慢した と判定されました");
      } else if (messageText === "残高照会") {
        console.log("→ 残高照会 と判定されました");
      } else {
        console.log("→ 未対応メッセージです");
      }
  
      return Response.json({ ok: true }, { status: 200 });
    } catch (error) {
      console.error("Webhook error:", error);
      return Response.json({ ok: false }, { status: 500 });
    }
  }