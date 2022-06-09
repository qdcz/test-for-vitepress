# 1、离线部署mysql8.0.27版本

[mysql下载地址](https://downloads.mysql.com/archives/community/)

1.下载指定版本的包

2.使用  `tar -xvf mysql-8.0.27-linux-glibc2.12-x86_64.tar.xz` 解压

3.添加用   `useradd -s /sbin/nologin -M mysql `

4.初始化mysql   `./mysqld --initialize --user=mysql`

编译完 会把密码打出来  例如：

```
2021-12-13T06:11:47.879663Z 0 [Warning] [MY-011070] [Server] 'Disabling symbolic links using --skip-symbolic-links (or equivalent) is the default. Consider not using this option as it' is deprecated and will be removed in a future release.
2021-12-13T06:11:47.879733Z 0 [System] [MY-013169] [Server] /usr/cxy/application/mysql-8.0.27-linux-glibc2.12-x86_64/bin/mysqld (mysqld 8.0.27) initializing of server in progress as process 8531
2021-12-13T06:11:47.929457Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
2021-12-13T06:11:48.389073Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
2021-12-13T06:11:49.228364Z 0 [Warning] [MY-013746] [Server] A deprecated TLS version TLSv1 is enabled for channel mysql_main
2021-12-13T06:11:49.228379Z 0 [Warning] [MY-013746] [Server] A deprecated TLS version TLSv1.1 is enabled for channel mysql_main
2021-12-13T06:11:49.302201Z 6 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: qZk/uB<zC2Ng  vsdIP/*Tq8f*	
```

qZk/uB<zC2Ng  就是密码

5. 使用 `cp ../support-files/mysql.server /etc/init.d/mysqld`   拷贝文件到etc目录下

   然后使用 `vi /etc/my.cnf ` 打开mysql配置文件  重新修改里面内容   

   
   
   ```mysql
   将文件内的信息删除，替换如下
   
   [mysqld]
   basedir=/usr/cxy/application/mysql-8.0.27-linux-glibc2.12-x86_64
   datadir=/var/lib/mysql
   socket=/var/lib/mysql/mysql.sock
   character-set-server=utf8
   [client]
   socket=/var/lib/mysql/mysql.sock
   default-character-set=utf8
   ```

6.使用 `service mysqld start`启动服务

![](https://cdnforspeed.oss-cn-beijing.aliyuncs.com/Img/%E4%B8%AA%E4%BA%BA%E7%AC%94%E8%AE%B0%E5%9B%BE%E7%89%87/20211213153701.png)

# 杂0：常用命令

```js
service mysqld start		启动mysql服务
service mysqld restart		重启mysql服务
```



# 杂1：修改密码

使用 `./mysql -uroot -p`输入账号密码进入数据库

使用 `alter user 'root'@'localhost' identified by 'cz532911';`  将数据库密码修改成 cz532911

使用 `quit`  退出数据库

![](https://cdnforspeed.oss-cn-beijing.aliyuncs.com/Img/%E4%B8%AA%E4%BA%BA%E7%AC%94%E8%AE%B0%E5%9B%BE%E7%89%87/20211213154000.png)



GRANT  ALL  PRIVILEGES  ON  *.*  TO  'root'@'%'  WITH  GRANT  OPTION

```
./mysql -u root -pvmwaremysql>use mysql;
update user set host = '%' where user = 'root';
select host, user from user

```

# 杂2：使用Navicat连接数据库出现1130错误

1.改表法

你的帐号不允许从远程登陆，只能在localhost。这个时候只要在localhost的那台电脑登入MySQL后，更改"MySQL"数据库"user"表里的"host"项，将"localhost"改成"%"

```
mysql -uroot -p #登录

use mysql; 			  #选择数据库
update user set host = '%' where user = 'root';
FLUSH PRIVILEGES; 	   #刷新权限
```

![](https://cdnforspeed.oss-cn-beijing.aliyuncs.com/Img/%E4%B8%AA%E4%BA%BA%E7%AC%94%E8%AE%B0%E5%9B%BE%E7%89%87/20211213162500.png)

# 杂3：使用Navicat连接数据库出现2059错误

mysql8 之前的版本中加密规则是mysql_native_password,而在mysql8之后,加密规则是caching_sha2_password



修改加密规则如下：

```
mysql -uroot -p #登录

use mysql; #选择数据库
# 远程连接请将'localhost'换成'%'
ALTER USER 'root'@'%' IDENTIFIED BY '123456' password  EXPIRE NEVER; 	   #更改加密方式
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456'; #更新用户密码
FLUSH PRIVILEGES; #刷新权限
```

![](https://cdnforspeed.oss-cn-beijing.aliyuncs.com/Img/%E4%B8%AA%E4%BA%BA%E7%AC%94%E8%AE%B0%E5%9B%BE%E7%89%87/20211213162300.png)

![](https://cdnforspeed.oss-cn-beijing.aliyuncs.com/Img/%E4%B8%AA%E4%BA%BA%E7%AC%94%E8%AE%B0%E5%9B%BE%E7%89%87/20211213162400.png)

```
ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
```
