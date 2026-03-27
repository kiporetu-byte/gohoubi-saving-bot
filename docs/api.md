# API仕様

## POST /api/action

行動登録 + ごほうび貯金処理を行う

### Request

```json
{
  "lineUserId": "string",
  "actionType": "EXERCISE | SKIP_STARBUCKS",
  "actionLabel": "スタバ我慢した",
  "lineEventId": "unique-event-id-000"
}
```

### 処理内容

・ユーザー取得 / 作成  
・saving テーブル保存  
・sunabar 振替実行  
・lineEventId による冪等性の担保（重複振替の完全排除）

#### 備考：冪等性について

本エンドポイントは決済処理を含むため、lineEventId を一意のキーとして冪等性を管理しています。通信エラーによる再送や連打が発生しても、同一の lineEventId に対して二重に振替処理が行われることはありません。

## GET /api/balance

残高照会を行う
