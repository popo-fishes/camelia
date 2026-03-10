---
order: 1
group:
  title: 数据录入
  order: 2
---

# Input 输入框

输入框允许用户在 UI 中输入文本, 它们通常出现在表单和对话框中

## 基础用法

你可以配置`clearable`来清空输入框的值

<code src="@/input/basic.tsx"></code>

## 禁用状态

通过 `disabled` 属性指定是否禁用 input 组件

<code src="@/input/disabled.tsx"></code>

## 限制输入格式

使用 allow-input 限制输入框的输入格式，你可以使用它来达到修饰的效果

<code src="@/input/format.tsx"></code>

## 前缀和后缀

在输入框上添加前缀或后缀图标。

<code src="@/input/icon.tsx"></code>

## 带标签的

在输入框上添加前缀或后缀标签，需要自己写一点点代码
保持组件的简洁性，维护性; 组件内部不处理一些非输入框的需求。

<code src="@/input/label.tsx"></code>

## 文本域

用于多行输入。

<code src="@/input/textarea.tsx"></code>

## 尺寸

除了默认的大小, 可使用 `large`和`small`两种值

<code src="@/input/size.tsx"></code>

## API

### Input props

| 属性名       | 说明                                                              | 类型                                  | 默认值  |
| ------------ | ----------------------------------------------------------------- | ------------------------------------- | ------- |
| value        | 输入框内容                                                        | string                                | —       |
| placeholder  | 占位符                                                            | string                                | 请输入  |
| clearable    | 可以点击清除图标删除内容                                          | boolean                               | false   |
| disabled     | 是否禁用                                                          | boolean                               | false   |
| readonly     | 是否只读                                                          | boolean                               | false   |
| inputStyle   | input 元素或 textarea 元素的 style                                | CSSProperties                         | —       |
| autofocus    | 是否自动获取焦点                                                  | boolean                               | false   |
| maxlength    | 最大输入长度                                                      | number                                | —       |
| size         | 大小                                                              | `large` `default` `small`             | default |
| type         | 类型原生 input 类型                                               | string                                | text    |
| allowInput   | 校验当前的输入是否合法，如果返回 false 输入框便不会响应此次的输入 | Function `(value: string) => boolean` | —       |
| className    | 自定义外层 className                                              | string                                | -       |
| style        | 自定义外层 style                                                  | CSSProperties                         | -       |
| inputStyle   | input 元素的 style                                                | CSSProperties                         | -       |
| prefix       | 带有前缀图标的 input                                              | ReactNode                             | -       |
| suffix       | 带有后缀图标的 input                                              | ReactNode                             | -       |
| onChange     | 输入框内容变化时的回调                                            | function(e)                           | -       |
| onPressEnter | 按下回车的回调                                                    | function(e)                           | -       |
| onClear      | 按下清除按钮的回调                                                | () => void                            | -       |

### Input.TextArea

同 Input 属性, 除了`size` `type` `prefix` `suffix` `onClear` `clearable` 没有之外

### Input methods

| 名称  | 说明              | 类型     |
| ----- | ----------------- | -------- |
| blur  | 使 input 失去焦点 | Function |
| focus | 使 input 获取焦点 | Function |
