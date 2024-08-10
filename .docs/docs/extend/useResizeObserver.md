---
order: 1
title: useResizeObserver
group:
  title: Dom
  order: 3
---

# useResizeObserver

报告元素内容或边框尺寸的更改

## 演示

调整框大小以查看更改

```jsx
import { useState, useRef } from "react";
import { Button } from "camllia";
// 这是文档别名路径, 你应该 from "camllia/shared";
import { useResizeObserver } from "camllia-shared";

export default () => {
  const [value, setValue] = useState(0);
  const ref = useRef();
  useResizeObserver(ref, (entries) => {
    const [entry] = entries;
    console.log(entry.contentRect);
    const { width, height } = entry.contentRect;
    setValue(`width: ${width}\nheight: ${height}`);
  });

  return (
    <>
      <textarea ref={ref} className="useResizeObserver-resizer" disabled value={value} />
    </>
  );
};
```

<style>
  .useResizeObserver-resizer {
    resize: both;
    width: 200px;
    height: 75px;
    border: 1px solid #e2e2e3;
    border-radius: 4px;
    background: #fff;
    outline: none;
    white-space: pre;
    overflow-wrap: normal;
    overflow: hidden;
  }
</style>
