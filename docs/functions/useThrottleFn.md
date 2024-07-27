---
title: useThrottleFn
---

# useThrottleFn

限制函数的执行。对于调整大小和滚动等事件的处理程序执行速率限制特别有用

## 演示

<script setup>
import { ref } from 'vue'
import { useThrottleFn } from "fish-bubble-design/shared";

const updated = ref(0)
const clicked = ref(0)
const throttledFn = useThrottleFn(() => {
  updated.value += 1
}, 1000)

function clickedFn() {
  clicked.value += 1
  throttledFn()
}
</script>

<div>
  <p> <fb-button type="primary" plain @click="clickedFn">点击我</fb-button></p>
  <span>此演示的延迟设置为 1000 毫秒。</span>
  <p>点击按钮: {{ clicked }}</p>
  <p>调用的事件处理程序: {{ updated }}</p>
</div>

## 用法

```vue
<script setup>
import { ref } from "vue";
import { useThrottleFn } from "fish-bubble-design/shared";

const updated = ref(0);
const clicked = ref(0);
const throttledFn = useThrottleFn(() => {
  updated.value += 1;
}, 1000);

function clickedFn() {
  clicked.value += 1;
  throttledFn();
}
</script>
<template>
  <div>
    <p><fb-button type="primary" plain @click="clickedFn">点击我</fb-button></p>
    <span>此演示的延迟设置为 1000 毫秒。</span>
    <p>点击按钮: {{ clicked }}</p>
    <p>调用的事件处理程序: {{ updated }}</p>
  </div>
</template>
```
