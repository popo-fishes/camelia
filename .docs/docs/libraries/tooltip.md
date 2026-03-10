---
order: 3
group:
  title: 数据展示
  order: 3
---

# Tooltip 文字提示

常用于展示鼠标 hover 时的提示信息。

## 基础用法

最简单的用法。
```tsx
import React from 'react';
import { Tooltip } from 'camelia';

const App: React.FC = () => (
  <Tooltip title="prompt text">
    <span>Tooltip will show on mouse enter.</span>
  </Tooltip>
);

export default App;
```
## 位置

在这里我们提供有十二个方向的展示方式，可以通过以下完整示例来理解，选择你要的效果。

<code src="@/tooltip/placement.tsx"></code>

## 主题

Tooltip 组件内置了两个主题：dark和light

通过设置 effect 来修改主题，默认值为 dark.

<code src="@/tooltip/theme.tsx"></code>

## 箭头隐藏

支持显示、隐藏
```tsx
import React from 'react';
import { Tooltip } from 'camelia';

const App: React.FC = () => (
  <Tooltip title="prompt text" showArrow={false}>
    <span>hide arrow</span>
  </Tooltip>
);

export default App;
```

## 禁用

通过设置 disabled 可以禁用 Tooltip。

```tsx
import React, {useState} from 'react';
import { Tooltip, Button } from 'camelia';

const App: React.FC = () => {
  const [disabled, setDisabled] = useState(true);

  return (
    <>
      <Button className="mr-2" plain onClick={() => setDisabled(!disabled)}>{disabled ? 'Enable' : 'Disable'}</Button>
      <Tooltip title="prompt text" disabled={disabled}>
        <span>Tooltip will show on mouse enter.</span>
      </Tooltip>
    </>
  );
};

export default App;

```

## API

| 参数  | 说明     | 类型                         | 默认值 |
| ----- | -------- | ---------------------------- | ------ |
| title | 提示文字 | ReactNode \| () => ReactNode | -      |

### 共同的 API

以下 API 为 Tooltip、Popover 共享的 API。

| 属性名            | 说明                                                                                                     | 类型                                     | 默认值   |
| ----------------- | -------------------------------------- | ------------------------- | -------- |
| trigger           | 触发方式                                                                                                 | `hover` `click`                          | hover         |
| effect | Tooltip 主题，内置了 dark / light 两种 | string | dark      |
| offset            | 出现位置的偏移量                                                                                         | number                               | 6        |
| placement         | [气泡框位置](https://popper.js.org/docs/v2/constructors/#options)                                        | string                               | top   |
| strategy          | 描述要使用的定位策略。默认情况下，它是absolute                                                           | string                             | absolute |
| hideAfterTime     | 消失的延迟，以毫秒为单位           | number                                | 100      |
| showAfterTime     | 出现延迟，以毫秒为单位                                                                                   | number                               | 100        |
| transitionName        | [动画名称, 请查看描述](https://reactcommunity.org/react-transition-group/css-transition)                                                                                                 | string                               | —        |
| duration        | 执行动画的时长(以毫秒为单位)的                                                                                                 | number                               | 200       |
| disabled          | 是否禁止                                                                                                 | boolean                              | false    |
| destroyTooltipOnHide        | 关闭后是否销毁 Tooltip                             | boolean                             | true     |
| overlayClassName       | 卡片类名                                                                                         | string                               | —        |
| overlayStyle       | 卡片style                                                                                          | CSSProperties                       | —        |
| zIndex            | 设置 Tooltip 的 z-index                                                                                               | number                              | —        |
| visible           | 受控模式，来控制它的显示与关闭                                                                           | boolean                             | —        |
| getPopupContainer | 浮层渲染父节点，默认渲染到 body 上 | (triggerNode:HTMLElement) => void | —        |
| showArrow | tooltip 的内容是否有箭头 | boolean | true        |
| virtualTriggering | 用来标识虚拟触发是否被启用 | boolean | false        |
| virtualRef | 标识虚拟触发时的触发元素 | MutableRefObject< HTMLElement > | —        |
| onOpenChange | 显示隐藏的回调 | (open: boolean) => void | —        |

### Methods

| 名称         | 说明                                                                             | 类型                         |
| ------------ | -------------------------------------------------------------------------------- | ---------------------------- |
| tooltipRef    | tooltip Component                                                           | object                 |
| popupRef | 获取popup的ref, 可能有些业务场景是想要获取popup节点的               | object |
| onOpen       | 控制显示状态                                                          | Function                 |
| onClose      | 控制隐藏状态, 可以传递一个time来覆盖hideAfterTime，为0时立马关闭弹窗 | Function `(time) => void` |
| updatePopup | 使用更新位置                                  | Function |
