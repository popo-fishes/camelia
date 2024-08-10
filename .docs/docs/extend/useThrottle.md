---
order: 1
title: useThrottle
group:
  title: 基础
  order: 2
---

# useThrottle 节流

限制函数的执行。对于调整大小和滚动等事件的处理程序执行速率限制特别有用

## 演示

```jsx
import { useState } from "react";
import { Button } from "camelia";
import { useThrottle } from "camelia/shared";

export default () => {
  const [updated, setUpdated] = useState(0);
  const [clicked, setClicked] = useState(0);
  const { run } = useThrottle(
    () => {
      const num = updated + 1;
      setUpdated(num);
    },
    { wait: 1000 }
  );

  function clickedFn() {
    const num = clicked + 1;
    setClicked(num);
    run();
  }

  return (
    <div>
      <p>
        <Button type="primary" onClick={clickedFn}>
          点击我
        </Button>
      </p>
      <span>此演示的延迟设置为 1000 毫秒。</span>
      <p>点击按钮: {clicked}</p>
      <p>调用的事件处理程序: {updated}</p>
    </div>
  );
};
```

## API

### Params

| 参数    | 说明           | 类型                    | 默认值 |
| ------- | -------------- | ----------------------- | ------ |
| fn      | 需要执行的函数 | (...args: any[]) => any | —      |
| options | 配置节流       | Options                 | —      |

### Options

| 参数    | 说明                     | 类型    | 默认值 |
| ------- | ------------------------ | ------- | ------ |
| wait    | 等待时间，单位为毫秒     | number  | 1000   |
| leading | 是否在延迟开始前调用函数 | boolean | false  |

### Return

| 参数   | 说明                               | 类型     | 默认值 |
| ------ | ---------------------------------- | -------- | ------ |
| run    | 触发执行 fn，函数参数将会传递给 fn | Function | —      |
| cancel | 取消当前节流                       | Function | —      |
