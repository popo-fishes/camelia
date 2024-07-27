---
title: Checkbox
lang: cn-ZH
---

# Checkbox 多选框

多选框。

## 基础用法

:::demo 简单的 checkbox, 设置 disabled 属性可以禁用。

checkbox/basic

:::

## Checkbox 组

:::demo 多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项

checkbox/group

:::

## 全选

:::demo indeterminate 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果

checkbox/all

:::

## API

### Checkbox props

| 属性名                | 说明                                                     | 类型                        | 默认值 |
| --------------------- | -------------------------------------------------------- | --------------------------- | ------ |
| model-value / v-model | 选中项绑定值                                             | `boolean` `string` `number` | —      |
| label                 | 选中状态的值                                             | `boolean` `string` `number` | —      |
| tag                   | 复选框组元素标签                                         | ^[string]                   | label  |
| name                  | CheckboxGroup 下所有 input[type="checkbox"] 的 name 属性 | ^[string]                   | —      |
| indeterminate         | 设置不确定状态，仅负责样式控制                           | ^[boolean]                  | false  |
| disabled              | 是否禁用                                                 | ^[boolean]                  | false  |
| wave                  | 是否需要点击波浪效果                                     | ^[boolean]                  | true   |

### Checkbox Events

| 属性名 | 说明                     | 类型                           |
| ------ | ------------------------ | ------------------------------ |
| change | 当绑定值变化时触发的事件 | ^[Function] `(e: any) => void` |

### Slots

| 插槽名  | 说明           |
| ------- | -------------- |
| default | 自定义默认内容 |
