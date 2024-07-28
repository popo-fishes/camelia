---
title: 定制SpringBoot
order: 3
---

# 定制 SpringBoot

这里描述了一些对 Spring 的一些个性化定制。

## 1. 启动项

在 SpringBoot 启动的时候，会进行组件初始化或缓存。

- ID 生成器
- 动态 Sql 组件

其中有些启动项目是可以通过配置文件进行配置的。

## 2. 配置类

### 2.1 安全优化

#### 支持跨域

`CorsConfig` 类中进行了响应的配置

#### 安全配置

`WebSecurityConfig`

### 2.2 Json 优化

`JacksonConfig`配置了全局 Json 优化方式，主要为了前段 Js 只能读取 string，不能读取 long 型的雪花 ID。
自动将`Long`转成了`String`

### 2.3 Redis 优化

配置了 Redis 的时间戳，Redis Key 生成机制，以及不同的 Redis 转换模板。

### 2.4 Swagger 配置

将公用的代码汇总到了`SwaggerDocket`

### 2.5 多语言配置

`I18nConfig`配置了多语言的功能

### 2.6 Mybatis 优化

`MybatisConfig`自动填充时间字段。

## 3. 配置文件

这里描述了通过配置文件进行配置的一些功能

## 4. 拦截器

自定义的一些拦截器。
