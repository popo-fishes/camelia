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
