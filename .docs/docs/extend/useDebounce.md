---
order: 2
title: useDebounce
group:
  title: 基础
  order: 2
---

# useDebounce 防抖

函数的执行去抖动。

## 演示

频繁调用 run，但只会在所有点击完成 500ms 后执行一次相关函数

```jsx
import { useState } from "react";
import { Button } from "camllia";
// 这是文档别名路径, 你应该 from "camllia/shared";
import { useDebounce } from "camllia-shared";

export default () => {
  const [value, setValue] = useState(0);
  const { run } = useDebounce(
    () => {
      setValue(value + 1);
    },
    {
      wait: 500
    }
  );

  return (
    <div>
      <p style={{ marginTop: 16 }}> Clicked count: {value} </p>
      <Button type="primary" onClick={run}>
        点击我
      </Button>
    </div>
  );
};
```

## API

### Params

| 参数    | 说明           | 类型                    | 默认值 |
| ------- | -------------- | ----------------------- | ------ |
| fn      | 需要执行的函数 | (...args: any[]) => any | —      |
| options | 配置防抖       | Options                 | —      |

### Options

| 参数    | 说明                     | 类型    | 默认值 |
| ------- | ------------------------ | ------- | ------ |
| wait    | 等待时间，单位为毫秒     | number  | 1000   |
| leading | 是否在延迟开始前调用函数 | boolean | false  |

### Return

| 参数   | 说明                               | 类型     | 默认值 |
| ------ | ---------------------------------- | -------- | ------ |
| run    | 触发执行 fn，函数参数将会传递给 fn | Function | —      |
| cancel | 取消当前防抖                       | Function | —      |
