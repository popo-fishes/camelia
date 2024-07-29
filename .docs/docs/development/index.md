---
order: 1
group:
  path: /env
  title: 配置环境
  order: 1
---

# 🚀构建开发环境

`springboot3.0+` `springsecurity` `junit` `mybatis` `jwt` `https` `redis` `gitlab`

①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳✕✓✔✖

建议在 linux 下开发，这样有种飞的感觉，如果在 windows 下开发，想死的心都有。 这里有一个[ubuntu20 安装说明](#)

- 1：安装 Idea
  - 需要安装 lombda 插件
  - 安装`openJdk17`
- 2：从[gitee](https://gitee.com/fanhualei/wukong-demo)或者[github](https://github.com/fanhualei/wukong-demo)下载代码
- 3：安装 Mysql 等
  - [安装 docker 与 docker-compose](https://get.daocloud.io/)
  - 一键安装`mysql redis rabbitmq` 看 `ref/docker/readme.md`
- 4：刷新 gradle 并 build 整个工程

```
如果你的机器上以前安装过mysql、redis、rabbitmq，那么可能会出现端口冲突，
那么就需要你手工修改docker-compose文件，以及springboot中的配置文件了。
```
