/*
 * @Date: 2023-12-02 11:52:03
 * @Description: 防抖
 */
import { AnyFn } from "../utils";
import { useTimeoutFn } from "../useTimeoutFn";

/**
 * @param fn 执行主函数
 * @param options: wait 防抖时间
 *
 * 使用：
 *  const updated = ref(0);
    const { run } = useDebounceFn(
      (e) => {
        console.log(e);
        updated.value += 1;
      },
      { wait: 500 }
    );
     // 点击按钮事件
    function clickedFn() {
      run(111);
    }
 */
export const useDebounceFn = (fn: AnyFn, options: { wait: number }) => {
  // 你可以主动停止
  const { stop, start } = useTimeoutFn(fn, options.wait, { immediate: false });

  const run = (...args) => {
    stop();

    start(...args);
  };

  return {
    stop,
    run
  };
};
