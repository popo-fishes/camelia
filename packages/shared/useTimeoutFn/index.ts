/*
 * @Date: 2023-11-23 15:23:53
 * @Description: setTimeout包装器
 */
import { readonly, ref } from "vue";
import type { Ref } from "vue";

import type { AnyFn, Fn, MaybeRefOrGetter } from "../utils";
import { toValue } from "../toValue";
import { tryOnScopeDispose } from "../tryOnScopeDispose";
import { isClient } from "../utils";

interface UseTimeoutFnOptions {
  /**
   * 立即启动
   * @default true
   */
  immediate?: boolean;
}

interface Stoppable<StartFnArgs extends any[] = any[]> {
  /** 状态 */
  isPending: Readonly<Ref<boolean>>;
  /** 停止 */
  stop: Fn;
  /** 开始 */
  start: (...args: StartFnArgs) => void;
}

/**
 * setTimeout包装器

 * @param cb 函数
 * @param interval 时间
 * @param options
 */
export function useTimeoutFn<CallbackFn extends AnyFn>(
  cb: CallbackFn,
  interval: MaybeRefOrGetter<number>,
  options: UseTimeoutFnOptions = {}
): Stoppable<Parameters<CallbackFn> | []> {
  const { immediate = true } = options;

  const isPending = ref(false);

  let timer: ReturnType<typeof setTimeout> | undefined;

  function clear() {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
  }

  function stop() {
    isPending.value = false;
    clear();
  }

  function start(...args: Parameters<CallbackFn> | []) {
    clear();
    isPending.value = true;
    timer = setTimeout(() => {
      isPending.value = false;
      timer = undefined;

      cb(...args);
    }, toValue(interval));
  }

  if (immediate) {
    isPending.value = true;
    if (isClient) start();
  }

  tryOnScopeDispose(stop);

  return {
    isPending: readonly(isPending),
    start,
    stop
  };
}
