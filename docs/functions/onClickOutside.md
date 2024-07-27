---
title: onClickOutside
---

# onClickOutside

监听元素外部的点击。对于modal或下拉菜单很有用。

```vue
<script setup>
import { ref } from "vue";
import { onClickOutside } from "fish-bubble-design/shared";

const target = ref(null);

onClickOutside(target, (event) => console.log(event));
</script>

<template>
  <div ref="target">Hello world</div>
  <div>Outside element</div>
</template>
```
