<!--
 * @Date: 2023-12-23 17:51:35
 * @Description: Modify here please
-->
<script setup lang="ts">
import { ref, computed, shallowRef, watch, nextTick, onMounted, useAttrs } from "vue";
import type { StyleValue } from "vue";
import { useNamespace } from "@fish-bubble-design/hooks";
import { isNil } from "@fish-bubble-design/shared/utils";
import { CircleCloseFilled } from "@fish-bubble/icons";

import { useFocusController } from "@fish-bubble-design/hooks";
import BaseWave from "../../_internal/wave/src/wave.vue";

import type { InputProps, InputEmits } from "./type";
type TargetElement = HTMLInputElement | HTMLTextAreaElement;

const emit = defineEmits<InputEmits>();

const rawAttrs = useAttrs();

defineOptions({ name: "FbInput", inheritAttrs: false });

const props = withDefaults(defineProps<InputProps>(), {
  placeholder: "请输入",
  type: "text",
  wave: true
});

const nsInput = useNamespace("input");
const nsTextarea = useNamespace("textarea");

const inputRef = shallowRef<HTMLInputElement>();
const textareaRef = shallowRef<HTMLInputElement>();

const _ref = computed(() => inputRef.value || textareaRef.value);

const { wrapperRef, isFocused, handleFocus, handleBlur } = useFocusController(_ref);

const hovering = ref(false);
const isComposing = ref(false);

const nativeInputValue = computed(() => (isNil(props.modelValue) ? "" : String(props.modelValue)));

const wrapperKls = computed(() => {
  if (props.type !== "textarea") {
    return [nsInput.b(), nsInput.m(props.size), nsInput.is("focus", isFocused.value), nsInput.is("disabled", inputDisabled.value), rawAttrs.class];
  }
  return [nsTextarea.b(), nsInput.is("focus", isFocused.value), rawAttrs.class];
});

const wrapperStyle = computed<StyleValue>(() => [rawAttrs.style as StyleValue]);

// todo useFormDisabled
const inputDisabled = computed(() => props.disabled);
// 何时显示清除图标
const showClear = computed(() => props.clearable && !props.disabled && !props.readonly && !!nativeInputValue.value && (isFocused.value || hovering.value));

function allowInput(value: string): boolean {
  const { allowInput } = props;
  if (typeof allowInput === "function") {
    return allowInput(value);
  }
  return true;
}

const handleInput = async (event: Event) => {
  const { value } = event.target as TargetElement;

  const isIncomingValueValid = allowInput(value);

  // 在合成过程中不应发出输入
  if (isComposing.value) return;

  if (value === nativeInputValue.value) {
    setNativeInputValue();
    return;
  }

  if (isIncomingValueValid) {
    emit("update:modelValue", value);
    emit("input", value);
  }

  // 确保本地输入值得到控制
  await nextTick();
  setNativeInputValue();
};

// 设置值
const setNativeInputValue = () => {
  // 输入口的节点
  const input = _ref.value;
  const formatterValue = nativeInputValue.value;
  if (!input || input.value === formatterValue) return;
  // 给节点赋值
  input.value = formatterValue;
};

const handleCompositionEnd = (event: CompositionEvent) => {
  if (isComposing.value) {
    isComposing.value = false;
    handleInput(event);
  }
};

const clear = () => {
  emit("update:modelValue", "");
  emit("input", "");
};

const handleChange = (event: Event) => {
  emit("change", (event.target as TargetElement).value);
};

watch(nativeInputValue, () => setNativeInputValue());

const focus = async () => {
  await nextTick();
  _ref.value?.focus();
};

const blur = () => _ref.value?.blur();

onMounted(() => {
  setNativeInputValue();
});

const handleMouseLeave = (evt: MouseEvent) => {
  hovering.value = false;
};

const handleMouseEnter = (evt: MouseEvent) => {
  hovering.value = true;
};

defineExpose({
  /** @description HTML element, input or textarea */
  ref: _ref,
  /** @description HTML input element native method */
  focus,
  /** @description HTML input element native method */
  blur,
  /** @description clear input value */
  clear
});
</script>

<template>
  <div :class="wrapperKls" :style="wrapperStyle" ref="wrapperRef" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" v-if="type !== 'textarea'">
    <!-- 前缀 -->
    <span v-if="$slots.prefix" :class="nsInput.e('prefix')">
      <slot name="prefix" />
    </span>
    <input
      ref="inputRef"
      :class="[nsInput.e('inner')]"
      :style="inputStyle"
      :disabled="inputDisabled"
      :maxlength="maxlength"
      :readonly="readonly"
      :autofocus="autofocus"
      :placeholder="placeholder"
      :type="type"
      @compositionstart="() => (isComposing = true)"
      @compositionend="handleCompositionEnd"
      @input="handleInput"
      @change="handleChange"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <span :class="nsInput.e('suffix')" v-if="$slots.suffix || showClear">
      <template v-if="!showClear">
        <slot name="suffix" />
      </template>
      <!-- 关闭按钮 -->
      <CircleCloseFilled v-if="showClear" class="closeIcon" @click="clear" />
    </span>

    <!-- 波浪 -->
    <BaseWave v-if="wave" />
  </div>
  <div :class="wrapperKls" :style="wrapperStyle" ref="wrapperRef" v-if="type == 'textarea'">
    <textarea
      ref="textareaRef"
      :class="nsTextarea.e('inner')"
      :style="inputStyle"
      :disabled="inputDisabled"
      :readonly="readonly"
      :autofocus="autofocus"
      :placeholder="placeholder"
      @compositionstart="() => (isComposing = true)"
      @compositionend="handleCompositionEnd"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
    />
    <!-- 波浪 -->
    <BaseWave v-if="wave" />
  </div>
</template>
