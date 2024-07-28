---
order: 3
group:
  path: /env
  title: 配置环境
  order: 1
---

# 一键生成 Mysql 主从

相关的 docker 脚本在工程 docker 目录中。

## 1. 目标

生成 一主一从，主端口 3338，从端口 3339。 持续化目录放在:`/data/ms`

> 生成环境命令

```sh
docker-compose up -d
```

## 2. 测试

### 2.1 操作 master

在主数据库中添加一个数据库以及一个表

```sh
# 登录到master
docker-compose exec  master  mysql -uroot -pMysql@root123

msyql>create database wk;
msyql>use wk;
msyql>create table test(`id` INT, `title` VARCHAR(100) )ENGINE=InnoDB DEFAULT CHARSET=utf8;
msyql>insert into test value(1,"dddd");
```

### 2.2 验证 slave01

登陆到 slave01 中看看有没有效果

```sh
# 登录到slave01
docker-compose exec  slave01  mysql -uroot -pMysql@root123
mysql>SHOW SLAVE STATUS\G
mysql>select * from wk.test;
```

## 3. docker 常用命令

```sh
#停止运行并移除容器 -- 一般移除后，要手工去删除持久化目录
docker-compose down

#启动单个服务
docker-compose up -d 服务名

#查看当前运行的服务
docker-compose ps

#查看镜像
docker-compose images

#查看日志
docker-compose logs

#启动/停止服务
docker-compose start/stop 服务名

```

## 4. 实现原理

### 4.1 简要步骤

- 配置 master
  - 配置 cnf 文件
  - 创建同步用户
- 配置 slave
  - 配置 cnf 文家
  - 连接 master
  - 启动 slave 同步

### 4.2 关键点

> docker 关键点

- slave 要在 master 启动后再启动
- 将 init 初始化脚本，添加到 docker 初始化环境中

> mysql 关键点

在 slave 中，连接 master 时候要设置下面两个数值，在不同的文档上有不同的操作方法。

```
  MASTER_LOG_FILE='mysql-bin.000001',
  MASTER_LOG_POS=155;
```

在参考文档`参考文档3`中就没有设置，这次也是按照这个文档来做的，现在看起来效果还不错。

在以前的文档中，是按照设置来做的，其中`参考文档1`还参考了 mysql 官方的文档。

### 4.3 参考文档

其中`参考文档2`使用了 shell 脚本，来得到 msyql 主库中的`MASTER_LOG_FILE` 数据。

- [参考文档 1：wukong 自己实现的主从](https://github.com/fanhualei/wukong-bd/blob/master/doc/mysql-replication.md)

- [参考文档 2：基于 docker 的 mysql5.7 主从配置及 一键安装&设置脚本](https://blog.csdn.net/chutang0364/article/details/100772357?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-1.nonecase)

- [参考文档 3：Docker 搭建 MySQL 跨主机主从复制](https://blog.csdn.net/weixin_43972854/article/details/105224175)

## 5 思考

- 今后如果做成多个从，是连接到主数据库，还是从其中的一个 slave 作为主数据库？

- 在生产环境中，主从应该放在同一台机器上马？在不同主机上怎么操作？

- 在开发环境中，使用这种模式马？
