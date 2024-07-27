/*
 * @Date: 2023-11-23 21:27:58
 * @Description: 获取元素内容或边框尺寸
 */
import { computed, watch, onMounted, ref } from "vue";
import { unrefElement } from "../unrefElement";
import type { MaybeComputedElementRef } from "../unrefElement";
import { tryOnScopeDispose } from "../tryOnScopeDispose";
import { isClient } from "../utils";

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
export function useResizeObserver(target: MaybeComputedElementRef, callback: ResizeObserverCallback) {
  let observer: ResizeObserver | undefined;

  const isMounted = ref(false);

  const defaultWindow = isClient ? window : undefined;
  // 是否支持ResizeObserver
  const isSupported = computed(() => {
    isMounted.value;
    return Boolean(() => defaultWindow && "ResizeObserver" in defaultWindow);
  });

  const cleanup = () => {
    if (observer) {
      // 取消和结束目标对象上所有对 Element观察。
      observer.disconnect();
      observer = undefined;
    }
  };

  onMounted(() => {
    isMounted.value = true;
  });

  const targets = computed(() => (Array.isArray(target) ? target.map((el) => unrefElement(el)) : [unrefElement(target)]));

  /**
   * watch返回值停止该副作用的函数
   */
  const stopWatch = watch(
    targets,
    (els) => {
      cleanup();
      if (isSupported.value && defaultWindow) {
        observer = new ResizeObserver(callback);
        // 开始观察指定的 Element
        for (const _el of els) _el && observer!.observe(_el);
      }
    },
    { immediate: true, flush: "post", deep: true }
  );

  // 停止检测
  const stop = () => {
    cleanup();
    stopWatch();
  };

  tryOnScopeDispose(stop);

  return {
    isSupported,
    stop
  };
}
