# 1、同行对比

IIS

Apache

Tomcat

Lighttpd

Nginx优点

5W并发量

Ng采用了多进程和I/O多路复用（epoll）的底层实线的

# 2、在线部署nginx（简单安装）

1、安装gcc编译器、gcc能处理各种语言   使用命令 `yum install -y gcc`来安装		检查是否安装成功  `gcc-v`

2、安装pcre  使用命令`yum install -y pcre pcre-devel` 来安装		检查是否安装成功  `rpm -qa pcre pcre-devel`

因为ng有用到pcre库（兼容正则表达式库）rewrite 和 http 模块都有用到正则库

3、zlib

zlib库提供了压缩算法 使用命令`yum install -y zlib zlib-devel` 来安装	检查是否安装成功  `rpm -qa zlib zlib-devel`

4、OpenSSL  使用命令`yum install -y openssl openssl-devel` 来安装	检查是否安装成功  `rpm -qa openssl openssl-devel`

OpenSSL是一个开放源代码的软件库包

SSL：安全套接协议的缩写，可以在intelnet上提供秘密性传输。

5、在线下载ng  使用命令`wget ng的下载链接`  然后使用`tar -zxvf nginx-1.13.9.tar.gz` 解压到当前文件夹或者指定文件夹

6、进入到ng文件夹内  使用命令 `./configure` 进行简单安装

7、然后运行 `make && make install` 进行全部安装  （默认安装路径是`/usr/local/nginx`）

8、启动ng  进入到sbin 文件夹内 运行 `./nginx` 即运行成功

# 3、离线部署nginx（简单安装）

http://nginx.org/en/download.html  在官网下载ng包  选择linux版 然后上传☞服务器

安装ng时需要再安装一些环境所需的包

1、进入gcc文件夹  运行  ` rpm -Uvh *.rpm --nodeps --force`  命令             	  检查是否安装成功  `gcc-v`

2、进入gcc-c++文件夹  运行  ` rpm -Uvh *.rpm --nodeps --force`  命令			检查是否安装成功  `g++-v`

3、安装PCRE   解压 `tar -zxvf pcre-8.35.tar.gz` 然后 编译  ./configure && make && make install 

4、安装libtool   解压 ` tar -zxvf libtool-2.4.2.tar.gz` 然后 编译  ./configure && make && make install 

5、安装ng  解压 `tar -zxvf nginx-1.13.9.tar.gz`  然后 编译  ./configure && make && make install 

启动ng方式            nginx安装目录地址 -c nginx配置文件地址 如下：

```nginx
/usr/local/nginx/sbin/nginx -c /usr/local/nginx/conf/nginx.conf            （安装后的路径会被变到/usr/local  里面）
```

```nginx
命令： 
路径 -s stop 							停止ng
路径 -s reload  						重启ng 


netstat -tunlp   						查看端口占用
netstat -tunlp |grep                      查看指定端口
```

# 4、复杂安装

相当于在configure上做一些命令的添加 

注意：要重新添加configure后面跟的后缀得卸载ng后重新安装

```shell
./configure --prefix=/usr/local/nginx --with-http_ssl_module --with-openssl=/usr/cxy/openssl-1.1.1l
```



# 5、卸载nginx

1、`./nginx -s stop` 先把ng停掉

2、`rm -rf /usr/local/nginx` 将ng删除

3、`make clean` 将安装包之前编译的环境清除掉

# 6、无停止服务更新nginx版本

1)、将旧版本的nginx下sbin的nginx进行备份

```shell
cd /usr/local/nginx/sbin
mv nginx nginxold
```

2)、将新版本的安装目录编译后的objs目录下的nginx文件拷贝到原来 `/usr/local/nginx/sbin` 目录下

```shell
cd ~/nginx/newVersion/nginx-1.16.1/objs
cp nginx /usr/local/nginx/sbin
```

3)、发送信号USR2给Nginx的旧版本对应的master进程

```shell
kill -USR2 `more /usr/local/logs/nginx.pid`
```

4)、发送信号QUIT给Nginx的旧版本对应的master进程

```shell
kill -QUIT `more /usr/local/logs/nginx.pid.oldpid`
```

# 7、nginx服务器升级

方案一、使用nginx服务信息升级

如上6

方案二、使用nginx安装目录的make命令升级

1)、将旧版本的nginx下sbin的nginx进行备份

```shell
cd /usr/local/nginx/sbin
mv nginx nginxold
```

2)、将新版本的安装目录编译后的objs目录下的nginx文件拷贝到原来 `/usr/local/nginx/sbin` 目录下

```shell
cd ~/nginx/newVersion/nginx-1.16.1/objs
cp nginx /usr/local/nginx/sbin
```

3)、进入到安装目录（注意再nginx目录下 而不是sbin目录下），执行make upgrade

4)、验证   nginx -V

# 8、user指令

用于配置运行nginx服务器的worker进程的用户和用户组

```
useradd www   会在home目录下创建一个www的用户
user www      设置一个用户信息  www
在home/www/   目录下放置一个index.html页面


修改ng一个http模块的配置（可以先看下ng整体配置文件）
user  www;
location /{
	root	/home/www/html
	index	/index.html index.htm
}
```

# 9、work进程和master进程

如果要关闭work进程   

```nginx
# user  nobody;         	# 用户组
master_process	off    	# 默认使用on 开启工作进程
worker_processes  1		# 用于配置nginx生成工作进程的数量，这是nginx服务器实现并发处理服务的关键所在，建议与服务器cpu内核数保持一致
```

指定work进程的数量

```nginx
worker_processes  2;
```



# 9、ng常使用的一些命令

```shell
ps -ef | grep nginx   过滤出关于ng的进程信息
./nginx -t  检查config配置文件是否有错
./nginx -T  检查config配置文件是否有错并打印出配置文件
./nginx -tq 检查config配置文件是否有错并打印出配置文件中出错的位置和错误
```

## 退出ng进程

```shell
ps -ef | grep nginx 		拿到进程号
more ../logs/nginx.pid		拿到进程号 两种方式都可
kill -TERM 14270    		杀掉进程   关于TERM看如下表
```

```shell
./nginx -s stop 	# 停止ng
./nginx -s reload 	# 重启ng
./nginx -s start 	# 启动ng
nginx -s 是给nginx发信号  如果未启动过直接 /usr/local/nginx/sbin/nginx 启动即可

./nginx -s quit     # 见如下
./nginx -s hub
./nginx -s usr1
./nginx -s usr2
./nginx -s winch

./nginx -g "pid logs/test.pid"		# 以携带全局配置的方法启动ng
```



| **TERM, INT** | Quick shutdown  直接杀死进程（粗暴）                         |
| :-----------: | :----------------------------------------------------------- |
|   **QUIT**    | Graceful shutdown  优雅的关闭进程,即等请求结束后再关闭（推荐使用） |
|    **HUP**    | Configuration reload ,Start the new worker processes with a new configuralltion Gracefully shutdown the old worker processes<br/>(改变配置文件,平滑的重读配置文件） |
|   **USR1**    | Reopen the log files 重读日志,在日志按月/日分割时有用        |
|   **USR2**    | Upgrade Executable on the fly 平滑的升级                     |
|   **WINCH**   | Gracefully shutdown the worker processes 优雅关闭旧的进程(配合USR2来进行升级) |

```shell
# 如果我删除了ng的日志  这时我不想重启 又要重新生成日志可以使用
kill -USR1 `more /usr/local/nginx/logs/nginx.pid`

# 只优雅的关闭work进程
kill -WINCH 14270

# 不重启nginx又要平滑的升级ng
ps -ef | grep nginx 		拿到进程号
kill -USR2 14270		
ps -ef | grep nginx 		你会发现有两个master进程和work进程
进入到logs文件内  会出现两个文件  一个是nginx.pid.oldbin 一个是nginx.pid
如果确定服务器升级成功之后  执行  kill -QUIT 旧的主进程号  然后就升级成功了
```



# 反向代理

## **代理斜杠问题**  

**1.以下是加不加斜杠都是一样的路径**  都会访问  `http://10.142.124.221:18080/`

```nginx
server{
    listen 80;
    server_name localhost;
    location /{
        proxy_pass http://10.142.124.221:18080;
        # proxy_pass http://10.142.124.221:18080/;
    }
}
```

**2.带有前缀的话**

第一个会返回  `http://10.142.124.221:18080/server/index.html`

第二个会返回  `http://10.142.124.221:18080/index.html`

```nginx
server{
    listen 80;
    server_name localhost;
    location /server{
        proxy_pass http://10.142.124.221:18080;
        proxy_pass http://10.142.124.221:18080/;
    }
}
```

或者如果想达到第二个的效果也可以进行如下操作

```nginx
server{
    listen 80;
    server_name localhost;
    location /proxy_api_out/{
        rewrite ^/proxy_api_out/(.*)$ /$1 break;
        proxy_pass http://10.142.124.221:18080;
    }
}

以上是会匹配路径上的/proxy_api_out/  如果匹配上会进行路径重写
```

## 重复出现多次跨域允许*

可以使用`proxy_set_header Origin "";`将代理源的允许所有跨域清除掉 然后再自己设置上

# linux+ssl自签证书+nginx 将http升级成https

nginx 需要开启 ssl模块

执行如下命令

```nginx
./configure --prefix=/usr/local/nginx --with-http_stub_status_module --with-http_ssl_module --with-openssl=/usr/cxy/ssl/openssl-1.1.1

# （/usr/cxy/ssl/openssl-1.1.1   是存放openssl源码的地方  可自行去nginx官网下载）

然后make 
然后make install
```

1)、创建CA私钥， 利用私钥创建CA证书

```shell
#创建CA私钥
openssl genrsa -out rootCA.key 2048
#创建CA证书
openssl req -x509 -new -nodes -key rootCA.key -sha256 -days 1024 -out rootCA.crt
```

2)、创建server私钥以及CSR

```shell
#创建server私钥
openssl genrsa -out server.key 2048
#根据配置要的openssl参数创建服务器csr文件， 后面会用到
openssl req -new -key server.key -out server.csr -extensions v3_req
```

3)、使用CA证书给server.csr做签名

```shell
openssl x509 -req -days 500 -in server.csr -CA rootCA.crt -CAkey rootCA.key -CAcreateserial -out server.crt -sha256 -extensions v3_req
```

4)、将证书放到nginx的conf目录下    如果不这么做 你也可在配置中指定证书的位置

```nginx
ssl_certificate      server.crt;
ssl_certificate_key  server.key;
```

ng完整配置如下：

```shell
server {
    listen       443 ssl;
    server_name  192.168.237.128;

    ssl_certificate      server.crt;
    ssl_certificate_key  server.key;
    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;
    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;
    location / {
        # rewrite ^/snxun/(.*)$ /$1 break;
        proxy_pass http://127.0.0.1:7001; 
        proxy_pass_header Server; 
        proxy_set_header Host $http_host; 
        proxy_redirect off; 
        proxy_set_header X-Real-IP $remote_addr; 
        proxy_set_header X-Scheme $scheme; 
        proxy_connect_timeout 60; 
        proxy_read_timeout 120;
        root   html;
        index  index.html index.htm;
    }
}
```

# 慢慢完善配置文件

```nginx
server {
    listen       8688;
    server_name  localhost;
    #charset koi8-r;
    access_log  logs/8688_haojin.access.log  main;
    error_log   logs/8688_haojin.error.log;
    location /{
        root   html;
        index  index.html index.htm;
    }
    location /haojin-api-out/ {
        add_header 'Access-Control-Allow-Origin' "*";
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'DNT,web-token,app-token,Authorization,Accept,Origin,Keep-Alive,User-Agent,X-Mx-ReqToken,X-Data-Type,X-Auth-Token,vaildMin,If-Modified-Since,Cache-Control,Content-Type,Range,pageNum,pageSize';
        add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
        add_header Pragma "no-cache";
        add_header Cache-Control "no-store, no-cache, must-revalidate, post-check=0, pre-check=0";
        proxy_pass http://10.249.0.31:18080/;
        proxy_set_header Origin "";
        if ($request_method = OPTIONS){
            return 200;
        }
    }
    location /haojin-api-in/ {
        # rewrite ^/haojin-api/(.*)$ /$1 break;
        # add_header 'Access-Control-Allow-Credentials' 'true';
        # add_header 'Access-Control-Allow-Origin' $http_origin;
        add_header 'Access-Control-Allow-Origin' "*";
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        add_header 'Access-Control-Allow-Headers' 'DNT,web-token,app-token,Authorization,Accept,Origin,Keep-Alive,User-Agent,X-Mx-ReqToken,X-Data-Type,X-Auth-Token,vaildMin,If-Modified-Since,Cache-Control,Content-Type,Range,pageNum,pageSize';
        add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
        add_header Pragma "no-cache";
        add_header Cache-Control "no-store, no-cache, must-revalidate, post-check=0, pre-check=0";
        proxy_pass http://10.142.124.221:18080/;
        proxy_set_header Origin "";
        if ($request_method = OPTIONS){
            return 200;
        }
    }
}
```



```shell
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;


events {
    worker_connections  1024;
}


http {
    include       mime.types;
    default_type  application/octet-stream;

    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';

    #access_log  logs/access.log  main;

    sendfile        on;
    #tcp_nopush     on;

    #keepalive_timeout  0;
    keepalive_timeout  65;

    #gzip  on;

    server {
        listen       8688;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

         location / {
            root   html;
            index  index.html index.htm;
	    # proxy_pass http://10.249.0.31:18080;
	    proxy_pass http://10.142.124.221:18080;
            add_header Access-Control-Allow-Methods *;
            add_header Access-Control-Max-Age 3600;
            # add_header Access-Control-Allow-Credentials true;
            # more_clear_headers Access-Control-Allow-Origin;
            # add_header Access-Control-Allow-Origin $http_origin;
            add_header Access-Control-Allow-Headers 
            $http_access_control_request_headers;
            if ($request_method = OPTIONS){
                return 200;
            }
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }
    
    
    server {
        listen       7001;
        server_name  localhost;

        #charset koi8-r;

        #access_log  logs/host.access.log  main;

         location / {
             root   html;
            index  index.html index.htm;
            proxy_pass http://101.231.77.77:28088/;
             add_header Access-Control-Allow-Methods *;
            add_header Access-Control-Max-Age 3600;
            # add_header Access-Control-Allow-Credentials true;
            # more_clear_headers Access-Control-Allow-Origin;
            # add_header Access-Control-Allow-Origin $http_origin;
            add_header Access-Control-Allow-Headers 
            $http_access_control_request_headers;
            if ($request_method = OPTIONS){
                return 200;
            }
        }

        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #
        #location ~ \.php$ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }


    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}


    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

}

```

```shell
./nginx -s reload  				// 重启
```

# 个人记录

P25

https://www.bilibili.com/video/BV1og411T76d?p=25&spm_id_from=pageDriver
