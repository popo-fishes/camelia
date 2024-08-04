---
order: 2
title: String
group:
  title: 工具集
  order: 2
---

## 字符串操作

```ts
import { trim, trimL, trimR } from "fish-remix/shared";
// 清除两边所有的空格
const str = trim(" -trimtrim- ");
// 清除左边所有的空格
const str2 = trimL(" -trimtrim- ");
// 清除右边所有的空格
const str3 = trimR(" -trimtrim- ");
console.log(str);
console.log(str2);
console.log(str3);
```
