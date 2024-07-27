---
title: Select
lang: cn-ZH
---

# Select 选择器

选择组件用于从选项列表中收集用户提供的信息

## 基础用法

菜单位于其发光元素下方，除非它们靠近视口的底部。

:::demo 在options 中，设定 disabled 值为 true，即可禁用该选项。

select/basic

:::

## 自定义菜单项

:::demo 你可以自定义如何来渲染每一个选项，将自定义的 HTML 模板插入 fb-option 的 slot 中即可。

select/custom

:::

## 多选

多选时使用 tag 组件来展示已选中的选项。当然你可以配置`presentMode="text"`来用文本方式呈现
:::demo 设置 multiple 属性即可启用多选， 此时 v-model 的值为当前选中值所组成的数组

select/multiple

:::

## 尺寸

:::tip

1. 除了默认的大小, 可使用 `large`和`small`两种值。
2. 此外你还可以配置`clearable`来达到可以清空值。
3. 你还可以设置`disabled`来禁用select

:::

:::demo

select/size

:::

## 筛选选项

可以利用筛选功能快速查找选项。

:::demo 添加filterable属性即可启用搜索功能, 可以通过传入一个 filter-method 来实现自定义筛选

select/screen

:::

## 远程搜索

:::demo 一个带有远程搜索的示例。将`filterable`和`remote`设置为true，同时传入一个`remote-method`

select/search

:::

## 自定义触发器

你可以自定义触发器，来实现文本选择模式
:::demo 其中trigger可以控制如何触发下拉菜单，trigger: `click` | `hover`

select/trigger

:::

## API

### Select props

| 属性名                | 说明                                                                                | 类型                                                             | 默认值  |
| --------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ------- |
| model-value / v-model | 选中项绑定值                                                                        | ^[string] / ^[number] / ^[array]                                 | —       |
| placeholder           | 占位符                                                                              | ^[string]                                                        | 请选择  |
| clearable             | 是否可以清空选项                                                                    | ^[boolean]                                                       | false   |
| disabled              | 是否禁用                                                                            | ^[boolean]                                                       | false   |
| multiple              | 是否多选                                                                            | ^[boolean]                                                       | false   |
| dropdownStyle         | 下拉菜单的 style 属性                                                               | ^[CSSProperties]                                                 | —       |
| transition            | 下拉菜单的动画name（遵循vuejs transition内置组件的name）                            | ^[string]                                                        | —       |
| placement             | 下拉菜单弹出位置                                                                    | `top` `top-start` `top-end` `bottom` `bottom-start` `bottom-end` | bottom  |
| trigger               | 触发方式                                                                            | `hover` `click`                                                  | click   |
| isTriggerPopup        | 是否把菜单挂载到触发器节点下，默认挂载在body节点下                                  | ^[boolean]                                                       | false   |
| suffixIcon            | 自定义后缀图标组件                                                                  | ^[string] / ^[Component]                                         | —       |
| clearIcon             | 自定义清除图标组件                                                                  | ^[string] / ^[Component]                                         | —       |
| size                  | 大小                                                                                | `large` `default` `small`                                        | default |
| reserveKeyword        | 当 multiple 和 filterable被设置为 true 时，是否在选中一个选项后保留当前的搜索关键词 | ^[boolean]                                                       | true    |
| multipleLimit         | 最大选择数量 0为不限制                                                              | ^[number]                                                        | 0       |
| filterable            | 组件是否可筛选                                                                      | ^[boolean]                                                       | false   |
| presentMode           | 多选时的呈现方法，默认为tag，如果是tag，选择多了会换行                              | `tag` `text`                                                     | tag     |
| filterMethod          | 自定义筛选方法                                                                      | ^[Function]                                                      | —       |
| remoteMethod          | 自定义远程搜索方法                                                                  | ^[Function]                                                      | —       |
| loading               | 是否正在从远程获取数据                                                              | ^[boolean]                                                       | false   |
| loadingText           | 从服务器加载数据时显示的文本                                                        | ^[string]                                                        | Loading |
| remote                | 其中的选项是否从服务器远程加载                                                      | ^[boolean]                                                       | false   |
| noMatchText           | 搜索条件无匹配时显示的文字，也可以使用 empty 插槽设置                               | ^[string]                                                        | —       |
| noDataText            | 无选项时显示的文字，也可以使用 empty 插槽设置自定义内容                             | ^[string]                                                        | —       |

### Select Events

| 属性名         | 说明                    | 类型                                   |
| -------------- | ----------------------- | -------------------------------------- |
| change         | 选中值发生变化时触发    | ^[Function] `(value: any) => void`     |
| focus          | 当 input 获得焦点时触发 | ^[Function] `(e: any) => void`         |
| blur           | 当 input 失去焦点时触发 | ^[Function] `(e: any) => void`         |
| visible-change | 下拉框出现/隐藏时触发   | ^[Function] `(value: boolean) => void` |
| remove-tag     | 多选模式下移除tag时触发 | ^[Function] `(value: any) => void`     |

### Select Slots

| 插槽名  | 说明                  | 参数                                                                                                                                   |
| ------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| default | option 组件列表       | —                                                                                                                                      |
| header  | 下拉列表顶部的内容    | —                                                                                                                                      |
| footer  | 下拉列表底部的内容    | —                                                                                                                                      |
| empty   | 无选项时的内容        | —                                                                                                                                      |
| loading | 自定义loading时的内容 | —                                                                                                                                      |
| trigger | 自定义触发器节点      | {selectedLabel: 选中的值，当没选择时，这个值是placeholder} [作用域插槽](https://cn.vuejs.org/guide/components/slots.html#scoped-slots) |

### Option props

| 属性名   | 说明         | 类型                  | 默认值 |
| -------- | ------------ | --------------------- | ------ |
| value    | 选中项绑定值 | ^[string] / ^[number] | —      |
| label    | 选项上的标签 | ^[string]             | —      |
| disabled | 是否禁用     | ^[boolean]            | false  |

### Option Slots

| 插槽名  | 说明         |
| ------- | ------------ |
| default | 默认插槽内容 |
