# kafka

Apache的Kafka™是一个分布式流平台(a distributed streaming platform),是一个流式处理系统。让后端服务直接方便通信

- Kafka是运行在一个或多个服务器的集群(Cluster)上的。
- Kafka集群分类存储的记录流被称为主题(Topics)。
- 每个消息记录包含一个键，一个值和时间戳。

他有 四个核心api

生产者api   允许应用程序发布记录流至一个或多个Kafka的话题(Topics)。

消费者api   允许应用程序订阅一个或多个主题，并处理这些主题接收到的记录流。

streams api 允许应用程序充当流处理器（stream processor），从一个或多个主题获取输入流，并生产一个输出流至一个或多个的主题，能够有效地变换输入流为输出流。

connector api   允许构建和运行可重用的生产者或消费者，能够把 Kafka主题连接到现有的应用程序或数据系统。例如，一个连接到关系数据库的连接器(connector)可能会获取每个表的变化。

## 名词解释

Producer： 生产者，发送信息的服务端

Consumer：消费者，订阅消息的客户端

Broker：消息中间件处理节点，一个Kafka节点就是一个broker，一个或者多个Broker可以组成一个Kafka集群

Topic: 主题，可以理解成队列

ConsumerGroup：消费者组，一个 ConsumerGoup 里面包括多个 Consumer，每个 ConsumerGoup 里面只有一个 Consumer 可以消费一个 Topic。基于这个特性，每个 ConsumerGoup 里面只存一个 Consumer 可以实现广播；所有 Consumer 都存在于同一个 ConsumerGoup 内则可以实现单播。

Partition：基于 Kafka 的拓展性，有可能一个很大的 Topic 会存在于不同的 Broker 里面。这时一个 Topic 里面就会存在多个 Partition，Partition 是一个有序的队列，Partition 上每个消息会有一个顺序的 id —— Offset。但是，值得注意的是，Kafka 会保证 Partition 的顺序性，而没有保证 Topic 的顺序性。

Offset：Kafka 的存储文件都是offset顺序存储的，以 offset.kafka 来命名。例如第一个就是 0000.kafka, 第 n 个文件就是 n-1.kafka

Zookeerper：管理多个 Kafka 节点，具有管理集群配置的功能

## 图解

[kafka概念图解](https://zhuanlan.zhihu.com/p/392568942)

## topic 主题

## 生产者

创建一个生成者 并生产数据



## 消费者





## windows

### 添加一个主题
```shell
bin\windows\kafka-topics.sh --create --bootstrap-server localhost:9092 --replication-factor 1   --partitions 1 --topic Hello-Kafka
```

### 查看当前的主题列表
```shell
bin\windows\kafka-topics.bat --list --bootstrap-server localhost:9092
```

### 查询指定topic的信息

```shell
bin\windows\kafka-topics.bat --bootstrap-server 127.0.0.1:9092 --topic dadada --describe


# 以下是打印信息
Topic: dadada   TopicId: 6Vhqu704THiGT4GK_YNLXQ PartitionCount: 1       ReplicationFactor: 1    Configs: segment.bytes=1073741824
    Topic: dadada   Partition: 0    Leader: 0       Replicas: 0     Isr: 0
```

### 执行消费条数的数据

```shell
# 0.8版本及以下的的kafka 使用如下命令test topic中的数据
./kafka-console-consumer.sh  --zookeeper localhost:2181 --topic test
# 指定消费10条数据
bin\windows\kafka-console-consumer.bat  --bootstrap-server localhost:9092 --topic dadada --max-messages 10
# 0.9版本及以上的kafka建议使用如下命令进行消费，当然也可使用上一条命令消费
./kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic test
```