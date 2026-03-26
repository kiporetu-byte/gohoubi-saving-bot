# DB設計

## users

| カラム      | 型       | 説明                 |
| ----------- | -------- | -------------------- |
| id          | string   | ユーザーID           |
| lineUserId  | string   | LINEユーザーID       |
| displayName | String?  |
| createdAt   | DateTime | 作成日時、初期値設定 |
| updatedAt   | DateTime | 更新日時、自動更新   |

---

## savings

| カラム      | 型       | 説明       |
| ----------- | -------- | ---------- |
| id          | string   | 保存ID     |
| userId      | string   | ユーザーID |
| actionType  | string   | 行動タイプ |
| actionLabel | string   | 表示ラベル |
| amount      | number   | 金額       |
| lineEventId | string   | 重複防止   |
| createdAt   | DateTime | 作成日時   |
