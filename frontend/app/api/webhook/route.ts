//LINE Webhook受信用のAPI

//LINE Developersに設定したWebhook URLからのPOSTリクエストを受け取るエンドポイント。
//疎通確認のため、受信した内容をログに出力し、正常時は200を返す。

export async function POST(req: Request) {
    try {
      const body = await req.json();
  
      console.log("=== LINE Webhook received ===");
      console.log(JSON.stringify(body, null, 2));
  
      return Response.json({ ok: true }, { status: 200 });
    } catch (error) {
      console.error("Webhook error:", error);
      return Response.json({ ok: false }, { status: 500 });
    }
  }