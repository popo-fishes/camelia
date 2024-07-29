---
title: 更新记录
order: 8
---

# 更新记录

将严格遵循 [Semantic Versioning 2.0.0](http://semver.org/lang/zh-CN/) 语义化版本规范。

## 核心包

### v-3.0.0

2023-4-20

- SpringBoot 主版本升级 3.0.5

- 升级 gradle 到 7.6.1

- 功能部分变更比较多，把前期项目中遇到的问题，在这个版本中都进行了优化。

### v-2.2.2

2021-8-15

- SpringBoot 主版本升级 2.5.3

- 升级 gradle 到 7.1.1
  - 执行这个命令 `./gradlew wrapper --gradle-version=7.1.1 --distribution-type=bin`
  - 除了执行命令，也可以从 springBoot 快速生成一个 Demo，然后把里面的配置到项目中

### v-2.2.1

2021-7-15 增加了多表查询

### v-2.1.3

2021-7-5 修改了一些 bug，完善了一些兼容性

### v-2.1.1

2021-6-30 更新了安全包组件，变更了类名，与前面的工程完全不兼容
