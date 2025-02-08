# Nodejs-Exercise

## ローカル実行方法

### コンテナを起動 :whale:

```shell
docker compose up --build -d 
```

#### コンテナの中に入る(node.js) :whale:

```shell
docker exec -it node-app bash
```

#### node.jsからMongoDBに接続確認 :star:

```shell
nodemon index.js

[nodemon] 3.1.9
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node index.js`
ポート8000でリクエスト待受中
MongoDBコネクションOK!!
```

#### コンテナの中に入る(MongoDB) :whale:

```shell
docker exec -it mongo-db bin/bash
```

#### Database確認 :star:

```shell
mongo

> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
camp   0.000GB

> use camp
switched to db camp

> show collections
campgrounds

> db.campgrounds.find()

→ レコードが表示されればOK
```

#### お掃除 :bomb:

```shell
docker compose down --volumes --rmi all --remove-orphans
```
