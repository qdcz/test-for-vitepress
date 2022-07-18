# kafka

使用前需要先安装javaSDK

[kafka下载地址](https://www.apache.org/dyn/closer.cgi?path=/kafka/3.2.0/kafka_2.12-3.2.0.tgz)

## 修改配置文件

```shell
config/zookeeper.properties        # zookeeper配置
# 直接使用默认的配置
config/server.properties           # kafka配置


62行-旧	log.dirs=/tmp/kafka-logs  # 修改为你的日志路径 
62行-新	log.dirs=D:\application\kafka_2.12-3.2.0\kafka-logs # kafka-logs会自己创建
```

## 启动

```shell
>bin\windows\zookeeper-server-start.bat config\zookeeper.properties  启动zookeeper
>bin\windows\kafka-server-start.bat config\server.properties    启动kafka
```

