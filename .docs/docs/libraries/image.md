---
order: 1
group:
  title: 数据展示
  order: 3
---

<style>
  .previewimge {
    width: 200px;
    height: 200px;
    margin-bottom: 20px;
  }

  .image__lazy {
    height: 300px;
    overflow-y: auto;
  }
  .image__lazy .imge {
    width: 200px;
    height: 200px;
    margin-bottom: 20px;
 }
</style>

# Image 图片

可预览的图片。

## 基础用法

图片加载失败时，会有默认布局！

```jsx
import React from "react";
import { Image } from "fish-remix";

export default () => {
  return (
    <div style={{ display: "flex" }}>
      <Image src="/images/img1.jpg" width="200px" height="200px" styles={{ marginRight: "15px" }} />
      <Image src="" width="200px" height="200px" />
    </div>
  );
};
```

## 懒加载

可通过 lazy 开启懒加载功能， 当图片滚动到可视范围内才会加载。滚动容器为最近一个 overflow 值为 auto 或 scroll 的父元素。

```jsx
import React from "react";
import { Image } from "fish-remix";

export default () => {
  const urls = ["/images/img1.jpg", "/images/img2.webp", "/images/img3.webp", "/images/img4.webp"];
  return (
    <div className="image__lazy">
      {urls.map((item, index) => (
        <Image src={item} key={index} lazy className="imge" />
      ))}
    </div>
  );
};
```

## 图片预览

preview 开启预览，为 false 时禁用

```jsx
import React from "react";
import { Image } from "fish-remix";

export default () => {
  return (
    <div>
      <Image src="/images/img3.webp" className="previewimge" preview />
    </div>
  );
};
```

## 相册模式(todo)

demo 从一张图片点开相册。

## API

### Image props

| 属性名          | 说明                                 | 类型                     | 默认值 |
| --------------- | ------------------------------------ | ------------------------ | ------ |
| src             | 图片源地址，同原生属性一致           | string                   | —      |
| alt             | 原生属性 alt                         | string                   | —      |
| linkUrl         | a 链接地址(传递就代表是链接图片)     | string                   | —      |
| width           | 图片宽度                             | string / number          | —      |
| height          | 图片高度                             | string / number          | —      |
| lazy            | 是否需要懒加载功能                   | boolean                  | false  |
| preview         | 是否可以预览                         | boolean                  | false  |
| fit             | 同原生 object-fit                    | string                   | —      |
| className       | 语义化结构 class                     | string                   | —      |
| styles          | 语义化结构 style                     | React.CSSProperties      | —      |
| errorNode       | 加载失败时的自定义节点               | React.ReactNode          | —      |
| placeholderNode | 当图像尚未加载时，自定义的占位符内容 | React.ReactNode          | —      |
| onError         | 图标加载失败的回调                   | (event: Event) => void - | —      |
