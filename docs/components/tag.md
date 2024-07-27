---
title: Tag
lang: cn-ZH
---

# Tag 标签

进行标记和分类的小标签。

## 基础用法

:::demo 由 type 属性来选择 tag 的类型。同时使用 size 属性来设置额外尺寸, 可选值包括 large, default 或 small.

tag/basic

:::

## 可删除标签

:::demo 设置 closable 属性可以定义一个标签是否可移除。 它接受一个 Boolean，当 Tag 被移除时会触发 close 事件。

tag/close

:::

## 风格

:::demo Tag 组件提供了三个不同的风格：dark、light 和 plain

tag/style

:::

## 带图标的

:::demo 当需要在 Tag 内嵌入 Icon 时，可以设置 icon 插槽。 同时你还可以设置color来自定义背景色

tag/icon

:::

## API

### Tag props

| 属性名   | 说明           | 类型                                     | 默认值  |
| -------- | -------------- | ---------------------------------------- | ------- |
| type     | Tag 的类型     | `success` `warning` `danger` `info` `""` | ""      |
| closable | 是否可关闭     | ^[boolean]                               | false   |
| color    | 自定义背景色   | ^[string]                                | —       |
| size     | Tag 的尺寸     | `large` `default` `small`                | default |
| effect   | Tag 的风格     | `dark` `light` `plain`                   | light   |
| round    | Tag 是否为圆形 | ^[boolean]                               | false   |

### Tag Events

| 属性名 | 说明                  | 类型                           |
| ------ | --------------------- | ------------------------------ |
| click  | 点击 Tag 时触发的事件 | ^[Function] `(e: any) => void` |
| close  | 关闭 Tag 时触发的事件 | ^[Function] `(e: any) => void` |

### Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 自定义默认内容 |
| icon    | 设置Icon       |
