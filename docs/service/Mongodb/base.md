
聚合函数

### .limit()

在 MongoDB中读取指定数量的数据记录 

```
db.COLLECTION_NAME.find().limit(NUMBER)
```

### .skip()

 用来跳过指定数量的数据 

```js
db.COLLECTION_NAME.find().limit(NUMBER).skip(NUMBER)
```

### .sort()

通过指定参数指定字段进行排序  ( 1 为升序排列, -1 是用于降序排列 )

```
db.COLLECTION_NAME.find().sort({aaaaa:1})
```