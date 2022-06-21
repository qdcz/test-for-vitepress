# MongoDB

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

mongodb 建立索引 在指定日期删除数据

[ttl](https://www.jb51.net/article/157911.htm)

[aaa](https://blog.csdn.net/a1a2a3a4/article/details/45024409?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-0-45024409-blog-121120061.pc_relevant_multi_platform_whitelistv1&spm=1001.2101.3001.4242.1&utm_relevant_index=3)