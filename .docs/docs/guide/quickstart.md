---
order: 2
---

# 快速开始

安装部分请移到上一节<a href="/guide" target="_blank">@Camelia</a>
:::info{title= warning}
在开始之前，推荐先学习 React，并正确安装和配置了 Node.js v16 或以上。官方指南假设你已了解关于 HTML、CSS 和 JavaScript 的中级知识，并且已经完全掌握了 React 全家桶的正确开发方式。如果你刚开始学习前端或者 React，将 UI 框架作为你的第一步可能不是最好的主意。
:::

## 使用组件

直接用下面的代码替换 index.js 的内容，使用 camelia 组件。

```jsx {5} | pure
// main.ts
import React, { useState } from "react";
import { render } from "react-dom";
import { Button } from "camelia";
// 这是全量引入样式
import "camelia/dist/index.css";

export default () => (
  <>
    <Button type="primary">Click Me</Button>
  </>
);
```

## 按需加载

Camelia 默认支持基于 ES modules 的 tree shaking，直接引入 import { Button } from 'camelia'; 就会有按需加载的效果。

## 样式按需

你可以使用[babel-plugin-import](https://github.com/umijs/babel-plugin-import)实现样式按需引入

## 自行构建

如果想自己维护工作流，我们推荐使用 [webpack](https://webpack.js.org) 或者 [vite](https://cn.vitejs.dev/) 进行构建和调试，可以使用 React 生态圈中的 [各种脚手架](https://github.com/enaqx/awesome-react#react-tools) 进行开发。
