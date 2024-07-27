---
title: useDebounceFn
---

# useDebounceFn

函数的执行去抖动。

```vue
<script setup>

import { useDebounceFn } from "fish-bubble-design/shared";

const debouncedFn = useDebounceFn(() => {
  // do something
}, 1000)

window.addEventListener('resize', debouncedFn)
```
