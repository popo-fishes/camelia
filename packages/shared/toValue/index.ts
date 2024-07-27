/*
 * @Date: 2023-12-20 12:25:42
 * @Description: Modify here please
 */
import { unref } from "vue";
import type { AnyFn, MaybeRefOrGetter } from "../utils";

/**
 * 获取value/ref/getter的值。
 */
export function toValue<T>(r: MaybeRefOrGetter<T>): T {
  return typeof r === "function" ? (r as AnyFn)() : unref(r);
}
