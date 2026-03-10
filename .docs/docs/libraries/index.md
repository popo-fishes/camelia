---
order: 1
title: Button 按钮
group:
  title: 基础组件
  order: 1
---

# Button 按钮 🚀

按钮用来触发一些操作。

## 基础用法

使用 `type`、`plain`、 和 `ghost` 来定义按钮的样式。

<code src="@/button/basic.tsx"></code>

## 禁用状态

按钮可以被禁用

```jsx
import React from "react";
import { Button } from "camelia";

export default () => (
  <>
    <div className="mb-4">
      <Button disabled>default</Button>
      <Button type="primary" disabled>
        Primary
      </Button>
      <Button type="success" disabled>
        Success
      </Button>
      <Button type="warning" disabled>
        Warning
      </Button>
      <Button type="danger" disabled>
        Danger
      </Button>
    </div>
    <div className="mb-4">
      <Button plain disabled>
        default
      </Button>
      <Button type="primary" disabled plain>
        Primary
      </Button>
      <Button type="success" disabled plain>
        Success
      </Button>
      <Button type="warning" disabled plain>
        Warning
      </Button>
      <Button type="danger" disabled plain>
        Danger
      </Button>
    </div>
  </>
);
```

## 加载状态按钮

点击按钮来加载数据，并向用户反馈加载状态。 通过设置 loading 属性为 true 来显示加载中状态。

```jsx
import React from "react";
import { Button } from "camelia";

export default () => (
  <>
    <Button type="primary" loading>
      Primary
    </Button>
    <Button type="success" loading>
      Success
    </Button>
    <Button type="warning" loading>
      Warning
    </Button>
    <Button type="danger" loading>
      Danger
    </Button>
  </>
);
```

## 尺寸

除了默认的大小, 可使用 large 和 small 两种值。

```jsx
import React from "react";
import { Button } from "camelia";

export default () => (
  <>
    <Button type="primary" size="large">
      Primary
    </Button>
    <Button type="success" loading>
      Success
    </Button>
    <Button type="warning" size="small">
      Warning
    </Button>
  </>
);
```

## API

### Button props

| 属性名    | 说明                                                                                                                                 | 类型                                   | 默认值  |
| --------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------- | ------- |
| type      | 类型                                                                                                                                 | `primary` `success` `warning` `danger` | —       |
| plain     | 是否为次要按钮                                                                                                                       | boolean                                | false   |
| ghost     | 幽灵属性，使按钮背景透明                                                                                                             | boolean                                | false   |
| size      | 按钮大小                                                                                                                             | `large` `default` `small`              | default |
| width     | 按钮的宽度                                                                                                                           | string / number                        | —       |
| disabled  | 按钮失效状态                                                                                                                         | boolean                                | false   |
| loading   | 设置按钮载入状态                                                                                                                     | boolean                                | false   |
| isWave    | 是否需要波浪动效                                                                                                                     | boolean                                | true    |
| icon      | 设置按钮的图标组件                                                                                                                   | ReactNode                              | -       |
| htmlType  | 设置 `button` 原生的 `type` 值，可选值请参考 [HTML 标准](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type) | string                                 | button  |
| className | 自定义样式名                                                                                                                         | string                                 | -       |
