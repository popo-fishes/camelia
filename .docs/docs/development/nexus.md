---
order: 4
group:
  path: /env
  title: 配置环境
  order: 1
---

# 搭建私有 maven 服务器

如果不是开源软件，在上传服务器之前，可以先[混淆代码](proguard.md)

## 1. 安装与配置

这次使用 nexus 作为 maven 私有服务

### 1.1 关键点

> 系统要求

cpu 最低 4 核，内存 8G，详细见[官网说明](https://help.sonatype.com/repomanager3/installation/system-requirements#SystemRequirements-WebBrowser)

`也有网友说：阿里云服务器ECS一台 1核CPU 2G内存(注意：最低为2G，否则运行报错)`

> 镜像地址

[docker 镜像地址](https://hub.docker.com/r/sonatype/nexus3/)

> 注意事项

- [官方系统要求：4 核 8G](https://help.sonatype.com/display/NXRM3/System+Requirements)，网友所 1 核 2G 也可以。

- 在`admin.password`文件内修改密码

- 新容器启动该要（2-3 分钟），使用`docker logs -f nexus`看日志

- 程序安装到`/opt/sonatype/nexus`目录中了

- `/nexus-data`用于配置，日志和存储。此目录需要 Nexus 进程（UID 200 运行）可写。

> 持续数据

方法一：创建目录

```sh
$ mkdir /some/dir/nexus-data && chown -R 200 /some/dir/nexus-data
$ docker run -d -p 8081:8081 --name nexus -v /some/dir/nexus-data:/nexus-data sonatype/nexus3
```

方法二：使用卷

```sh
$ docker volume create --name nexus-data
$ docker run -d -p 8081:8081 --name nexus -v nexus-data:/nexus-data sonatype/nexus3
```

### 1.2 安装

在`docker/nexus`中有相关的脚本可以参考。

首先创建一个目录

```sh
sudo mkdir -p /data/nexus-data && sudo chown -R 200 /data/nexus-data
```

其次运行 docker compse

```sh
docker-compose up -d
```

### 1.3 配置

nexus

[Gradle 中文教程系列]-跟我学 Gradle-4.1：Nexus 私服的安装与配置

https://www.jianshu.com/p/e8d999465edf

## 2. 参考文档

- 官方文档

  - [官方帮助文档](https://help.sonatype.com/repomanager3)
  - [下载地址](https://help.sonatype.com/repomanager3/download)

- 网友文档
  - [用 Docker Compose 方式安装 Nexus 3](https://blog.csdn.net/nklinsirui/article/details/96335635)
  - [gradle 配置 nexus repository](https://www.jianshu.com/p/55a1286b6a6a)
  - [docker 安装指定版本 nexus3](https://www.cnblogs.com/moris5013/p/11440784.html)
  - [docker-compose 搭建 nexus3 以及在项目中的使用](https://blog.csdn.net/weixin_38287709/article/details/105303803)
