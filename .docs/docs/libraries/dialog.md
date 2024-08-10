---
order: 2
group:
  title: 反馈
  order: 4
---

<style>
  .dialog-footer {
    display: flex;
    justify-content: flex-end;
 }
</style>

# Dialog 对话框

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 Dialog 在当前页面正中打开一个浮层，承载相应的操作。

## 基础用法

Dialog 弹出一个对话框

```jsx
import React, { useState } from "react";
import { Dialog, Button } from "camellia";

export default () => {
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button plain onClick={showModal}>
        Open Dialog
      </Button>
      <Dialog
        open={visible}
        title="Tips"
        width="500"
        onClose={handleCancel}
        footer={
          <>
            <div className="dialog-footer">
              <Button plain onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="primary" onClick={handleOk}>
                Confirm
              </Button>
            </div>
          </>
        }
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Dialog>
    </>
  );
};
```

## 居中对话框

设置 alignCenter 为 true 使对话框水平垂直居中。

从屏幕中心打开对话框。

```jsx
import React, { useState } from "react";
import { Dialog, Button } from "camellia";

export default () => {
  const [visible, setVisible] = useState(false);
  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button plain onClick={showModal}>
        Open Dialog
      </Button>
      <Dialog
        open={visible}
        title="Tips"
        width="500"
        alignCenter
        onClose={handleCancel}
        footer={
          <>
            <div className="dialog-footer">
              <Button plain onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="primary" onClick={handleOk}>
                Confirm
              </Button>
            </div>
          </>
        }
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Dialog>
    </>
  );
};
```

## API

### Dialog props

| 属性名           | 说明                                                                                           | 类型              | 默认值        |
| ---------------- | ---------------------------------------------------------------------------------------------- | ----------------- | ------------- |
| open             | 对话框是否可见                                                                                 | boolean           | false         |
| width            | 对话框的宽度                                                                                   | string / number   | 50%           |
| top              | Dialog CSS 中的 margin-top 值，默认为 15vh                                                     | string            | —             |
| alignCenter      | 是否水平垂直对齐对话框                                                                         | boolean           | false         |
| mask             | 是否需要遮罩层                                                                                 | boolean           | true          |
| closeOnClickMask | 点击蒙层是否可以关闭                                                                           | boolean           | false         |
| showClose        | 是否显示关闭按钮                                                                               | boolean           | true          |
| title            | 弹窗标题                                                                                       | string            | —             |
| zIndex           | 和原生的 CSS 的 z-index 相同，改变 z 轴的顺序                                                  | number            | —             |
| overlayClass     | 遮罩的自定义类名                                                                               | string            | —             |
| lockScroll       | 否在 Dialog 出现时将 body 滚动锁定                                                             | boolean           | true          |
| destroyOnClose   | 关闭时销毁 Dialog 里的子元素                                                                   | boolean           | false         |
| className        | 弹窗 body 内容部分，语义化结构 className                                                       | string            | —             |
| header           | 头部内容                                                                                       | ReactNode         | —             |
| footer           | 底部内容                                                                                       | ReactNode         | —             |
| getContainer     | 指定 Dialog 挂载的节点, 需要始终返回唯一 dom 节点                                              | () => HTMLElement | document.body |
| beforeClose      | 关闭前的回调，会暂停 Dialog 的关闭. 回调函数内执行 done 参数方法的时候才是真正关闭对话框的时候 | Function          | —             |
| onClose          | 点击遮罩层或右上角叉或取消按钮的回调                                                           | function(e)       | —             |
| afterClose       | Dialog 完全关闭后的回调                                                                        | Function          | —             |
