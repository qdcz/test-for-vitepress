# Linux常用命令

### echo

打印 相当于console.log()

```js
echo $LANG   //查看当前使用的系统语言
echo -n // 输出之后不换行
echo -e // 对于转义字符按对应的方式处理
 /a /*表示输出一个警告声音*/  =>  echo -e "a/ask"  //输出ask
 /b /*表示删除前面的空格*/    =>  echo -e "work /bfast"  // 输出workfast
 \n 表示换行 
 \t 表示水平制表符 
 \v 表示垂直制表符 
 \c后面的字符将不会输出，同一时候，输出完毕后也不会换行 
 \r 输出回车符（可是你会发现\r前面的字符没有了） 

```

### cd

```js
cd /home  //进入“home目录”
cd ..  //返回上一级目录
cd ../..  //返回上两级目录
cd ~  //进入用户主目录 home 目录
cd -  //返回上次所在的目录
pwd //显示工程路径
ll //显示文件的所有目录
```

### mkdir

```js
-m, // --mode=模式，设定权限<模式> (类似 chmod)，
 -p, --parents  //可以是一个路径名称。此时若路径中的某些目录尚不存在,加上此选项后,系统将自动建立好那些尚不存在的目录,即一次可以建立多个目录; 
 -v, --verbose // 每次创建新目录都显示信息
--help // 显示此帮助信息并退出
--version // 输出版本信息并退出
```

```js
mkdir abc  //创建一个名为“abc”的目录
mkdir -m 777 /pwx/test  // 创建一个最高权限
普及下文件属性：rwxrwxrwx 
	文件权限: 9位，每3位一组，每一组：rwx(读，写，执行)，当改组不具有某一权限用-代替。
	第一组为: 文件拥有者的权限， 该文件的拥有者可以读写，但不可执行；
	第二组为: 同群组的权限
	第三组为: 其他非本群组的权限
    
    rwxrwxrwx 就是777
    rwxrwx--- 就是770
	rwx------ 就是700 二进制转换有就是1没有就是0    7= 1*2^0 + 1*2^1 +1*2^2 = 1+2+4
	
```

6.tree

显示文件和目录由根目录开始的树形结构

8.rm -f file1

删除一个叫“file1”的文件

9.rm -rf dir1

删除一个叫dir1的目录以及里面的所有文件内容

10.mv dir1 newdir1

重命名或移动一个目录

11.cp dir/*

复制一个目录下的所有文件到当前工作目录

12.cp -a /tmp/dir1

复制一个目录到当前工作目录

13.chmod ugo+rwx abc

设置当前目录或文件的所有权限

14.rz

上传操作

15.sz

下载文件操作



### zip

```
zip all.zip *.jpg   #将所有.jpg的文件压缩成一个zip包

unzip all.zip    #将all.zip中的所有文件解压到当前目录中

unzip all.zip -d all #将all.zip 中的所有文件解压到当前目录中的all文件夹中

zip -r hy.zip hy  #将当前目录下的hy文件夹压缩为hy.zip

zip -r hy.zip hy 123.txt  #将当前目录下的hy文件夹和123.txt压缩为hy.zip
```

## 删除文件

rm 文件

## 防火墙

```js
systemctl start firewalld.service		// 开启防火墙
systemctl stop firewalld.service		// 关闭防火墙   临时关闭
systemctl disbale firewalld.service		// 关闭防火墙   重启后还是关闭的
systemctl status firewalld.service		// 查看防火墙的状态
systemctl disable firewalld.service		// 关闭开机启动：
systemctl enable firewalld.service		// 开启开机启动：
firewall-cmd --zone=public --add-port=8688/tcp --permanent
firewall-cmd --zone=public --add-port=6379/tcp --permanent
firewall-cmd --zone=public --add-port=3306/tcp --permanent   	   // 开启端口映射
firewall-cmd --reload  											//防火墙重启
```

## 端口

```js
　netstat命令各个参数说明如下：
　-t : 指明显示TCP端口
　-u : 指明显示UDP端口
　-l : 仅显示监听套接字(所谓套接字就是使应用程序能够读写与收发通讯协议(protocol)与资料的程序)
　-p : 显示进程标识符和程序名称，每一个套接字/端口都属于一个程序。
　-n : 不进行DNS轮询，显示IP(可以加速操作)


netstat -ntulp | grep 3306
netstat -ntlp   		    //查看当前所有tcp端口·
netstat -ntulp |grep 80   	//查看所有80端口使用情况·
netstat -an | grep 3306   	//查看所有3306端口使用情况·
```

## selinux

```js
// 关闭se

sestatus  // 查看状态

// 关闭方法
vim /etc/selinux/config    
然后将`SELINUX=enforcing`修改为`SELINUX=disable`   // 需要重启才能生效

```



## 查看当前目录下磁盘占用情况

```
du -h --max-depth=1

yum install lsof
查看哪些端口被打开 netstat -tnl

df -h  查看磁盘占用
df -i  查看inode占用


[root@localhost ~]# shutdown -r now
#重启, now是现在重启的意思
[root@localhost ~]# shutdown -r 05:30
#指定时间重启，但会占用前台终端
[root@localhost ~]# shutdown -r 05:30 &
#把定义重启命令放入后台，&是后台的意思
[root@localhost ~]# shutdown -c
//取消定时重启
[root@localhost ~]# shutdown -r +10
#10分钟之后重启
```

## 查看本机机器码

```
sudo dmidecode -t 1|grep UUID
```

## 环境变量

```js
// 显示所有环境变量
env

// 查找命令程序
whereis node   //直接查询到node设置的环境变量
//输出: node: /usr/bin/node

// 设置环境变量
n -s /root/snxun/socket-server/node_modules/pm2/bin/pm2 /usr/bin    -s是设置环境变量        前面是文件的路径  后面是环境变量的路径
n -sf /root/snxun/socket-server/node_modules/pm2/bin/pm2 /usr/bin   -sf是重写覆盖环境变量    前面是文件的路径  后面是环境变量的路径
export PATH="$PATH:/root/snxun/node/bin"

```

# 1、centos 7下安装node和pm2（无网络版）

以下 是用14.15.4 版本下载的PM2包和 14.15.4linux版本的node包

### 解压node

```js
// 解压到目标文件夹
tar xf node-v14.15.4-linux-x64.tar.gz -C /usr/cxy/application/nodeJs 

// 设置环境变量
ln -s /usr/cxy/application/nodes/bin/node /usr/bin
ln -s /usr/cxy/application/nodeJs/bin/npm /usr/bin

ln -s /root/snxun/node/bin/node /usr/bin/node


// 测试
node -v
npm -v
```

### 解压pm2

```js
// 解压到目标文件夹(压缩包是从node_modules拷贝出来的)
unzip pm2.zip -d /usr/cxy/application/pm2 

// 设置环境变量
ln -s /root/snxun/socket-server/node_modules/pm2/bin/pm2 /usr/bin    -s是设置环境变量
ln -sf /root/snxun/socket-server/node_modules/pm2/bin/pm2 /usr/bin   -sf是重写覆盖环境变量

// 测试
pm2 -v
```

### 一键启动 完毕！

```js
pm2 start aaa.js --name aaa --watch -i 4
其它用法请参考pm2文档
```

### 常见问题

#### 1、遇到文件夹无权限的  如  permission denied

```js
// 1.直接  chmod 777 目标文件夹
// 或者    chmod 777 /usr/bin/pm2(我设置环境变量的地址)


// 2.切换权限(当$变成#号代表修改成功)
sudo root
su root

// 查看环境变量
cat /etc/profile
```

#### 2、pm2启动好后 在外网无法访问的

一般就三个原因：

1.本机防火墙并开启端口映射

```js
systemctl start firewalld.service									// 开启防火墙
firewall-cmd --zone=public --add-port=3306/tcp --permanent   	    	// 开启端口映射
firewall-cmd --reload  防火墙重启
```

2.文件日志写入权限

```js
firewall-cmd --zone=public --add-port=8688/tcp --permanent
```

3.外网防火墙  类似安全组  找网管开端口的权限

```

```

# 2、linux磁盘扩容

## 2.1、给分区扩容

先查看当前的磁盘大小   =>>  使用df -h 查看磁盘空间大小  

可看到在/dev/mapper/centos-root/下剩余空间还有6.5G

![](https://cdnforspeed.oss-cn-beijing.aliyuncs.com/Img/%E4%B8%AA%E4%BA%BA%E7%AC%94%E8%AE%B0%E5%9B%BE%E7%89%87/20220211113155.png)

接下来关闭虚拟服务器  将服务器的磁盘容量从20G 提升到25G、提升完后要到客户机(虚拟服务器)内分配磁盘空

![](https://cdnforspeed.oss-cn-beijing.aliyuncs.com/Img/%E4%B8%AA%E4%BA%BA%E7%AC%94%E8%AE%B0%E5%9B%BE%E7%89%87/20220211113414.png)

> Linux fdisk 是一个创建和维护分区表的程序，它兼容 DOS 类型的分区表、BSD 或者 SUN 类型的磁盘列表。  具体看文档

使用 `fdisk -lu` 显示SCSI硬盘的每个分区情况

我们可以看到  目前只有2个分区

![](https://cdnforspeed.oss-cn-beijing.aliyuncs.com/Img/%E4%B8%AA%E4%BA%BA%E7%AC%94%E8%AE%B0%E5%9B%BE%E7%89%87/20220211114051.png)

使用 `fdisk /dev/sda` 去创建分区   输入m是获取帮助

![](https://cdnforspeed.oss-cn-beijing.aliyuncs.com/Img/%E4%B8%AA%E4%BA%BA%E7%AC%94%E8%AE%B0%E5%9B%BE%E7%89%87/20220211140346.png)

```js
// 以下是对帮助的英文进行翻译

a :设置可引导标记
b :修改bsd的磁盘标签
c :设置DOS操作系统兼容标记
d :删除一个分区
l :显示已知的分区类型，其中82为Linux swap分区，83为Linux分区
m :显示帮助信息
n :增加一个新的分区
o :创建一个新的空白的DOS分区表
p :显示磁盘当前的分区表
q :退出fdisk程序，不保存任何修改
s :创建一个新的空白的Sun磁盘标签
t :改变一个分区的系统号码（比如把Linux Swap分区改为Linux分区）
u :改变显示记录单位
v :对磁盘分区表进行验证
w :保存修改结果并退出fdisk程序
x :特殊功能
```

输入 n  进行创建分区     可以看到打印出目前有2个主分区  0个拓展分区  2个空闲分区   

![](https://cdnforspeed.oss-cn-beijing.aliyuncs.com/Img/%E4%B8%AA%E4%BA%BA%E7%AC%94%E8%AE%B0%E5%9B%BE%E7%89%87/20220211140618.png)

然后 再输入 p  然后一直回车(按照默认的来)

![](https://cdnforspeed.oss-cn-beijing.aliyuncs.com/Img/个人笔记图片/20220211141010.png)

![](https://cdnforspeed.oss-cn-beijing.aliyuncs.com/Img/%E4%B8%AA%E4%BA%BA%E7%AC%94%E8%AE%B0%E5%9B%BE%E7%89%87/20220211141207.png)

然后5G的大小的分区已经建立完成

最终输入 w 保存 并退出即可生效

![](https://cdnforspeed.oss-cn-beijing.aliyuncs.com/Img/%E4%B8%AA%E4%BA%BA%E7%AC%94%E8%AE%B0%E5%9B%BE%E7%89%87/20220211141507.png)

使用  fdisk -l 查看分区情况 能看到分区已经建立成功  /dev/sda3 

![](https://cdnforspeed.oss-cn-beijing.aliyuncs.com/Img/%E4%B8%AA%E4%BA%BA%E7%AC%94%E8%AE%B0%E5%9B%BE%E7%89%87/20220211141800.png)

> pvcreate指令用于将物理硬盘分区初始化为物理卷，以便被LVM使用。

使用 `pvcreate /dev/sda3`  将刚才分好的区初始化为物理卷

![](https://cdnforspeed.oss-cn-beijing.aliyuncs.com/Img/%E4%B8%AA%E4%BA%BA%E7%AC%94%E8%AE%B0%E5%9B%BE%E7%89%87/20220211142256.png)

> pvdisplay指令用于显示物理卷的属性（大小，PE大小，被卷组描述符使用的空间）。

使用 `pvdisplay` 查看刚创建的物理卷的属性

![](https://cdnforspeed.oss-cn-beijing.aliyuncs.com/Img/%E4%B8%AA%E4%BA%BA%E7%AC%94%E8%AE%B0%E5%9B%BE%E7%89%87/20220211142441.png)

可以看到物理卷已经创建成功 大小为5G

> vgextend指令用于动态的扩展LVM卷组，它通过向卷组中添加物理卷来增加卷组的容量。

使用 `vgextend centos /dev/sda3` 将刚创建的物理卷加入卷组"centos"

![](https://cdnforspeed.oss-cn-beijing.aliyuncs.com/Img/%E4%B8%AA%E4%BA%BA%E7%AC%94%E8%AE%B0%E5%9B%BE%E7%89%87/20220211142817.png)

> lvresize指令用于调整LVM逻辑卷的空间大小，可以增大空间和缩小空间。

使用 `lvresize -L +5G /dev/mapper/centos-root`  给  `/dev/mapper/centos-root`添加5G的空间

![](https://cdnforspeed.oss-cn-beijing.aliyuncs.com/Img/%E4%B8%AA%E4%BA%BA%E7%AC%94%E8%AE%B0%E5%9B%BE%E7%89%87/20220211143305.png)

> xfs_growfs  
>
> XFS是一个开源的（GPL）日志文件系统，最初由硅谷图形（SGI）开发，现在大多数的Linux发行版都支持。事实上，XFS已被最新的CentOS/RHEL 7采用，成为其默认的文件系统。在其众多的特性中，包含了“在线调整大小”这一特性，使得现存的XFS文件系统在已经挂载的情况下可以进行扩展。然而，对于XFS文件系统的缩减却还没有支持。
>
> 要扩展一个现存的XFS文件系统，你可以使用命令行工具xfs_growfs，这在大多数Linux发行版上都默认可用。由于XFS支持在线调整大小，目标文件系统可以挂载，也可以不挂载。

使用 `xfs_growfs  /dev/mapper/centos-root ` 刷新同步下文件 再使用df -h 就能查看到已经扩容成功了

![](https://cdnforspeed.oss-cn-beijing.aliyuncs.com/Img/%E4%B8%AA%E4%BA%BA%E7%AC%94%E8%AE%B0%E5%9B%BE%E7%89%87/20220211143647.png)



# xshell

常见问题

## 上传文件出现权限不允许

permission is not allowed

![](https://cdnforspeed.oss-cn-beijing.aliyuncs.com/Img/%E4%B8%AA%E4%BA%BA%E7%AC%94%E8%AE%B0%E5%9B%BE%E7%89%87/20210926104218.png)

切换权限  su root  将~ 变成 # 符号 即可

如果不行  直接使用chmod 777 目标文件夹