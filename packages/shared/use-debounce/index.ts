/*
 * @Date: 2023-12-02 11:52:03
 * @Description: 防抖
 */
import { AnyFn } from "../utils";
import { useTimeout } from "../use-timeout";

/**
 * @param fn 执行主函数
 * @param options: wait 防抖时间
 *
 */
export const useDebounce = (fn: AnyFn, options: { wait: number }) => {
  // 你可以主动停止
  const { stop, start } = useTimeout(fn, options.wait, { immediate: false });

  const run = (...args) => {
    stop();

    start(...args);
  };

  return {
    stop,
    run
  };
};
