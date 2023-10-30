# super-shiharai-kun

## 🚗 Quick Start
### 1.ライブラリをインストール
```sh
npm i
```

### 2.サーバー起動
```sh
docker-compose up
```
### 3.モデルマイグレーション

```sh
npm run migrate
```

### 4.seedデータ反映
```
npx sequelize-cli db:seed:all --env localHost
```

## apiサンプル
### 死活監視
```sh
curl --location 'http://localhost:8080/ping'
```

### 請求書一覧取得
```sh
curl --location 'http://localhost:8080/api/invoices' \
--header 'password: password1' \
--header 'email: test@example.com'
```

### 請求書作成
```sh
curl --location 'http://localhost:8080/api/invoices' \
--header 'password: password1' \
--header 'email: test@example.com' \
--header 'Content-Type: application/json' \
--data '{
    "clientId": "fe38e892-014a-45a7-a35b-8f21ab30b874",
    "paymentAmount": 10000
}'
```
## その他
### テスト実行
```sh
npm run test
```

## DBへの接続
```sh
mysql -u user -h 127.0.0.1 -ppassword --port 3306
```
