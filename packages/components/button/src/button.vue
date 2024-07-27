<!--
 * @Date: 2023-11-18 10:42:44
 * @Description: 全局按钮
-->
<script lang="ts" setup>
import { computed, CSSProperties, ref } from "vue";
import { Loading } from "@fish-bubble/icons";
import { useNamespace } from "@fish-bubble-design/hooks";
import BaseWave from "../../_internal/wave/src/wave.vue";
import type { IButtonProps } from "./type";

defineOptions({
  name: "FbButton"
});

const props = withDefaults(defineProps<IButtonProps>(), {
  tag: "button",
  wave: true
});
// 事件
const emit = defineEmits({
  click: (evt: MouseEvent) => evt instanceof MouseEvent
});

const ns = useNamespace("button");

const waveElRef = ref<any>(null);

const _props = computed(() => {
  return {
    disabled: props.disabled || props.loading
  };
});

const buttonStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {};
  if (props.width) {
    style[`width`] = typeof props.width == "string" ? props.width : `${props.width}px`;
  }
  return style;
});

const handleClick = (e: MouseEvent): void => {
  if (!props.disabled && !props.loading) {
    emit("click", e);
    waveElRef.value?.play();
  }
};
</script>

<template>
  <component
    :is="tag"
    v-bind="_props"
    :style="buttonStyle"
    @click="handleClick"
    :class="[ns.b(), ns.m(type), ns.m(size), ns.is('disabled', disabled), ns.is('loading', loading), ns.is('plain', plain), ns.is('ghost', ghost)]"
  >
    <template v-if="loading">
      <!-- 你可以自定义加载图标 -->
      <slot v-if="$slots?.loading" name="loading" />
      <!-- 默认加载图标 -->
      <Loading v-else class="icon-loading" />
    </template>
    <!-- 自定义按钮左侧图标 -->
    <template v-else-if="$slots?.icon">
      <slot name="icon" />
    </template>
    <!-- 默认按钮内容部分 -->
    <span v-if="$slots?.default" class="btn-text"><slot /></span>
    <!-- 波浪 -->
    <BaseWave ref="waveElRef" v-if="wave" />
  </component>
</template>
