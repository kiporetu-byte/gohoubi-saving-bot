## セットアップ手順

### 1. リポジトリをクローン

```bash
git clone https://github.com/ms-engineer-bc26-02/section8_work_room_a.git
cd section8_work_room_a
cd frontend
```

### 2. パッケージをインストール

```bash
npm install
```

### 3.環境変数の設定

.env.local を作成し、以下の環境変数を設定してください。

```env
DATABASE_URL=
DIRECT_URL=
```

※ 値はチーム内で共有されたものを使用してください。

### 4. Prisma のセットアップ（必要な場合）

```bash
npx prisma generate
```

### 5. 開発サーバーの起動

```bash
npm run dev
```

### 6. 動作確認

ブラウザで以下にアクセスしてください。

http://localhost:3000

※ 3000 番ポートが使用中の場合は、3001 など別ポートで起動されることがあります。  
ターミナルに表示される `Local` の URL を確認してください。
