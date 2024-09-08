---
order: 4
group:
  title: 数据展示
  order: 3
---

# Popover 气泡卡片

Popover 是在 Tooltip 基础上开发出来的。 因此对于重复属性，请参考 Tooltip 的文档，在此文档中不做详尽解释。

## 基础用法
1. trigger 属性被用来决定 popover 的触发方式，支持的触发方式： `hover` `click` 如果你想手动控制它，可以设置 visible 属性。
2. 最简单的用法，浮层的大小由内容区域决定。

```tsx
import React from 'react';
import { Button, Popover } from 'camelia';

const content = (
  <div className="layout-init-box">
    <p>There is a lot of content</p>
    <p>There is a lot of content</p>
  </div>
);

const App: React.FC = () => (
  <>
    <Popover content={content} title="Title">
      <Button plain className="mr-4">Hover</Button>
    </Popover>
    <Popover content={content} title="Title" trigger="click">
      <Button plain >click</Button>
    </Popover>
  </>
);

export default App;
```

## 虚拟触发

1. 可以由虚拟元素触发，这个功能就很适合使用在触发元素和展示内容元素是分开的场景
2. 结合visible，你可以做的主动控制Popover

```tsx
import React, { useState, useRef } from 'react';
import { Button, Popover } from 'camelia';
import { useClickAway } from "camelia/shared";

const content = (
  <div className="layout-init-box">
    <p>There is a lot of content</p>
    <p>There is a lot of content</p>
  </div>
);

const App: React.FC = () => {
  const [clicked, setClicked] = useState(false);
  const [enable, setEnable] = useState(false);

  const virtualRef = useRef(null)
  const popoverRef = useRef(null)

  // 点击弹窗外面主动取消
  useClickAway(() => {
    setClicked(false)
  }, popoverRef.current?.popupRef, {
    enable
  });

  return(
    <>
      <Button plain ref={virtualRef} onClick={() => setClicked(!clicked)}>Click me</Button>
      <Popover
        title="Title"
        content={content}
        ref={popoverRef}
        virtualRef={virtualRef}
        virtualTriggering
        visible={clicked}
        onOpenChange={(v) =>{
          setEnable(v)
        }}
      />
    </>
  )
}

export default App;
```

## API

| 参数    | 说明     | 类型                         | 默认值 | 版本 |
| ------- | -------- | ---------------------------- | ------ | ---- |
| content | 卡片内容 | ReactNode \| () => ReactNode | -      |      |
| title   | 卡片标题 | ReactNode \| () => ReactNode | -      |      |

更多属性请参考 [Tooltip](http://cameliya.cn/libraries/tooltip#api)。

## 注意

请确保 `Popover` 的子元素能接受 `onMouseEnter` `onMouseLeave` `onClick` 事件。
