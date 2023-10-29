# super-shiharai-kun

## Quick Start
### サーバー起動
```sh
$ docker-compose up
```

### モデルマイグレーション

```sh
npm run migrate
```

### seedデータの挿入

## DBへの接続
```sh
mysql -u user -h 127.0.0.1 -ppassword --port 3306
```

## undo
```
 npx sequelize-cli db:migrate:undo:all --to 20231029123812-create-company.js --env local
```
 ## seed反映
```
  npx sequelize-cli db:seed:all --env local
```
 ## seed削除
```
 npx sequelize-cli db:seed:undo:all --env local
```