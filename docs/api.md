# API仕様

## POST /api/action

行動登録 + ご褒美貯金処理を行う

### Request

```json
{
  "lineUserId": "string",
  "actionType": "EXERCISE | SKIP_STARBUCKS",
  "actionLabel": "スタバ我慢した",
  "lineEventId": "unique-event-id-000"
}
```

処理内容  
・ユーザー取得 / 作成  
・saving テーブル保存  
・sunabar 振替実行

## GET /api/balance

残高照会を行う
