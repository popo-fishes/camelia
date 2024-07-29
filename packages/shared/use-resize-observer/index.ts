/*
 * @Date: 2023-11-23 21:27:58
 * @Description: 获取元素内容或边框尺寸
 */
import { isClient } from "../utils/is";
import { getTargetElement } from "../utils/domTarget";
import { type MutableRefObject, useEffect } from "react";

type ResizeObserverCallback = (entries: any, observer: ResizeObserver) => void;

declare class ResizeObserver {
  constructor(callback: ResizeObserverCallback);
  disconnect(): void;
  observe(target: Element, options?: any): void;
  unobserve(target: Element): void;
}

/**
 * 获取元素内容或边框尺寸
 * https://developer.mozilla.org/zh-CN/docs/Web/API/ResizeObserver
 * @param target
 * @param callback
 */
export function useResizeObserver(target: MutableRefObject<any>, callback: ResizeObserverCallback) {
  let observer: ResizeObserver | undefined;

  const defaultWindow = isClient ? window : undefined;

  const cleanup = () => {
    if (observer) {
      // 取消和结束目标对象上所有对 Element观察。
      observer.disconnect();
      observer = undefined;
    }
  };

  // 停止检测
  const stop = () => {
    cleanup();
  };

  useEffect(() => {
    cleanup();

    const el = getTargetElement(target);

    if (!el) {
      return;
    }

    // 是否支持ResizeObserver
    const isSupported = Boolean(() => defaultWindow && "ResizeObserver" in defaultWindow);

    if (isSupported) {
      observer = new ResizeObserver(callback);
      // 开始观察指定的 Element
      observer!.observe(el as Element);
    }

    return () => {
      cleanup();
    };
  }, [target]);

  return {
    stop
  };
}
