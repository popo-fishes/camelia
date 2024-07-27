/*
 * @Date: 2023-12-18 20:10:26
 * @Description: Modify here please
 */
import type { InjectionKey, Ref, ComputedRef } from "vue";

// popper相关
export type PopperWrapInjectionContext = {
  /** 触发器 */
  triggerRef: Ref<HTMLElement | undefined>;
  /** 内容 */
  contentRef: Ref<HTMLElement | undefined>;
  role: ComputedRef<string>;
};

export const POPPER_WRAP_INJECTION_KEY: InjectionKey<PopperWrapInjectionContext> = Symbol("popper-wrap");
