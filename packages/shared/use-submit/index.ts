/*
 * @Date: 2023-12-28 17:00:36
 * @Description: 防止重复提交
 */
import { useState } from "react";
import type { AnyFn } from "../utils";
import { useUnmount } from "../use-unmount";

let timer: ReturnType<typeof setTimeout> | undefined;

export function useSubmit<CallbackFn extends AnyFn>(
  cb: CallbackFn,
  // 持续时间
  duration = 0
): {
  /** 状态 */
  isSubmitting: boolean;
  /** 开始 */
  submit: (...args: Parameters<CallbackFn> | []) => void;
} {
  const [isSubmitting, setSubmitting] = useState(false);

  function clear() {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
  }

  const submit = async (...args: Parameters<CallbackFn> | []) => {
    if (isSubmitting) {
      return;
    }

    setSubmitting(true);

    try {
      await cb(...args);
    } catch (error) {
      // Handle error
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      if (duration == 0) {
        setSubmitting(false);
        // eslint-disable-next-line no-unsafe-finally
        return;
      }
      /**
       * 防止重复提交---》弹窗， 延迟改变isSubmitting
       *
       * 为啥要加延迟，在发布招工的时候，常常会出现一个接口请求完毕 会出现弹窗判断！！
       * 此时如果请求接口返回了就去改变isSubmitting状态，会出现一个问题：
       * 弹窗正在弹出来中的时候（弹窗有动画时间），疯狂点击提交，也会导出重复提交，导致弹窗弹出来多个！
       */
      timer = setTimeout(() => {
        setSubmitting(false);
      }, duration);
    }
  };

  function stop() {
    clear();
  }

  useUnmount(() => stop?.());

  return { isSubmitting, submit };
}
