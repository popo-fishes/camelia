---
title: unrefElement
---

# unrefElement

从 Vue 引用或组件实例中检索底层 DOM 元素

```vue
<script setup>
import { onMounted, ref } from "vue";
import { unrefElement } from "fish-bubble-design/shared";

const div = ref(); // will be bound to the <div> element
const hello = ref(); // will be bound to the HelloWorld Component

onMounted(() => {
  console.log(unrefElement(div)); // the <div> element
  console.log(unrefElement(hello)); // the root element of the HelloWorld Component
});
</script>

<template>
  <div ref="div" />
  <HelloWorld ref="hello" />
</template>
```
