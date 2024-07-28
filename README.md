<!--
 * @Date: 2023-12-30 11:43:31
 * @Description: Modify here please
-->
<p align="center">
  <img width="300px" height="250px" src="https://cdn.yupaowang.com/yupao_pc/images/pl/fb-logo-max.png">
</p>

<h1>Fish Remix</h1>

<p align="center">
  <a href="https://www.npmjs.org/package/fish-remix">
    <img src="https://img.shields.io/npm/v/fish-bubble-design.svg" />
  </a>
  <a href="https://github.com/u-fish-bubble/fish-remix">
    <img src="https://img.shields.io/badge/node-%20%3E%3D%2018-47c219" />
  </a>
  <a href="https://npmcharts.com/compare/fish-remix?minimal=true">
    <img src="https://img.shields.io/npm/dm/umy-ui.svg" />
  </a>
  <br>
</p>

<p align="center">fish-remix - 一个 React 组件库</p>

## 支持环境

- 支持现代浏览器.

- 支持服务端渲染.

- 支持Electron桌面应用.

## 兼容性

fish-bubble-design 使用了Vue3.4.x版本， 由于 Vue 3 不再支持 IE11，fish-bubble-design 也不再支持 IE 浏览器。

| ![Chrome](https://cdn.jsdelivr.net/npm/@browser-logos/chrome/chrome_32x32.png) Chrome | ![IE](https://cdn.jsdelivr.net/npm/@browser-logos/edge/edge_32x32.png) Edge | ![Firefox](https://cdn.jsdelivr.net/npm/@browser-logos/firefox/firefox_32x32.png) Firefox | ![Safari](https://cdn.jsdelivr.net/npm/@browser-logos/safari/safari_32x32.png) Safari |
| ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| Chrome ≥ 85                                                                           | Edge ≥ 85                                                                   | Firefox ≥ 79                                                                              | Safari ≥ 14.1                                                                         |

## Install

```bash
npm install fish-remix
```

```bash
yarn add fish-remix
```

```bash
pnpm add fish-remix
```

## 🔨 Usage

```tsx
import { Button, DatePicker } from "antd";

export default () => (
  <>
    <Button type="primary">PRESS ME</Button>
    <DatePicker placeholder="select date" />
  </>
);
```
