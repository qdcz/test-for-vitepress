# mongodb centos7 上离线安装

## 安装

[在官网中下载指定的包](https://www.mongodb.com/try/download/enterprise)

然后使用 `tar -zxvf mongodb-linux-x86_64-enterprise-rhel70-5.0.9.tgz` 解压

`mv mongodb-linux-x86_64-enterprise-rhel70-5.0.9 /usr/local` 移动到local目录下

`mv mongodb-linux-x86_64-enterprise-rhel70-5.0.9 mongodb-5.0.9` 修改文件名字

使用 `mkdir db` 创建数据存放位置

使用 `touch mongodb.log` 创建日志存放位置

在bin目录下创建 mongodb.conf 配置文件

`vi mongodb.conf`  添加以下配置

```shell
port=27017
dbpath=/usr/local/mongodb-5.0.9/data/db
logpath=/usr/local/mongodb-5.0.9/data/logs/mongodb.log
fork=true
auth=false
bind_ip=0.0.0.0
```


然后进入bin目录下启动 `./mongod -f ./mongodb.conf`

启动成功后打印
```shell
about to fork child process, waiting until server is ready for connections.
forked process: 44626
child process started successfully, parent exiting
```
使用 `netstat -ntlp`   查看当前所有tcp端口 可以看到27017端口已经启动

使用 `netstat -ntulp |grep 80`   查看当前所有27017端口 可以看到27017端口已经启动


## 测试

在bin目录下 `./mongo` 打开mongodb

```shell
[root@qdcz bin]# ./mongo
MongoDB shell version v5.0.9
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("5341d8cf-25e2-485d-9e4b-d80e7d2711fc") }
MongoDB server version: 5.0.9
================
Warning: the "mongo" shell has been superseded by "mongosh",
which delivers improved usability and compatibility.The "mongo" shell has been deprecated and will be removed in
an upcoming release.
For installation instructions, see
https://docs.mongodb.com/mongodb-shell/install/
================
---
The server generated these startup warnings when booting: 
        2022-07-08T14:08:41.918+08:00: You are running this process as the root user, which is not recommended
        2022-07-08T14:08:41.919+08:00: /sys/kernel/mm/transparent_hugepage/enabled is 'always'. We suggest setting it to 'never'
        2022-07-08T14:08:41.919+08:00: /sys/kernel/mm/transparent_hugepage/defrag is 'always'. We suggest setting it to 'never'
        2022-07-08T14:08:41.919+08:00: Soft rlimits for open file descriptors too low
        2022-07-08T14:08:41.919+08:00:         currentValue: 1024
        2022-07-08T14:08:41.919+08:00:         recommendedMinimum: 64000
---
MongoDB Enterprise > 

```

`show dbs` 查看所有数据库

```shell
MongoDB Enterprise > show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
test    0.000GB
MongoDB Enterprise > 

```

`db` 当前选中的数据库

`show tables` 查看所有表

`db.test.insert({name:"cxy"})` 向test表内插入一条数据 没有test表会自动创建一张test表

```shell
MongoDB Enterprise > db.test.insert({name:"cxy"})
WriteResult({ "nInserted" : 1 })
MongoDB Enterprise > 

```

`db.test.find()` 查看当前数据库下的test表的所有数据

```shell
MongoDB Enterprise > db.test.find()
{ "_id" : ObjectId("62c7df353e2badb04e797755"), "name" : "cxy" }
MongoDB Enterprise > 

```




