---
title: useSubmitFn
---

# useSubmitFn

防止重复提交

## 演示

<script setup lang="ts">
import { ref } from 'vue'
import { useSubmitFn } from "fish-bubble-design/shared";

/** 提交数据 */
const { submit: loginSubmit, isSubmitting } = useSubmitFn((): Promise<{ success: boolean }> => {
   return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 2000);
  });
});

</script>

<div>
  <fb-button type="primary" :loading="isSubmitting" width="200px" @click="loginSubmit">登录/注册</fb-button>
</div>

## 用法

```vue
<script setup lang="ts">
import { useSubmitFn } from "fish-bubble-design/shared";

/** 提交数据 */
const { submit: loginSubmit, isSubmitting } = useSubmitFn((): Promise<{ success: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 2000);
  });
});
</script>

<template>
  <div>
    <fb-button type="primary" :loading="isSubmitting" width="200px" @click="loginSubmit"> 登录/注册 </fb-button>
  </div>
</template>
```

您还可以传递一个`duration`来控制结束后的持续时间。

```ts
/**
 * 防止重复提交---》弹窗， 延迟改变isSubmitting
 *
 * 为啥要加延迟，在发布表单的时候，常常会出现一个接口请求完毕 会出现弹窗判断！！
 * 此时如果请求接口返回了就去改变isSubmitting状态，会出现一个问题：
 * 弹窗正在弹出来中的时候（弹窗有动画时间），疯狂点击提交，也会导出重复提交，导致弹窗弹出来多个！
 */
const { _ } = useSubmitFn((): Promise<{ success: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true });
    }, 2000);
  });
}, 1000);
// 这样就是一个3秒的时间
```
