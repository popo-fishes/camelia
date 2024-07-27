---
title: Image
lang: cn-ZH
---

# Image 图片

可预览的图片。

## 基础用法

:::demo 图片加载失败时，会有默认布局！

image/basic

:::

## 懒加载

:::demo 可通过lazy开启懒加载功能， 当图片滚动到可视范围内才会加载。滚动容器为最近一个 overflow 值为 auto 或 scroll 的父元素。

image/lazy

:::

## 图片预览

:::demo preview开启预览，为 false 时禁用

image/preview

:::

## 相册模式(todo)

:::demo 从一张图片点开相册。

image/preview

:::

## API

### Image props

| 属性名  | 说明                                                                                  | 类型                  | 默认值 |
| ------- | ------------------------------------------------------------------------------------- | --------------------- | ------ |
| src     | 图片源地址，同原生属性一致                                                            | ^[string]             | —      |
| alt     | 原生属性 alt                                                                          | ^[string]             | —      |
| linkUrl | a链接地址(传递就代表是链接图片)                                                       | ^[string]             | —      |
| width   | 图片宽度                                                                              | ^[string] / ^[number] | —      |
| height  | 图片高度                                                                              | ^[string] / ^[number] | —      |
| lazy    | 是否需要懒加载功能， 如果开启了这个，我们建议传递一个宽度，高度进来。因为占位节点需要 | ^[boolean]            | false  |
| preview | 是否可以预览                                                                          | ^[boolean]            | false  |
| fit     | 同原生 object-fit                                                                     | ^[string]             | —      |

### Image Events

| 属性名 | 说明             | 类型                           |
| ------ | ---------------- | ------------------------------ |
| load   | 图片加载成功触发 | ^[Function] `(e: any) => void` |
| error  | 图片加载失败触发 | ^[Function] `(e: any) => void` |

### Slots

| 插槽名      | 说明                                 |
| ----------- | ------------------------------------ |
| placeholder | 当图像尚未加载时，自定义的占位符内容 |
| error       | 自定义图像加载失败的内容             |
