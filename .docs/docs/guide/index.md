---
title: Fish Remix
order: 1
---

# Fish Remix

致力于以精简的代码实现功能，追求代码的简洁性，提升用户体验。<br/>
开箱即用的高质量 React 组件。

## 对比 antd

1. 首先，antd 无疑是非常优秀的，表现极佳。只是因为它要满足诸多个性化的需求，所以它的包实际上是很庞大的。与此相反，Fish Remix 是很小巧的。
2. Fish Remix 致力于以精简的代码实现组件，如果您的项目喜欢体积小的包，或者说觉得 Fish Remix 适合您的项目，您不妨可以试用下。
3. 打个比方 我想使用的只是一个简单输入框组件，当你使用 Fish Remix 你只会得到一个简单的 Input, 而 antd 会有额外的个性化需求代码在里面。

<div>
  <p>这是antd的某个按钮大小</p>
  <img src="/images/ant.png" style="width: 500px; height: 300px"/>
</div>
<div>
  <p>这是Fish Remix的按钮大小</p>
  <img src="/images/fish.png" style="width: 500px; height: 300px"/>
</div>

## 支持环境

- 支持现代浏览器.

- 支持服务端渲染.

- 支持 Electron 桌面应用.

| ![Chrome](https://cdn.jsdelivr.net/npm/@browser-logos/chrome/chrome_32x32.png) Chrome | ![IE](https://cdn.jsdelivr.net/npm/@browser-logos/edge/edge_32x32.png) Edge | ![Firefox](https://cdn.jsdelivr.net/npm/@browser-logos/firefox/firefox_32x32.png) Firefox | ![Safari](https://cdn.jsdelivr.net/npm/@browser-logos/safari/safari_32x32.png) Safari | ![Electron](https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_32x32.png)Electron |
| ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Chrome ≥ 85                                                                           | Edge ≥ 85                                                                   | Firefox ≥ 79                                                                              | Safari ≥ 14.1                                                                         | last 2 versions                                                                                                   |

## 使用包管理器

**我们建议您使用包管理器 (npm, [yarn](https://classic.yarnpkg.com/lang/en/), [pnpm](https://pnpm.io/)) 安装 fish-remix**,
然后您就可以使用打包工具, 例如 [vite](https://vitejs.dev) 或者 [webpack](https://webpack.js.org/).

```shell
# NPM
$ npm fish-remix --save

# Yarn
$ yarn add fish-remix

# pnpm
$ pnpm i fish-remix
```

如果您的网络环境不好，建议使用相关镜像服务 [cnpm](https://github.com/cnpm/cnpm) 或 [alibaba](https://registry.npmmirror.com/) 镜像.

## 使用 CDN

直接通过浏览器的 HTML 标签导入 fish-remix，然后就可以使用全局变量 fish-remix。

根据不同的 CDN 提供商有不同的引入方式， 我们在这里以 unpkg 举例。 你也可以使用其它的 CDN 供应商

### unpkg

```html
<head>
  <!-- Import style -->
  <link rel="stylesheet" href="//unpkg.com/fish-remix/dist/index.css" />
  <!-- Import component library -->
  <script src="//unpkg.com/fish-remix"></script>
</head>
```

## 如何贡献

如果你希望参与贡献，欢迎 `Pull Request`，或给我们 报告 Bug
