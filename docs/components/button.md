---
title: Button
lang: cn-ZH
---

# Button 按钮

按钮用来触发一些操作。

## 基础用法

:::demo 使用 `type`、`plain`、 和 `ghost` 来定义按钮的样式。

button/basic

:::

## 禁用状态

:::demo 按钮可以被禁用。

button/disabled

:::

## 加载状态按钮

点击按钮来加载数据，并向用户反馈加载状态。

通过设置 loading 属性为 true 来显示加载中状态。

:::tip

您可以使用 loading 插槽自定义您的loading图标

:::

:::demo

button/loading

:::

## 尺寸

:::demo 除了默认的大小, 可使用 large和small两种值。

button/size

:::

## API

### Button props

| 属性名   | 说明                     | 类型                                   | 默认值  |
| -------- | ------------------------ | -------------------------------------- | ------- |
| tag      | 自定义元素标签           | ^[string] / ^[Component]               | button  |
| type     | 类型                     | `primary` `success` `warning` `danger` | —       |
| plain    | 是否为次要按钮           | ^[boolean]                             | false   |
| ghost    | 幽灵属性，使按钮背景透明 | ^[boolean]                             | false   |
| size     | 按钮大小                 | `large` `default` `small`              | default |
| width    | 按钮的宽度               | ^[string] / ^[number]                  | —       |
| disabled | 按钮失效状态             | ^[boolean]                             | false   |
| loading  | 设置按钮载入状态         | ^[boolean]                             | false   |
| wave     | 是否需要波浪动效         | ^[boolean]                             | true    |
