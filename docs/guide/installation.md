---
title: 安装
---

<style>
  .installation-page-box .vp-doc th, .installation-page-box .vp-doc td {
     text-align: center;
  }
  .installation-page-box .vp-doc th img {
    margin: 0 auto;
  }
  .installation-page-box .vp-doc thead tr {
    border-bottom: 1px solid #dcdfe6;
  }
  .installation-page-box .vp-doc th {
    background-color: #fff
  }
</style>

# Fish Bubble Design

致力于以精简的代码实现功能，追求代码的简洁性和效率，提升用户体验。<br/>
开箱即用的高质量 Vue 组件。

## 支持环境

- 支持现代浏览器.

- 支持服务端渲染.

- 支持Electron桌面应用.

## 兼容性

fish-bubble-design 使用了Vue3.4.x版本， 由于 Vue 3 不再支持 IE11，fish-bubble-design 也不再支持 IE 浏览器。

| ![Chrome](https://cdn.jsdelivr.net/npm/@browser-logos/chrome/chrome_32x32.png) Chrome | ![IE](https://cdn.jsdelivr.net/npm/@browser-logos/edge/edge_32x32.png) Edge | ![Firefox](https://cdn.jsdelivr.net/npm/@browser-logos/firefox/firefox_32x32.png) Firefox | ![Safari](https://cdn.jsdelivr.net/npm/@browser-logos/safari/safari_32x32.png) Safari |
| ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Chrome ≥ 85                                                                           | Edge ≥ 85                                                                   | Firefox ≥ 79                                                                              | Safari ≥ 14.1                                                                         |

## 使用包管理器

**我们建议您使用包管理器 (npm, [yarn](https://classic.yarnpkg.com/lang/en/), [pnpm](https://pnpm.io/)) 安装 fish-bubble-design**,
然后您就可以使用打包工具, 例如 [vite](https://vitejs.dev) 或者 [webpack](https://webpack.js.org/).

```shell
# NPM
$ npm fish-bubble-design --save

# Yarn
$ yarn add fish-bubble-design

# pnpm
$ pnpm i fish-bubble-design
```

如果您的网络环境不好，建议使用相关镜像服务 [cnpm](https://github.com/cnpm/cnpm) 或 [alibaba](https://registry.npmmirror.com/) 镜像.

## 使用CDN

直接通过浏览器的 HTML 标签导入fish-bubble-design，然后就可以使用全局变量fish-bubble-design。

根据不同的 CDN 提供商有不同的引入方式， 我们在这里以 unpkg 举例。 你也可以使用其它的 CDN 供应商

### unpkg

```html
<head>
  <!-- Import style -->
  <link rel="stylesheet" href="//unpkg.com/fish-bubble-design/dist/index.css" />
  <!-- Import Vue 3 -->
  <script src="//unpkg.com/vue@3"></script>
  <!-- Import component library -->
  <script src="//unpkg.com/fish-bubble-design"></script>
</head>
```

## 如何贡献

如果你希望参与贡献，欢迎 `Pull Request`，或给我们 报告 Bug
