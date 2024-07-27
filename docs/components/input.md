---
title: Input
lang: cn-ZH
---

# Input 输入框

输入框允许用户在 UI 中输入文本, 它们通常出现在表单和对话框中

## 基础用法

:::demo 你可以配置`clearable`来清空输入框的值

input/basic

:::

## 禁用状态

:::demo 通过 `disabled` 属性指定是否禁用 input 组件

input/disabled

:::

## 限制输入格式

:::demo 使用 allow-input 限制输入框的输入格式，你可以使用它来达到修饰的效果

input/format

:::

## 前缀和后缀

:::demo 在输入框上添加前缀或后缀图标。

input/icon

:::

## 带标签的

在输入框上添加前缀或后缀标签，需要自己写一点点代码
:::demo 保持组件的简洁性，维护性; 组件内部不处理一些非输入框的需求。

input/label

:::

## 文本域

:::demo 添加 `type="textarea"` 属性, 用于多行输入。

input/textarea

:::

## 尺寸

:::demo 除了默认的大小, 可使用 `large`和`small`两种值

input/size

:::

## API

### Input props

| 属性名                | 说明                                                              | 类型                                     | 默认值  |
| --------------------- | ----------------------------------------------------------------- | ---------------------------------------- | ------- |
| model-value / v-model | 输入框内容                                                        | ^[string] / ^[number]                    | —       |
| placeholder           | 占位符                                                            | ^[string]                                | 请输入  |
| clearable             | 可以点击清除图标删除内容                                          | ^[boolean]                               | false   |
| disabled              | 是否禁用                                                          | ^[boolean]                               | false   |
| readonly              | 是否只读                                                          | ^[boolean]                               | false   |
| inputStyle            | input 元素或 textarea 元素的 style                                | ^[CSSProperties]                         | —       |
| autofocus             | 是否自动获取焦点                                                  | ^[boolean]                               | false   |
| maxlength             | 最大输入长度                                                      | ^[number]                                | —       |
| size                  | 大小                                                              | `large` `default` `small`                | default |
| type                  | 类型原生 input 类型 \| textarea                                   | ^[string]                                | text    |
| allowInput            | 校验当前的输入是否合法，如果返回 false 输入框便不会响应此次的输入 | ^[Function] `(value: string) => boolean` | —       |

### Input Events

| 属性名 | 说明                                                        | 类型        |
| ------ | ----------------------------------------------------------- | ----------- |
| change | 仅当 modelValue 改变时，当输入框失去焦点或用户按Enter时触发 | ^[Function] |
| input  | Input 值改变时触发                                          | ^[Function] |
| blur   | 当选择器的输入框失去焦点时触发                              | ^[Function] |
| focus  | 当选择器的输入框获得焦点时触发                              | ^[Function] |

### Input defineExpose

| 名称  | 说明                       | 类型        |
| ----- | -------------------------- | ----------- |
| blur  | 使 input 失去焦点          | ^[Function] |
| focus | 使 input 获取焦点          | ^[Function] |
| clear | 清除 input 值              | ^[Function] |
| ref   | HTML元素 input 或 textarea | ^[object]   |

### Slots

| 插槽名 | 说明                                      |
| ------ | ----------------------------------------- |
| prefix | 设置前置标签，只对非 type="textarea" 有效 |
| suffix | 设置后置标签，只对非 type="textarea" 有效 |
