---
title: 暗黑模式
---

## 暗黑模式

暗黑模式是指把所有 `UI` 换成黑色或者深色的一个主题模式。

1. 暗黑模式下避免使用对比很强的色彩或内容，长时间使用会带来疲劳感
2. 我们提取并整理了所有的设计变量，并通过 CSS Vars 技术实现动态更新主题。

### 如何开启？

首先你可以创建一个开关来控制 暗黑模式 的 class 类名。

> 如果您只需要暗色模式，只需在 html 上添加一个名为 dark 的类 。

```html
<html class="dark">
  <body>
    <div>暗黑模式</div>
  </body>
</html>
```

只需要如下在项目入口文件修改一行代码：

```ts
// main.ts
// 如果只想导入css变量
import "fish-bubble-design/dist/dark-vars.css";
```
