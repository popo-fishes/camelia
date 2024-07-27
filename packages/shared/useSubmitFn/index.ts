/*
 * @Date: 2023-12-28 17:00:36
 * @Description: 防止重复提交
 */
import { ref } from "vue";
import type { Ref } from "vue";
import type { AnyFn } from "../utils";

import { tryOnScopeDispose } from "../tryOnScopeDispose";

export function useSubmitFn<CallbackFn extends AnyFn>(
  cb: CallbackFn,
  // 持续时间
  duration: number = 0
): {
  /** 状态 */
  isSubmitting: Readonly<Ref<boolean>>;
  /** 开始 */
  submit: (...args: Parameters<CallbackFn> | []) => void;
} {
  const isSubmitting = ref(false);

  let timer: ReturnType<typeof setTimeout> | undefined;

  function clear() {
    if (timer) {
      clearTimeout(timer);
      timer = undefined;
    }
  }

  const submit = async (...args: Parameters<CallbackFn> | []) => {
    clear();

    if (isSubmitting.value) {
      return;
    }

    isSubmitting.value = true;

    try {
      await cb(...args);
    } catch (error) {
      // Handle error
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      if (duration == 0) {
        isSubmitting.value = false;
        return;
      }
      /**
       * 防止重复提交---》弹窗， 延迟改变isSubmitting
       *
       * 为啥要加延迟，在发布招工的时候，常常会出现一个接口请求完毕 会出现弹窗判断！！
       * 此时如果请求接口返回了就去改变isSubmitting状态，会出现一个问题：
       * 弹窗正在弹出来中的时候（弹窗有动画时间），疯狂点击提交，也会导出重复提交，导致弹窗弹出来多个！
       */
      setTimeout(() => {
        isSubmitting.value = false;
      }, duration);
    }
  };

  function stop() {
    isSubmitting.value = false;
    clear();
  }

  tryOnScopeDispose(stop);

  return { isSubmitting, submit };
}
