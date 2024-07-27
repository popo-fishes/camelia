---
title: useEventListener
---

# useEventListener

轻松使用EventListener。在已安装时使用addEventListener进行注册，并在未安装时自动删除EventListener。

```vue
<script setup lang="ts">
import { useEventListener } from "fish-bubble-design/shared";

const element = ref<HTMLDivElement>();
useEventListener(element, "click", (e) => {
  console.log(e.key);
});
</script>
<template>
  <div ref="element">点我</div>
</template>
```

您还可以调用返回来注销监听器。

```ts
import { useEventListener } from "fish-bubble-design/shared";

const cleanup = useEventListener(document, "click", (e) => {
  console.log(e.key);
});

cleanup(); // 这将注销侦听器.
```
