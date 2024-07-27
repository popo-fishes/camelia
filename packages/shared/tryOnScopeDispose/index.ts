/*
 * @Date: 2023-12-20 12:58:57
 * @Description: Modify here please
 */
import { getCurrentScope, onScopeDispose } from "vue";
import type { Fn } from "../utils";

/**
 * onScopeDispose和onUnmounted类似 但是它们有很大区别
 * 组件卸载时执行，还在响应式作用域停止时执行，然后做某些操作
 * @param fn
 */
export function tryOnScopeDispose(fn: Fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
