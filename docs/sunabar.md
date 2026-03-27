# sunabar連携

## 使用API

- つかわけ口座間振替API
- 残高照会API

## パラメータ

| パラメータ         | 説明     |
| ------------------ | -------- |
| depositSpAccountId | 入金口座 |
| debitSpAccountId   | 出金口座 |
| paymentAmount      | 金額     |

## 環境変数

SUNABAR_URL  
SUNABAR_BALANCE_URL  
SUNABAR_API_TOKEN  
SUNABAR_DEPOSIT_ACCOUNT  
SUNABAR_DEBIT_ACCOUNT

## 処理フロー

1. **つかいわけ口座間振替API**

/api/action  
↓  
saveAction  
↓  
transferToSaving  
↓  
sunabar API

2. **残高照会API**

/api/balance  
↓  
getBalance  
↓  
fetchBalanceFromSunabar  
↓  
Sunabar API
