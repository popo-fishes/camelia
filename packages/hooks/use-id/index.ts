/*
 * @Date: 2023-12-19 11:43:08
 * @Description: Modify here please
 */
import { computed, unref } from "vue";
import type { Ref } from "vue";
import type { MaybeRef } from "@fish-bubble-design/shared/utils";

const defaultIdInjection = {
  prefix: Math.floor(Math.random() * 10000),
  current: 0
};

export const useId = (deterministicId?: MaybeRef<string>, namespace?: string): Ref<string> => {
  const _namespace = namespace || "fb-popper";

  const idRef = computed(() => unref(deterministicId) || `${_namespace}-id-${defaultIdInjection.prefix}-${defaultIdInjection.current++}`);

  return idRef;
};
