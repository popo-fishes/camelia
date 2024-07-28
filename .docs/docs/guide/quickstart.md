# 快速开始

安装部分请移到上一节`Fish Bubble`
::: warning
在开始之前，推荐先学习 Vue3.x 和 ES2015，并正确安装和配置了 Node.js v18.x 或以上。官方指南假设你已了解关于 HTML、CSS 和 JavaScript 的中级知识，并且已经完全掌握了 Vue 的正确开发方式。如果你刚开始学习前端或者 Vue，将 UI 框架作为你的第一步可能不是最好的主意。
:::

## 全局完整注册

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便

```typescript
// main.ts
import { createApp } from 'vue';
import FishBubbleDesign from 'fish-bubble-design';
import 'fish-bubble-design/dist/index.css';
import App from './App.vue';

const app = createApp(App);

app.use(FishBubbleDesign);
app.mount('#app');
```

## 局部注册组件

此种方式需要分别注册组件子组件，如 Button，并且注册后仅在当前组件中有效。所以我们推荐使用上述两种方式。

```vue
<template>
  <fb-button>Add</fb-button>
</template>

<script setup lang="ts">
import { FbButton } from 'fish-bubble-design';
</script>
```

## 按需加载

`fish-bubble-design` 默认支持基于 ES modules 的 `tree shaking`，直接引入 import { FbButton } from 'fish-bubble-design'; 就会有按需加载的效果。

## 自动导入

首先你需要安装 unplugin-vue-components 和 unplugin-auto-import 这两款插件； 然后可以看下插件的教程，自己配置。

```shell
npm install -D unplugin-vue-components unplugin-auto-import
```

## Volar 支持

如果您使用 Volar，请在 tsconfig.json 中通过 compilerOptions.type 指定全局组件类型。

```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["fish-bubble-design/global"]
  }
}

// 或者
// ./typings/index.d.ts
/// <reference types="vite/client" />
/// <reference types="fish-bubble-design/global.d.ts" />

// tsconfig.json
{
  "compilerOptions": {
   {"typeRoots": ["./typings"]}
  }
}
```
