---
title: ImgCaptcha
lang: cn-ZH
---

# ImgCaptcha 图文验证码

常用于表单需要输入验证码，在做下一步事情。

## 基础用法

传入一个(width非必须，height非必须)就生成一个图文验证器。
:::demo 点击图文可以切换

imgCaptcha/basic

:::

## 配合输入框使用验证器

:::demo 你可以使用validate方法来获取校验结果

imgCaptcha/check

:::

## API

### ImgCaptcha props

| 属性名 | 说明         | 类型                      | 默认值 |
| ------ | ------------ | ------------------------- | ------ |
| size   | 验证码的长度 | ^[number]                 | 4      |
| width  | 宽度         | ^[number]                 | 95     |
| height | 高度         | ^[number]                 | 38     |
| type   | 类型         | `blend` `number` `letter` | number |

### ImgCaptcha defineExpose

| 名称     | 说明         | 类型        |
| -------- | ------------ | ----------- |
| validate | 获取校验结果 | ^[Function] |
