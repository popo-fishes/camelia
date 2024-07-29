/*
 * @Date: 2023-11-23 15:23:53
 * @Description: setTimeout包装器
 */
import { useState, useEffect } from "react";
import type { AnyFn, Fn } from "../utils";
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
  isPending: boolean;
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
  interval: number,
  options: UseTimeoutFnOptions = {}
): Stoppable<Parameters<CallbackFn> | []> {
  const { immediate = true } = options;

  const [isPending, setPending] = useState<boolean>(false);

  let timer: ReturnType<typeof setTimeout> | undefined;

  function clear() {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
  }

  function stop() {
    setPending(false);
    clear();
  }

  function start(...args: Parameters<CallbackFn> | []) {
    clear();
    setPending(true);
    timer = setTimeout(() => {
      setPending(false);
      timer = undefined;

      cb(...args);
    }, interval);
  }

  if (immediate) {
    setPending(true);
    if (isClient) start();
  }

  useEffect(() => {
    return () => {
      stop();
    };
  }, []);

  return {
    isPending: isPending,
    start,
    stop
  };
}
