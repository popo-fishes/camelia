---
title: Message
lang: cn-ZH
---

# Dialog 对话框

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 Dialog 在当前页面正中打开一个浮层，承载相应的操作。

## 基础用法

:::demo Dialog 弹出一个对话框

dialog/basic

:::

## 居中对话框

设置 align-center 为 true 使对话框水平垂直居中。
:::demo 从屏幕中心打开对话框。

dialog/center

:::

## API

### Dialog props

| 属性名            | 说明                                                                                           | 类型                  | 默认值 |
| ----------------- | ---------------------------------------------------------------------------------------------- | --------------------- | ------ |
| open(v-model)     | 对话框是否可见                                                                                 | ^[boolean]            | false  |
| width             | 对话框的宽度                                                                                   | ^[string] / ^[number] | 50%    |
| top               | dialog CSS 中的 margin-top 值，默认为 15vh                                                     | ^[string]             | —      |
| alignCenter       | 是否水平垂直对齐对话框                                                                         | ^[boolean]            | false  |
| modal             | 是否需要遮罩层                                                                                 | ^[boolean]            | true   |
| closeOnClickModal | 点击蒙层是否可以关闭                                                                           | ^[boolean]            | false  |
| showClose         | 是否显示关闭按钮                                                                               | ^[boolean]            | true   |
| title             | 弹窗标题                                                                                       | ^[string]             | —      |
| zIndex            | 和原生的 CSS 的 z-index 相同，改变 z 轴的顺序                                                  | ^[number]             | —      |
| overlayClass      | 遮罩的自定义类名                                                                               | ^[string]             | —      |
| lockScroll        | 否在 Dialog 出现时将 body 滚动锁定                                                             | ^[boolean]            | true   |
| appendTo          | 默认给弹窗挂到哪个地方：了解teleport内置组件属性                                               | ^[string]             | body   |
| beforeClose       | 关闭前的回调，会暂停 Dialog 的关闭. 回调函数内执行 done 参数方法的时候才是真正关闭对话框的时候 | ^[Function]           | —      |

### Dialog Events

| 属性名 | 说明           | 类型                     |
| ------ | -------------- | ------------------------ |
| close  | 弹窗关闭时事件 | ^[Function] `() => void` |

### Slots

| 插槽名 | 说明                    |
| ------ | ----------------------- |
| -      | Dialog 的内容           |
| header | 对话框标题的内容        |
| footer | Dialog 按钮操作区的内容 |
