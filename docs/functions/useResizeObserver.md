---
title: useResizeObserver
---

# useResizeObserver

报告元素内容或边框尺寸的更改

## 演示

<style>
  .useResizeObserver-page-box .resizer {
    resize: both;
    padding: 1rem;
    width: 200px;
    height: 200px;
    border: 1px solid #e2e2e3;
    border-radius: 4px;
    background: #fff;
    outline: none;
    white-space: pre;
    overflow-wrap: normal;
    overflow: hidden;
  }
</style>

<script setup lang="ts">
import { ref } from 'vue'
import { useResizeObserver } from "fish-bubble-design/shared";

const el = ref(null)

const text = ref('')

useResizeObserver(el, (entries) => {
  const [entry] = entries
  const { width, height } = entry.contentRect
  text.value = `width: ${width}\nheight: ${height}`
})
</script>

<div>
   <p class="mb-2">
    调整框大小以查看更改
  </p>
  <textarea ref="el" class="resizer" disabled v-text="text" />
</div>

## 用法

```vue
<script setup lang="ts">
import { ref } from "vue";
import { useResizeObserver } from "fish-bubble-design/shared";

const el = ref(null);

const text = ref("");

useResizeObserver(el, (entries) => {
  const [entry] = entries;
  const { width, height } = entry.contentRect;
  text.value = `width: ${width}\nheight: ${height}`;
});
</script>

<template>
  <div>
    <p class="mb-2">调整框大小以查看更改</p>
    <textarea ref="el" class="resizer" disabled v-text="text" />
  </div>
</template>
```
