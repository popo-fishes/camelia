---
title: is判断
---

## is判断

我们内置了很多基础类型判断, 你可以如下使用：

```ts
import { isEmpty } from "fish-bubble-design/shared";
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

## type类型

```ts
import type { AnyFn } from "fish-bubble-design/shared";
const fn: AnyFn = (v) => {};
```

有如下：

```ts
import type { Ref } from "vue";

/**
 * Void function
 */
export type Fn = () => void;

/**
 * Any function
 */
export type AnyFn = (...args: any[]) => any;

/**
 * 也许是一个Ref，或者一个简单的值
 */
export type MaybeRef<T> = T | Ref<T>;

/**
 * 也许它是一个ref，一个普通值，或者一个getter函数
 */
export type MaybeRefOrGetter<T> = MaybeRef<T> | (() => T);
```
