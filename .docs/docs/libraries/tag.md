---
order: 2
group:
  title: 数据展示
  order: 2
---

<style>
.bslink {
  text-decoration: none !important;
  color: inherit !important;
}
.customTagColor {
  --fb-tag-text-color: #531dab !important;
  --fb-tag-bg-color: #f9f0ff !important;
  --fb-tag-border-color: #d3adf7 !important;
}

.customTagColor2 {
  color: #08979c !important;
  background-color: #e6fffb !important;
  border-color: #87e8de !important;
}
</style>

# Tag 标签

进行标记和分类的小标签。

## 基础用法

由 type 属性来选择 tag 的类型。同时使用 size 属性来设置额外尺寸, 可选值包括 large, default 或 small.

```jsx
import React from "react";
import { Tag } from "fish-remix";

export default () => {
  return (
    <>
      <div className="mb-4">
        <Tag className="mr-4">
          <a className="bslink" href="https://www.baidu.com" target="_blank">
            我是链接
          </a>
        </Tag>
        <Tag className="mr-4" type="success">
          我是标签
        </Tag>
        <Tag className="mr-4" type="info">
          我是标签
        </Tag>
        <Tag className="mr-4" type="warning">
          我是标签
        </Tag>
        <Tag className="mr-4" type="danger">
          我是标签
        </Tag>
      </div>

      <div className="mb-4">
        <Tag className="mr-4" size="large">
          large
        </Tag>
        <Tag className="mr-4">default</Tag>
        <Tag className="mr-4" size="small">
          small
        </Tag>
      </div>
    </>
  );
};
```

## 可删除标签

设置 closable 属性可以定义一个标签是否可移除。 它接受一个 Boolean，当 Tag 被移除时会触发 close 事件。

```jsx
import React, { useState } from "react";
import { Tag } from "fish-remix";

export default () => {
  const [tags, setTags] = useState([
    { name: "Tag 1", type: "" },
    { name: "Tag 2", type: "success" },
    { name: "Tag 3", type: "info" },
    { name: "Tag 4", type: "warning" },
    { name: "Tag 5", type: "danger" }
  ]);

  const handleClose = (tag) => {
    const data = JSON.parse(JSON.stringify(tags));
    data.splice(data.indexOf(tag), 1);
    setTags(data);
  };

  return (
    <>
      {tags.map((item, index) => (
        <Tag key={index} type={item.type} className="mr-4" onClose={() => handleClose(item)} closable>
          {item.name}
        </Tag>
      ))}
    </>
  );
};
```

## 风格

Tag 组件提供了三个不同的风格：dark、light 和 plain

```jsx
import React, { useState } from "react";
import { Tag } from "fish-remix";

export default () => {
  return (
    <div>
      <p>dark</p>
      <div className="mb-4">
        <Tag className="mr-4" effect="dark">
          Tag 1
        </Tag>
        <Tag className="mr-4" effect="dark" type="success">
          Tag 1
        </Tag>
        <Tag className="mr-4" effect="dark" type="info">
          Tag 1
        </Tag>
        <Tag className="mr-4" effect="dark" type="warning">
          Tag 1
        </Tag>
        <Tag className="mr-4" effect="dark" type="danger">
          Tag 1
        </Tag>
      </div>
      <p>light</p>
      <div className="mb-4">
        <Tag className="mr-4" effect="light">
          Tag 1
        </Tag>
        <Tag className="mr-4" effect="light" type="success">
          Tag 1
        </Tag>
        <Tag className="mr-4" effect="light" type="info">
          Tag 1
        </Tag>
        <Tag className="mr-4" effect="light" type="warning">
          Tag 1
        </Tag>
        <Tag className="mr-4" effect="light" type="danger">
          Tag 1
        </Tag>
      </div>
      <p>plain</p>
      <div className="mb-4">
        <Tag className="mr-4" effect="plain">
          Tag 1
        </Tag>
        <Tag className="mr-4" effect="plain" type="success">
          Tag 1
        </Tag>
        <Tag className="mr-4" effect="plain" type="info">
          Tag 1
        </Tag>
        <Tag className="mr-4" effect="plain" type="warning">
          Tag 1
        </Tag>
        <Tag className="mr-4" effect="plain" type="danger">
          Tag 1
        </Tag>
      </div>
      <p>round</p>
      <div className="mb-4">
        <Tag className="mr-4" effect="dark" round>
          Tag 1
        </Tag>
        <Tag className="mr-4" effect="plain" round>
          Tag 1
        </Tag>
        <Tag className="mr-4" effect="light" round>
          Tag 1
        </Tag>
      </div>
    </div>
  );
};
```

## 带图标的

当需要在 Tag 内嵌入 Icon 时，可以设置 icon 属性。 同时你还可以设置 color 来自定义背景色

```jsx
import React, { useState } from "react";
import { Tag } from "fish-remix";
// 这是因为dumi文档找不到module
import { PaperAirplane, CameraFilled } from "fish-icons/dist/index.mjs";
// 你应该这样写
// import { PaperAirplane } from "fish-icons";

export default () => {
  return (
    <div style={{ display: "flex" }} className="mb-4">
      <Tag color="#55acee" className="mr-4" icon={<PaperAirplane />}>
        <span style={{ marginLeft: "8px" }}>Twitter</span>
      </Tag>
      <Tag color="#3b5999" className="mr-4" icon={<CameraFilled />}>
        <span style={{ marginLeft: "8px" }}>Facebook</span>
      </Tag>
      <Tag className="mr-4 customTagColor">customTagColor</Tag>
      <Tag className="mr-4 customTagColor2">customTagColor</Tag>
    </div>
  );
};

/* <style>
  .customTagColor {
  --fb-tag-text-color: #531dab !important;
  --fb-tag-bg-color: #f9f0ff !important;
  --fb-tag-border-color: #d3adf7 !important;
}

.customTagColor2 {
  color: #08979c !important;
  background-color: #e6fffb !important;
  border-color: #87e8de !important;
}
</style> */
```

## API

### Tag props

| 属性名    | 说明                     | 类型                                | 默认值  |
| --------- | ------------------------ | ----------------------------------- | ------- |
| type      | Tag 的类型               | `success` `warning` `danger` `info` | —       |
| closable  | 是否可关闭               | boolean                             | false   |
| color     | 自定义背景色             | string                              | —       |
| size      | Tag 的尺寸               | `large` `default` `small`           | default |
| effect    | Tag 的风格               | `dark` `light` `plain`              | light   |
| round     | Tag 是否为圆形           | boolean                             | false   |
| className | 语义化结构 class         | string                              | —       |
| icon      | 自定义带有前缀图标的节点 | React.ReactNode                     | —       |
| onClose   | 关闭时的回调             | (event: MouseEvent) => void         | —       |
| onClick   | 点击时的回调             | (event: MouseEvent) => void         | —       |
