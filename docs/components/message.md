---
title: Message
lang: cn-ZH
---

# Message 消息提示

全局展示操作反馈信息

## 基础用法

:::demo 用来显示「成功、警告、消息、错误」类的操作反馈。

message/basic

:::

## 可关闭提示

:::tip
Message 拥有可控的 duration， 默认的关闭时间为 3000 毫秒，当把这个属性的值设置为0便表示该消息不会被自动关闭。
:::

:::demo 可以添加关闭按钮。

message/close

:::

## HTML 片段内容

:::demo 将isHtml属性设置为 true,message 就会被当作 HTML 片段处理。

message/html

:::

## 全局方法

已经在app.config.globalProperties 添加了全局方法 $message。 在 vue 实例中你可以使用当前页面中的调用方式调用 Message

## API

### Message props

| 属性名    | 说明                                         | 类型                               | 默认值 |
| --------- | -------------------------------------------- | ---------------------------------- | ------ |
| type      | 消息类型                                     | `info` `success` `warning` `error` | —      |
| message   | 消息文本                                     | ^[string]                          | —      |
| duration  | 显示时间，单位为毫秒。 设为 0 则不会自动关闭 | ^[number]                          | 3000   |
| isHtml    | 是否将 message 属性作为 HTML 片段处理        | ^[boolean]                         | false  |
| showClose | 是否显示关闭按钮                             | ^[boolean]                         | false  |
| icon      | 自定义图标组件                               | ^[Component] / ^[string]           | —      |
| zIndex    | 层级                                         | ^[number]                          | 500    |
| offset    | 距离窗口顶部的偏移量                         | ^[number]                          | 20     |

### Message defineExpose

| 名称     | 说明         | 类型                           |
| -------- | ------------ | ------------------------------ |
| closeAll | 关闭所有消息 | ^[Function] `(e: any) => void` |
