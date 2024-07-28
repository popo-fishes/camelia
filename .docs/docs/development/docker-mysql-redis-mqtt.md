---
order: 2
group:
  path: /env
  title: 配置环境
  order: 1
---

# 🚀一键安装 mysql redis rabbitmq 

相关的 docker 脚本在工程 docker 目录中。
这个目录用来建立开发或者生产的环境。

建议一些密码等要写的加密性高一点，不然有安全隐患。

如何使用 docker，[可以看这个文档](https://github.com/fanhualei/wukong-bd/blob/master/doc/docker-example.md)

| 缩写     | 英文全称                    | 说明                 |
| -------- | --------------------------- | -------------------- |
| dev      | development                 | 开发                 |
| sit      | System Integrate Test       | 系统整合测试（内测） |
| uat      | User Acceptance Test        | 用户验收测试         |
| pet      | Performance Evaluation Test | 性能评估测试（压测） |
| sim      | simulation                  | 仿真                 |
| prd/prod | production                  | 产品/正式/生产       |

## 1、Docker 基本用法

### 1.1 生成容器

```
docker-compose up --build -d
```

### 1.2 常用命令

```sh
# 登录到redis中 -a redis密码
docker-compose exec redis redis-cli -a redis123

# 登录到mysql
docker-compose exec  mysql  mysql -uroot -pMysql@root123
```

### 1.3 基本命令

```sh
#停止运行并移除容器
docker-compose down

#启动单个服务
docker-compose up -d 服务名

#查看当前运行的服务
docker-compose ps

#构建镜像，--no-cache表示不用缓存，否则在重新编辑Dockerfile后再build可能会直接使用缓存而导致新编辑内容不生效
docker-compose build --no-cache

#查看镜像
docker-compose images

#查看日志
docker-compose logs

#启动/停止服务
docker-compose start/stop 服务名

#拉取镜像
docker-compose pull 镜像名
```

## 2、配置持久化路径

在 idea 中的 terminal 命令行下：

```
cd docker/dev
vi .env
```

> 持久化的内容放到 dev 中

```
# 基础路径
DATA_PATH=/data/dev
```

​

## 3、mysql

搭建开发环境的 mysql 环境，有两个问题要处理：

- 映射到宿主机端口，模拟在本地安装 mysql
- 解决中文乱码的问题，将 mysql 默认的字符集修改成 utf8.

> 解决思路

建立 utf8.cnf 文件

```cnf
[mysqld]
character-set-server = utf8mb4
default_authentication_plugin=mysql_native_password

[client]
default-character-set=utf8
```

将这个文件复制到 docker 容器中

```
FROM mysql:8.0.27
#修改配置,让mysql支持utf8
# Mysql5.7配置
#COPY ./utf8.cnf /etc/mysql/mysql.conf.d/

# Mysql8的配置
COPY ./utf8.cnf /etc/mysql/conf.d/
```

`注意不能复制到 /etc/mysql/conf.d` 这个目录被外挂到宿主机，这样做是不行的。

> 验证是否成功

```sh
docker-compose exec  mysql  mysql -uroot -pMysql@root123

#登录到mysql
> show variables like "char%";
```

结果如下

```sh
mysql> show variables like "char%";
+--------------------------+--------------------------------+
| Variable_name            | Value                          |
+--------------------------+--------------------------------+
| character_set_client     | utf8mb3                        |
| character_set_connection | utf8mb3                        |
| character_set_database   | utf8mb4                        |
| character_set_filesystem | binary                         |
| character_set_results    | utf8mb3                        |
| character_set_server     | utf8mb4                        |
| character_set_system     | utf8mb3                        |
| character_sets_dir       | /usr/share/mysql-8.0/charsets/ |
+--------------------------+--------------------------------+
8 rows in set (0.01 sec)
```

## 4、redis

### ① 登录到 redis 中

```sh
# -a redis密码
docker-compose exec redis redis-cli -a redis123
```

### ② 基本操作

```
keys *
set key1 "hello"
get key1
set key2 1
INCR key2
get key2
登录redis即获得帮助
    redis-cli
    help
基本使用命令
    查看所有的key列表  keys *
    增加一条记录key1  set key1 "hello"
    得到数据         get key1
    增加一条数字记录  set key2 1
    让数字自增       INCR key2
    删除一个        del key1
    删除所有数据     flushall
```

### ③ 测试持久化

删除容器后重启，发现以前的数据都还在

```
docker-compose down
docker-compose up -d
docker-compose exec redis redis-cli -a redis123
127.0.0.1:6379>  get key1
```

### ④ 卸载 redis

如果在宿主机器上安装了 redis，可以卸载了，使用 docker 中的更方便。

```sh
# 先看看是否存在
/etc/init.d/redis-server status

sudo apt-get purge --auto-remove redis-server
```

## 4、 rabbitmq

在实际生产环境中，需要配置证书。

[rabbitmq 的使用方法，可以看这个文档](https://github.com/fanhualei/wukong-framework/blob/master/reference/mq.md)

### ① Web 访问管理页面

在浏览器中输入`http://localhost:15672/ `，访问到 rabbitmq，用户名：guest 密码：fanhualei

### ② rabbitmq 基本操作

```sh
docker-compose exec rabbitmq /bin/ash

#查看状态
rabbitmqctl status

#查看可用插件及已安装插件
rabbitmq-plugins list

#查看用户
rabbitmqctl list_users

#添加管理用户
rabbitmqctl add_user admin yourpassword
rabbitmqctl set_user_tags admin administrator
```

### ③ 客户端(命令行)：mosquitto

mosquitto 是一个 mqtt 服务，docker 镜像才 3M，所以拿过来当客户端用。

[Mosquitto-pub 地址](https://mosquitto.org/man/mosquitto_pub-1.html) [Mosquitto-sub 地址](https://mosquitto.org/man/mosquitto_sub-1.html)

> 打开一个窗口，用来监听

```
docker-compose exec mosquitto mosquitto_sub -t topic1
```

想结束了，就用`ctrl+c`来结束

> 打开一个窗口，用来发送

```
docker-compose exec mosquitto mosquitto_pub -t topic1 -m 'hello world1'
```

通过用户名来进行测试

- -h rabbitmq 用来将服务器指向 rabbitmq
- -u guest 用户名
- -p fanhualei 密码

> 打开一个窗口，用来监听

```
docker-compose exec mosquitto mosquitto_sub -t topic1  -h rabbitmq -u guest -P fanhualei
```

想结束了，就用`ctrl+c`来结束

> 打开一个窗口，用来发送

```
docker-compose exec mosquitto mosquitto_pub -t topic1 -m 'hello world1'  -h rabbitmq -u guest -P fanhualei
```

### ④ 客户端(UI 界面)：mqttfx

通过这个地址，下载安装：http://www.jensd.de/apps/mqttfx/1.7.1/mqttfx-1.7.1-64bit.deb

> 使用方法

- [MQTT 入门（4）- 客户端工具](https://www.iteye.com/blog/rensanning-2406598)
- 推荐：MQTTfx 或 Mosquitto
