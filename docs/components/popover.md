---
title: Popover
lang: cn-ZH
---

# Popover 气泡卡片

1. 点击元素，弹出气泡式框。
2. 高扩展性的气泡卡片。

## 基础用法

:::demo trigger 属性被用来决定 popover 的触发方式，支持的触发方式： hover、click

popover/basic

:::

## 位置

:::demo 在这里我们提供有十二个方向的展示方式，可以通过以下完整示例来理解，选择你要的效果。

popover/placement

:::

## 主题

:::demo `dark`

popover/style

:::

## API

### Popover props

| 属性名            | 说明                                                                                                     | 类型                                     | 默认值   |
| ----------------- | -------------------------------------------------------------------------------------------------------- | ---------------------------------------- | -------- |
| trigger           | 触发方式                                                                                                 | `hover` `click`                          | —        |
| persistent        | 设置为 false 时, Popper会根据open的值动态添加 删除节点， 否则它只是被隐藏了                              | ^[boolean]                               | true     |
| offset            | 出现位置的偏移量                                                                                         | ^[number]                                | 6        |
| placement         | [出现的位置](https://popper.js.org/docs/v2/constructors/#options)                                        | ^[string]                                | bottom   |
| strategy          | 描述要使用的定位策略。默认情况下，它是absolute                                                           | ^[string]                                | absolute |
| visible           | 受控模式，来控制它的显示与关闭                                                                           | ^[boolean]                               | —        |
| hideAfterTime     | 消失的延迟，以毫秒为单位（这个的意义主要是延迟切换，不然hover到下拉菜单节点时，菜单就影藏了）            | ^[number]                                | 200      |
| showAfterTime     | 出现延迟，以毫秒为单位                                                                                   | ^[number]                                | 0        |
| transition        | 下拉菜单的动画name（遵循vuejs transition内置组件的name）                                                 | ^[string]                                | —        |
| disabled          | 是否禁止                                                                                                 | ^[boolean]                               | false    |
| popperClass       | popper 添加类名                                                                                          | ^[string]                                | —        |
| popperStyle       | popper添加style                                                                                          | ^[vue“StyleValue”]                       | —        |
| zIndex            | popper层级                                                                                               | ^[number]                                | —        |
| getPopupContainer | 菜单挂载的节点。默认挂载body上, 方法参数是当前触发器节点；如果想挂载到触发器节点下，可以返回这个node参数 | ^[Function] `(node:HTMLElement) => void` | —        |
| enterable         | 鼠标是否可进入到 popper 中                                                                               | ^[boolean]                               | true     |

### Popover Events

| 属性名 | 说明            | 类型        |
| ------ | --------------- | ----------- |
| hide   | popup消失时触发 | ^[Function] |
| show   | popup显示时触发 | ^[Function] |

### Popover defineExpose

| 名称         | 说明                                                                             | 类型                         |
| ------------ | -------------------------------------------------------------------------------- | ---------------------------- |
| popperRef    | fb-popper 组件实例                                                               | ^[object]                    |
| onOpen       | onOpen 方法控制显示状态                                                          | ^[Function]                  |
| onClose      | onClose 方法控制显示状态, 可以传递一个time来覆盖hideAfterTime，为0时立马关闭弹窗 | ^[Function] `(time) => void` |
| updatePopper | 使用popperRef.contentRef.updatePopper()更新位置                                  | ^[Function]                  |

### Slots

| 插槽名  | 说明              |
| ------- | ----------------- |
| default | 触发 & 引用的元素 |
| popup   | 对话框标题的内容  |
