<!--
 * @Date: 2023-12-25 15:01:25
 * @Description: Modify here please
-->
<template>
  <component :is="tag" :class="compKls">
    <span :class="spanKls" @click="handleClick">
      <span :class="ns.e('inner')" />
      <input
        type="checkbox"
        @change="handleChange"
        :disabled="isDisabled"
        :class="ns.e('original')"
        :indeterminate="indeterminate"
        v-model="model"
        :name="name"
        :value="label"
      />
      <!-- 波浪 -->
      <BaseWave ref="waveElRef" v-if="wave" />
    </span>
    <span v-if="hasOwnLabel" :class="ns.e('label')">
      <slot />
      <template v-if="!$slots.default">{{ label }}</template>
    </span>
  </component>
</template>

<script setup lang="ts">
import { useSlots, computed, inject, toRaw, ref } from "vue";
import type { ICheckboxProps, CheckboxEmits } from "./type";
import { isNil, isUndefined, isArray, isBoolean } from "@fish-bubble-design/shared/utils";
import { useNamespace } from "@fish-bubble-design/hooks";
import { checkboxGroupContextKey } from "./constants";
import BaseWave from "../../_internal/wave/src/wave.vue";

defineOptions({ name: "FbCheckbox" });

const props = withDefaults(defineProps<ICheckboxProps>(), {
  label: "",
  tag: "label",
  wave: true
});

const slots = useSlots();

const emit = defineEmits<CheckboxEmits>();

const waveElRef = ref<any>(null);

const ns = useNamespace("checkbox");

const hasOwnLabel = computed<boolean>(() => {
  return !!slots.default || !isNil(props.label);
});

const isChecked = computed<boolean>(() => {
  const value = model.value;
  if (isBoolean(value)) {
    return value;
  } else if (isArray(value)) {
    return value.map(toRaw).includes(props.label);
  } else {
    return !!value;
  }
});

const isDisabled = computed(() => {
  return props.disabled;
});

const checkboxGroup = inject(checkboxGroupContextKey, undefined);

const isGroup = computed(() => isUndefined(checkboxGroup) === false);

const model = computed({
  get() {
    return isGroup.value ? checkboxGroup?.modelValue?.value : props.modelValue;
  },

  set(val: unknown) {
    if (isGroup.value && isArray(val)) {
      checkboxGroup?.changeEvent?.(val);
    } else {
      emit("update:modelValue", val);
    }
  }
});

const compKls = computed(() => {
  return [ns.b(), ns.is("disabled", isDisabled.value), ns.is("checked", isChecked.value)];
});

const spanKls = computed(() => {
  return [ns.e("input"), ns.is("disabled", isDisabled.value), ns.is("checked", isChecked.value), ns.is("indeterminate", props.indeterminate)];
});

const handleChange = (e) => {
  const target = e.target as HTMLInputElement;
  emit("change", target.checked);
};

const handleClick = (): void => {
  if (!props.disabled) {
    waveElRef.value?.play();
  }
};
</script>
