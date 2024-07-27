/*
 * @Date: 2023-11-23 13:35:44
 * @Description: Modify here please
 */
import { provide } from "vue";

import type { InjectionKey, ObjectDirective, Ref } from "vue";

type ForwardRefSetter = <T>(el: T) => void;

export type ForwardRefInjectionContext = {
  setForwardRef: ForwardRefSetter;
};

export const FORWARD_REF_INJECTION_KEY: InjectionKey<ForwardRefInjectionContext> = Symbol("forwardRef");

export const useForwardRef = <T>(forwardRef: Ref<T | null>) => {
  const setForwardRef: any = (el: T) => {
    forwardRef.value = el;
  };

  provide(FORWARD_REF_INJECTION_KEY, {
    setForwardRef
  });
};

export const useForwardRefDirective = (setForwardRef: ForwardRefSetter): ObjectDirective => {
  return {
    mounted(el) {
      setForwardRef(el);
    },
    updated(el) {
      setForwardRef(el);
    },
    unmounted() {
      setForwardRef(null);
    }
  };
};
