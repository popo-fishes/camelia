---
order: 2
title: is or typed
group:
  title: 工具集
  order: 1
---

## is 判断

我们内置了很多基础类型判断, 你可以如下使用：

```ts
import { isEmpty } from "camelia/shared";
const tel = "";
if (isEmpty(tel)) {
  return "请输入手机号";
}
```

有如下：

```ts
export declare const isArray: (arg: any) => arg is any[];
export declare const isMap: (val: any) => boolean;
export declare const isSet: (val: any) => boolean;
export declare const isFunction: (val: any) => boolean;
export declare const isString: (val: any) => boolean;
export declare const isSymbol: (val: any) => boolean;
export declare const isObject: (val: any) => boolean;
export declare const isPromise: (val: any) => boolean;
export declare const isNil: (value: any) => value is null;
export declare const isUndefined: (val: any) => val is undefined;
export declare const isBoolean: (val: any) => val is boolean;
export declare const isNumber: (val: any) => val is number;
export declare const isEmpty: (val: unknown) => boolean;
export declare const isElement: (e: unknown) => e is Element;
export declare const isClient: boolean;
// 无活动
export declare const NOOP: () => void;
```

## type 类型

```ts
import type { AnyFn } from "camelia/shared";
const fn: AnyFn = (v) => {};
```

有如下：

```ts
/**
 * Void function
 */
export type Fn = () => void;

/**
 * Any function
 */
export type AnyFn = (...args: any[]) => any;

export type AnyObject = Record<PropertyKey, any>;
```
