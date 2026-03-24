## 🔧開発環境のセットアップ

1. パッケージのインストール

```bash
npm install
```

2.  環境変数の設定（.envの作成）

プロジェクトのルートディレクトリに .env ファイルを新規作成し、.env.exampleファイルの内容を記述してください。[PASSWORD]の部分は個別でお伝えします。

3. Prisma Clientの生成

```bash
npx prisma generate
```

4. 開発サーバーの起動

```bash
npm run dev
```

起動後、 http://localhost:3000 にアクセスして動作確認を行ってください。
