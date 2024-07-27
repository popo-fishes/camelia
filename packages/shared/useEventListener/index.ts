/*
 * @Date: 2023-12-02 15:16:40
 * @Description: 轻松使用事件监听器
 */
import { watch } from "vue";
import { unrefElement, MaybeElementRef } from "../unrefElement";
import { tryOnScopeDispose } from "../tryOnScopeDispose";
import { toValue } from "../toValue";
import { Fn, MaybeRefOrGetter, isObject, defaultWindow, NOOP } from "../utils";

export function useEventListener(...args: any[]): Fn {
  let target: MaybeRefOrGetter<EventTarget> | undefined;
  let event: string;
  let listener: Function;
  let options: MaybeRefOrGetter<boolean | AddEventListenerOptions> | undefined;

  if (typeof args[0] === "string" && args[0]) {
    [event, listener, options] = args;
    target = defaultWindow;
  } else {
    [target, event, listener, options] = args;
  }

  // 不存在目标, 直接返回
  if (!target) return NOOP;

  const cleanups: Function[] = [];

  // 清除注册
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };

  // 移除事件
  const register = (el: any, event: string, listener: any, options: any) => {
    el.addEventListener(event, listener, options);
    return () => el.removeEventListener(event, listener, options);
  };

  const stopWatch = watch(
    () => [unrefElement(target as unknown as MaybeElementRef), toValue(options)],
    ([el, options]) => {
      cleanup();
      if (!el) return;
      // 创建选项的克隆，以避免在删除时对其进行反应性更改
      const optionsClone = isObject(options) ? { ...(options as object) } : options;
      cleanups.push(register(el, event, listener, optionsClone));
    },
    // 设置 flush: 'post' 将会使侦听器延迟到组件渲染之后再执行
    { immediate: true, flush: "post" }
  );

  // 手动停止
  const stop = () => {
    stopWatch();
    cleanup();
  };

  // 当相关的 effect 作用域停止时会调用这个回调函数。
  tryOnScopeDispose(stop);

  return stop;
}
