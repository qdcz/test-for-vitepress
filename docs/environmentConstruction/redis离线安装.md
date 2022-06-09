# linux下安装redis

[安装包链接](https://cdnforspeed.oss-cn-beijing.aliyuncs.com/install%20pack/redis-6.2.6.tar.gz)

```shell
tar -xvf xxx.tar.gz   		解压
# 进入到安装文件夹路径内
make && make install  		安装redis  ---------(如果没有gcc 需要自己安装)
mv redis.conf 6379.conf  	修改文件名字

# 修改6379.conf配置文件
vim 6379.conf 			如下：
69行   bind 0.0.0.0  		修改为可以远程连接
94行	  protected-mode no      运行外部远程连接
257行  daemonize yes			让redis在linux后台运行
302行  logfile /usr/cxy/application/redis-6.2.6/access.log    改成这个   access.log文件自建  需要chmod 777 access.log 给权限
455行  dir /usr/cxy/application/redis-6.2.6/dbfiles/			改成这个    dbfiles文件夹自建   需要chmod 777 ./dbfiles 给权限
901行  requirepass 123456	 修改密码,默认无密码 

# 将 redis_init_script 文件拷贝到指定路径（在utils文件夹下）
cp redis_init_script /etc/init.d/		
# 进入到 /etc/init.d/   目录下
vim redis_init_script  	修改配置我文件 如下
```

```shell
### BEGIN INIT INFO
REDISPORT=6379
EXEC=/usr/local/bin/redis-server
CLIEXEC=/usr/local/bin/redis-cli

PIDFILE=/var/run/redis_${REDISPORT}.pid
CONF="/usr/cxy/application/redis-6.2.6/${REDISPORT}.conf"    # 修改这个路径正是redis安装的路径
```

```shell
# 配置权限
chmod 777 redis_init_script
# 启动redis
./redis_init_script start
# 检测redis运行状态
ps -ef | grep redis
```

# 常用命令

## 进入redis命令界面

```shell
redis-cli
auth  你设置的密码
```

![](https://cdnforspeed.oss-cn-beijing.aliyuncs.com/Img/%E4%B8%AA%E4%BA%BA%E7%AC%94%E8%AE%B0%E5%9B%BE%E7%89%87/20220105175300.png)

## 给新链接命名

```shell
# 新连接默认没有名字
redis 127.0.0.1:6379> CLIENT GETNAME
(nil)

# 设置名字
redis 127.0.0.1:6379> CLIENT SETNAME cxy-redis
OK

# 返回名字
redis 127.0.0.1:6379> CLIENT GETNAME
"cxy-redis"

# 查看链接列表
client-list   
```

# window下安装gui工具连接linux的redis

[可视化工具(GUI)](https://github.com/qishibo/AnotherRedisDesktopManager/releases)

建议 1.5.5版本

```
账号默认是default
密码就是刚才设置的
```

