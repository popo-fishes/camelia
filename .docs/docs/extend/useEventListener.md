---
order: 2
title: useEventListener
group:
  title: Dom
  order: 3
---

# useEventListener

轻松使用 EventListener。在已安装时使用 addEventListener 进行注册，并在未安装时自动删除 EventListener。

## 演示

点击按钮查看效果。

```jsx
import { useState, useRef } from "react";
import { Button } from "camelia";
import { useEventListener } from "camelia/shared";

export default () => {
  const [value, setValue] = useState(0);
  const ref = useRef(null);

  const [enable, setEnable] = useState(true);

  useEventListener(
    "click",
    () => {
      setValue(value + 1);
    },
    { target: ref, enable: enable }
  );

  return (
    <div style={{ display: "flex" }}>
      <Button ref={ref} type="primary" className="mr-4">
        click num {value}
      </Button>
      <Button type="primary" onClick={() => setEnable(false)} className="mr-4">
        关闭监听
      </Button>
      <Button type="primary" onClick={() => setEnable(true)}>
        开启监听
      </Button>
    </div>
  );
};
```

## API

### Params

| 参数      | 说明     | 类型                    | 默认值 |
| --------- | -------- | ----------------------- | ------ |
| eventName | 事件名称 | string                  | —      |
| fn        | 处理函数 | (...args: any[]) => any | —      |
| options   | 配置     | Options                 | —      |

### Options

| 参数    | 说明                                                                    | 类型                   | 默认值 |
| ------- | ----------------------------------------------------------------------- | ---------------------- | ------ |
| target  | ref                                                                     | React.MutableRefObject | window |
| capture | 指定事件是否在捕获或冒泡阶段执行。默认为 false。                        | boolean                | false  |
| once    | 指定监听器是否在触发一次后被自动移除。默认为 false。                    | boolean                | false  |
| passive | 当为 true 时，表示 listener 将不会调用 preventDefault()。默认为 false。 | boolean                | false  |
| enable  | 是否开启监听。                                                          | boolean                | true   |
