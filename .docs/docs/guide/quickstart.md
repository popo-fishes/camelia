---
order: 2
---

# 快速开始

安装部分请移到上一节`Camelia`
:::info{title= warning}
在开始之前，推荐先学习 React，并正确安装和配置了 Node.js v16 或以上。官方指南假设你已了解关于 HTML、CSS 和 JavaScript 的中级知识，并且已经完全掌握了 React 全家桶的正确开发方式。如果你刚开始学习前端或者 React，将 UI 框架作为你的第一步可能不是最好的主意。
:::

## 使用组件

直接用下面的代码替换 index.js 的内容，用 React 的方式直接使用 camelia 组件。

```jsx {5} | pure
// main.ts
import { Button } from "camelia";

export default () => (
  <>
    <Button type="primary">Click Me</Button>
  </>
);
```

## 按需加载

Camelia 默认支持基于 ES modules 的 tree shaking，直接引入 import { Button } from 'camelia'; 就会有按需加载的效果。

## 自行构建

如果想自己维护工作流，我们推荐使用 [webpack](https://webpack.js.org) 或者 [vite](https://cn.vitejs.dev/) 进行构建和调试，可以使用 React 生态圈中的 [各种脚手架](https://github.com/enaqx/awesome-react#react-tools) 进行开发。
