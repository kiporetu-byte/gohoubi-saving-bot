# LINE Webhook 設定手順（任意 / 担当者のみ）

※ ngrok の設定は、LINE 連携を担当する人のみ必要です

## 0. ngrok のインストール

ngrok がインストールされていない場合は、以下のいずれかの方法でインストールしてください。

### Mac（Homebrew）

```bash
brew install ngrok/ngrok/ngrok
```

その他（Windows / Mac / Linux）

公式サイトからダウンロードしてください。
https://ngrok.com/download

---

## 1. ngrok の認証設定（初回のみ）

ngrok を使用するにはアカウント登録と認証が必要です。

1. https://ngrok.com/ にアクセスしてアカウントを作成
2. ダッシュボードから「Authtoken」を取得
3. 以下のコマンドを実行

```bash
ngrok config add-authtoken <YOUR_AUTHTOKEN>
```

※ <YOUR_AUTHTOKEN> は ngrok の画面に表示されているものを貼り付けてください

## 2. ngrok を起動

以下のコマンドを実行して、ローカルサーバーを外部公開します。

```bash
ngrok http 3000
```

※ ポート番号は開発サーバーに合わせてください
（例：Next.js が 3000 の場合は ngrok http 3000）

## 3. ngrok の URL をコピー

ngrok を起動すると、以下のような URL が表示されます。

https://xxxxx.ngrok-free.app

この URL をコピーしてください。

## 4. Webhook URL を設定

LINE Developers の Messaging API 設定画面で、以下の URL を設定します。

https://xxxxx.ngrok-free.app/api/webhook

## 5. Webhook を有効化

LINE Developers の設定画面で以下を有効にします。

Webhook の利用：ON

## 6. 動作確認

- LINE で Bot を友達追加する
- Bot にメッセージを送信する（例：「テスト」）

## 7. 確認方法

ngrok

ターミナルに以下のようなログが表示されれば成功です。

### ngrok

POST /api/webhook 200 OK

### サーバー（VS Code）

=== LINE Webhook received ===

---

## 補足

ngrok を起動していないと LINE からアクセスできません
ngrok の URL は起動するたびに変わるため、その都度 Webhook URL の更新が必要です

## LINE Bot の利用

LINE Bot の友達追加は、担当者から共有された QR コードをご利用ください。
