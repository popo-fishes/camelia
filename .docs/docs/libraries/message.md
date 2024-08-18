---
order: 1
group:
  title: 反馈
  order: 4
---

# Message 消息提示

全局展示操作反馈信息

## 基础用法

用来显示「成功、警告、消息、错误」类的操作反馈。

```jsx
import React from "react";
import { message, Button } from "camelia";

export default () => {
  const open1 = () => {
    message.info("this is a message.");
  };
  const open2 = () => {
    message.success("This is a success message");
  };
  const open3 = () => {
    message.warning("This is a warning message");
  };
  const open4 = () => {
    message.error("this is a error message.");
  };

  return (
    <div>
      <Button plain onClick={open1}>
        message
      </Button>
      <Button plain onClick={open2}>
        success
      </Button>
      <Button plain onClick={open3}>
        warning
      </Button>
      <Button plain onClick={open4}>
        error
      </Button>
    </div>
  );
};
```

## 可关闭提示

:::info{title= TIP}
Message 拥有可控的 duration， 默认的关闭时间为 3000 毫秒，当把这个属性的值设置为 0 便表示该消息不会被自动关闭。
:::

可以添加关闭按钮。

```jsx
import React from "react";
import { message, Button } from "camelia";

export default () => {
  const open2 = () => {
    message.success({
      showClose: true,
      message: "This is a success message",
      duration: 0
    });
  };

  return (
    <div>
      <Button plain onClick={open2}>
        success
      </Button>
    </div>
  );
};
```

## HTML 片段内容

将 isHtml 属性设置为 true,message 就会被当作 HTML 片段处理。

```jsx
import React from "react";
import { message, Button } from "camelia";

export default () => {
  const open2 = () => {
    message.success({
      isHtml: true,
      message: "<span style='color: red'>This is a success message</span>"
    });
  };

  return (
    <div>
      <Button plain onClick={open2}>
        success
      </Button>
    </div>
  );
};
```

## API

### Message props

| 属性名    | 说明                                         | 类型                               | 默认值 |
| --------- | -------------------------------------------- | ---------------------------------- | ------ |
| type      | 消息类型                                     | `info` `success` `warning` `error` | —      |
| message   | 消息文本                                     | string                             | —      |
| duration  | 显示时间，单位为毫秒。 设为 0 则不会自动关闭 | number                             | 3000   |
| isHtml    | 是否将 message 属性作为 HTML 片段处理        | boolean                            | false  |
| showClose | 是否显示关闭按钮                             | boolean                            | false  |
| icon      | 自定义图标组件                               | ReactNode                          | —      |
| offset    | 距离窗口顶部的偏移量                         | number                             | 20     |

### Message methods

| 名称     | 说明         | 类型                      |
| -------- | ------------ | ------------------------- |
| closeAll | 关闭所有消息 | Function (e: any) => void |
