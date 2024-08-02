/*
 * @Date: 2023-12-02 15:16:40
 * @Description: 轻松使用事件监听器
 */
import { useUnmount } from "../use-unmount";
import { Fn, isObject, defaultWindow, NOOP } from "../utils";
import { getTargetElement } from "../utils/domTarget";
import type { BasicTarget } from "../utils/domTarget";
import { useEffect } from "react";

export type Target = BasicTarget<HTMLElement | Element | Window | Document>;
export function useEventListener(...args: any[]): Fn {
  let target: Target;
  let event: string;
  let listener: Function;
  let options: AddEventListenerOptions | undefined;

  if (typeof args[0] === "string" && args[0]) {
    [event, listener, options] = args;
    target = defaultWindow;
  } else {
    [target, event, listener, options] = args;
  }

  // 不存在目标, 直接返回
  if (!target) return NOOP;

  const targetElement = getTargetElement(target);

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

  useEffect(() => {
    if (!targetElement) return;
    // 创建选项的克隆，以避免在删除时对其进行反应性更改
    const optionsClone = isObject(options) ? { ...(options as object) } : options;
    cleanups.push(register(targetElement, event, listener, optionsClone));

    return () => {
      stop?.();
    };
  }, [targetElement, options]);

  // 手动停止
  const stop = () => {
    cleanup();
  };

  // 当相关的 effect 作用域停止时会调用这个回调函数。
  useUnmount(() => {
    stop?.();
  });

  return stop;
}
