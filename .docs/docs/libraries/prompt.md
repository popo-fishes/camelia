---
order: 3
group:
  title: 反馈
  order: 4
---

# Prompt 消息确认框

模拟系统的消息提示框而实现的一套模态对话框组件，用于消息提示、确认消息和提交内容。

## 基础用法

<p>当用户进行操作时会被触发，该对话框中断用户操作，直到用户确认知晓后才可关闭</p>
<p>调用prompt方法，会返回一个close可主动关闭弹窗</p>
<p>你还可以传入HTML字符串，里面可以片段处理</p>

:::info{title= TIP}
关于 onCancel 事件参数描述<br/>
点击遮罩层或右上角叉或取消按钮的回调: type 的值描述

1.  notBtn 非按钮关闭，如点击了右上角图标，点击了蒙层
2.  cancel: 点击了取消按钮

:::

```jsx
import React from "react";
import { prompt, Button } from "camelia";

export default () => {
  const open2 = () => {
    const { close } = prompt({
      title: "温馨提示",
      content: `Are you sure delete this task?`,
      okText: "确定",
      cancelText: "取消",
      onOk() {},
      onCancel(e) {
        console.log(e);
      }
    });
  };

  return (
    <div>
      <Button plain onClick={open2}>
        Open Prompt
      </Button>
    </div>
  );
};
```

## 自定义内容

<p>你可以使用插槽实现自定义提示框内容，做到提交内容的需求</p>

```jsx
import React, { useState } from "react";
import { Prompt, Button } from "camelia";

export default () => {
  const [visible, setVisible] = useState(false);

  return (
    <div>
      <Button plain onClick={() => setVisible(true)}>
        Custom Prompt
      </Button>

      <Prompt
        open={visible}
        onCancel={() => setVisible(false)}
        footer={
          <div className="cc-footer">
            <Button plain onClick={() => setVisible(false)}>
              关闭
            </Button>
            <Button type="primary" onClick={() => setVisible(false)}>
              知道了
            </Button>
          </div>
        }
      >
        <div>
          <p>我是一个输入框</p>
          <input />
        </div>
      </Prompt>
    </div>
  );
};
```

## API

### Prompt props

| 属性名     | 说明                      | 类型            | 默认值 |
| ---------- | ------------------------- | --------------- | ------ |
| open       | 对话框是否可见            | boolean         | false  |
| width      | 对话框的宽度              | string / number | 440px  |
| showClose  | 是否显示关闭按钮          | boolean         | true   |
| title      | 标题                      | string          | —      |
| showIcon   | 是否显示 标题的 icon 图标 | boolean         | true   |
| okText     | 确认按钮的文字            | string          | 确认   |
| cancelText | 取消按钮的文字            | string          | 取消   |
| content    | 内容                      | string          | —      |
| icon       | 自定义 Icon 图标          | ReactNode       | —      |
| footer     | 自定义底部                | ReactNode       | —      |
| onCancel   | 点击了取消按钮            | (e) => void     | —      |
| onOk       | 点击了确定按钮            | () => void      | —      |
