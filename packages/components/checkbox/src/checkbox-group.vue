<!--
 * @Date: 2023-12-25 16:27:32
 * @Description: Modify here please
-->
<template>
  <component :is="tag" :class="ns.b()" role="group">
    <slot />
  </component>
</template>

<script lang="ts" setup>
import { computed, nextTick, provide } from "vue";
import { useNamespace } from "@fish-bubble-design/hooks";
import { checkboxGroupContextKey } from "./constants";

import type { ICheckboxGroupProps, CheckboxEmits } from "./type";

defineOptions({
  name: "FbCheckboxGroup"
});

const props = withDefaults(defineProps<ICheckboxGroupProps>(), {
  tag: "div",
  modelValue: () => []
});

const emit = defineEmits<CheckboxEmits>();

const ns = useNamespace("checkbox-group");

const changeEvent = async (value: any) => {
  emit("update:modelValue", value);
  // 延迟更新值事件
  await nextTick();
  emit("change", value);
};

const modelValue = computed({
  get() {
    return props.modelValue;
  },
  set(val: any) {
    changeEvent(val);
  }
});

provide(checkboxGroupContextKey, {
  modelValue,
  changeEvent
});
</script>
