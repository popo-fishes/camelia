<!--
 * @Date: 2023-12-18 19:57:38
 * @Description: popper-wrap
-->
<template>
  <slot />
</template>

<script lang="ts" setup>
import { computed, provide, ref } from "vue";
import { POPPER_WRAP_INJECTION_KEY } from "./utils";

import type { PopperWrapInjectionContext } from "./utils";

import type { IPopperWrapProps } from "./wrap-type";

defineOptions({
  name: "PopperWrap",
  inheritAttrs: false
});

const props = defineProps<IPopperWrapProps>();

const triggerRef = ref<HTMLElement>();
const contentRef = ref<HTMLElement>();

const role = computed(() => props.role);

const popperProvides = {
  /**
   * @description triggerRef
   */
  triggerRef,
  /**
   * @description contentRef
   */
  contentRef,
  /** @description role */
  role
} as PopperWrapInjectionContext;

defineExpose(popperProvides);

provide(POPPER_WRAP_INJECTION_KEY, popperProvides);
</script>
./wrap-type
