# 建立TTL索引

## 介绍

Mongodb通常会被用来存储缓存数据或大尺寸、低价值的数据，对于这些类型的数据。数据量往往非常大，如果不定期清理，不但会影响性能，也会浪费大量的系统资源。
对此如果我们需要自己写脚本去定时清理。

清理的方法也有多种，如：

为每个数据记录一个时间戳，应用侧开启一个定时器，按时间戳定期删除过期的数据。

数据按日期进行分表，同一天的数据归档到同一张表，同样使用定时器删除过期的表。

在MongoDB中有更便捷的方法：建立TTL（Time To Live）索引

它需要声明在一个日期类型的字段中，建立之后MongoDB会在周期性运行的后台线程中（单线程）对该集合进行检查及数据清理工作，删除过期文档的后台任务每 60（默认） 秒运行一次。删除文档的动作还依据mongod实例的负载情况，如果负载很高，可能会稍微延后一段时间再删除。

## 缺点

- TTL索引只能支持单个字段，并且必须是非_id字段。

- 不能用于固定集合。

- 无法保证及时的数据老化，MongoDB会通过后台的TTLMonitor定时器来清理老化数据，默认的间隔时间是1分钟。当然如果在数据库负载过高的情况下，TTL的行为则会进一步受到影响。

- 对于数据的清理仅仅使用了remove命令，这种方式并不是很高效。因此TTL Monitor在运行期间对系统CPU、磁盘都会造成一定的压力。相比之下，按日期分表的方式操作会更加高效。


## 操作

**以下是使用mongoose的用法：**

在创建数据模型的时候指定一个属性设置 `expires`(单位是秒)  即可，它代表过期时间，表示如果当前时间 `>=` 这个属性的时间+`expires`的时间就会自动删除,具体操作如下:


```javaScript
const mongoose = require('mongoose');
const dataProxySchema = new mongoose.Schema({
    startTime: Date, // 落库时间
    uuid: { // uuid
        unique: true, // 创建唯一索引
        // index: true, // 创建普通索引
        type: String
    },
    createAt: { // ttl索引
        type: Date,
        default: Date.now,
        expires: 10
    }
})

```

**以下是使用mongodb的用法：**

```javaScript
db.log_events.createIndex( { "createdAt": 1 }, { expireAfterSeconds: 3600 } )
```


