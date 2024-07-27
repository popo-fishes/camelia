/*
 * @Date: 2023-12-19 15:29:10
 * @Description: Modify here please
 */
import { computed, getCurrentInstance, inject, ref, unref } from "vue";
import { isNumber } from "@fish-bubble-design/shared/utils";
import type { InjectionKey, Ref } from "vue";

const zIndex = ref(0);
export const defaultInitialZIndex = 2000;

export const zIndexContextKey: InjectionKey<Ref<number | undefined>> = Symbol("zIndexContextKey");

export const useZIndex = (zIndexOverrides?: Ref<number>) => {
  const zIndexInjection = zIndexOverrides || (getCurrentInstance() ? inject(zIndexContextKey, undefined) : undefined);

  const initialZIndex = computed(() => {
    const zIndexFromInjection = unref(zIndexInjection);
    return isNumber(zIndexFromInjection) ? zIndexFromInjection : defaultInitialZIndex;
  });
  const currentZIndex = computed(() => initialZIndex.value + zIndex.value);

  const nextZIndex = () => {
    zIndex.value++;
    return currentZIndex.value;
  };

  return {
    nextZIndex
  };
};

export type UseZIndexReturn = ReturnType<typeof useZIndex>;
