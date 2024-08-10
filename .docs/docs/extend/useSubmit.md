---
order: 3
title: useSubmit
group:
  title: 基础
  order: 2
---

# useSubmit

防止重复提交

## 演示

```jsx
import { useState } from "react";
import { Button } from "camellia";
// 这是文档别名路径, 你应该 from "camellia/shared";
import { useSubmit } from "camellia-shared";

export default () => {
  /** 提交数据 */
  const { submit: loginSubmit, isSubmitting } = useSubmit(() => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 2000);
    });
  });

  console.log(isSubmitting);

  return (
    <div>
      <Button type="primary" loading={isSubmitting} width="200px" onClick={loginSubmit}>
        登录/注册
      </Button>
    </div>
  );
};
```
