<!--
 * @Date: 2023-12-18 20:26:08
 * @Description: trigger
-->
<template>
  <only-child v-bind="$attrs">
    <slot />
  </only-child>
</template>

<script setup lang="ts">
import { inject, onMounted, watch } from "vue";
import { OnlyChild } from "../../_internal/only-child";
import { POPPER_WRAP_INJECTION_KEY } from "./utils";
import { useForwardRef } from "@fish-bubble-design/hooks";
import { isElement } from "@fish-bubble-design/shared/utils";

import type { IPopperTriggerProps } from "./trigger-type";

defineOptions({
  name: "PopperTrigger"
});

const props = defineProps<IPopperTriggerProps>();

const { triggerRef } = inject(POPPER_WRAP_INJECTION_KEY, undefined)!;
// Hang on the current trigger ref,
useForwardRef(triggerRef);

onMounted(() => {
  watch(
    triggerRef,
    (el, prevEl) => {
      if (isElement(el)) {
        (["onMouseenter", "onMouseleave", "onClick"] as const).forEach((eventName) => {
          const handler = props[eventName];
          if (handler) {
            (el as HTMLElement).addEventListener(eventName.slice(2).toLowerCase(), handler);
            (prevEl as HTMLElement)?.removeEventListener?.(eventName.slice(2).toLowerCase(), handler);
          }
        });
      }
    },
    {
      immediate: true
    }
  );
});

defineExpose({
  /**
   * @description trigger element
   */
  triggerRef
});
</script>
./trigger-type
