---
order: 4
group:
  path: /db
  title: 开发数据库相关代码
  order: 40
---

# 数据库进阶

## 1. 常用功能

### 1.1 事物处理

- 在可能出现错误的 service 函数上添加：@Transactional
- 添加了@Transactional 无论调用 dao 或者其他 service，只要有错误抛出，就进行事物回滚。
- 默认情况下，不再 service 上添加@Transactional，只在需要事物处理的地方，添加@Transactional

### 1.2 自动记录修改时间

建议每个表都添加下面两个字段：

```sql
  gmt_create    DATETIME                DEFAULT CURRENT_TIMESTAMP NULL   COMMENT '记录创建时间',
  gmt_modified  DATETIME                DEFAULT CURRENT_TIMESTAMP NULL   COMMENT '记录修改时间',
```

在配置文件中可以配置是否启用自动填充功能，以及要填充的字段。

```yml
wukong.db.auto-fill-date-column.date-columns=gmt_modified,gmt_test
wukong.db.auto-fill-date-column.enabled=true
```

### 1.3 集成 Flyway

Flyway 是一个数据库版本控制的功能，由于`Example`中用到了数据库，所以这么集成这么一个功能。

[具体内容看 Flyway 集成文档](reference/flyway.md)

## 2. 读写分离与分库
