---
order: 4
title: event-emmiter
group:
  title: 工具集
  order: 1
---

# 发布-订阅 (on, emit, off)

需要处理事件的订阅与发布，以实现组件之间的解耦和通信

```ts
import { eventEmmiter } from "fish-remix/shared";
const eventEmmiter = new eventEmmiter();

eventEmmiter.once("notice", () => {
  console.log("只订阅一次");
});

const publish = (a, b) => {
  const sum = a + b;
  console.log(a, b + "两数之和为" + sum);
};

// 订阅
eventEmmiter.on("notice", publish);

// 发布
eventEmmiter.emit("notice", 4, 5);

// 卸载
eventEmmiter.off("notice", 4, 5);
```
