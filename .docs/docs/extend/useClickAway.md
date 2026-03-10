---
order: 3
title: useClickAway
group:
  title: Dom
  order: 3
---

# useClickAway

监听元素外部的点击。对于 modal 或下拉菜单很有用。

## 演示

请点击按钮或按钮外查看效果。

```jsx
import { useState, useRef } from "react";
import { Button } from "camelia";
import { useClickAway } from "camelia/shared";

export default () => {
  const [value, setValue] = useState(0);
  const ref = useRef(null);
  useClickAway(() => {
    setValue(value + 1);
  }, ref);

  return (
    <>
      <Button ref={ref} type="primary" className="mr-4">
        点击按钮外面
      </Button>
      {value}
    </>
  );
};
```

## API

### Params

| 参数      | 说明                                           | 类型                   | 默认值 |
| --------- | ---------------------------------------------- | ---------------------- | ------ |
| fn        | 触发函数                                       | (event: T) => void     | —      |
| target    | ref                                            | React.MutableRefObject | —      |
| options   | 配置     | Options                 | —      |

### Options

| 参数    | 说明                                                                    | 类型                   | 默认值 |
| ------- | ----------------------------------------------------------------------- | ---------------------- | ------ |
| eventName | 需要监听的事件                                 | DocumentEventKey       | click  |
| enable  | 是否开启监听。                                                          | boolean                | true   |
