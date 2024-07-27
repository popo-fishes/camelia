<!--
 * @Date: 2023-11-27 16:45:35
 * @Description: 弹窗涂层
-->
<template>
  <div v-if="modal" :class="[overlayClass, ns.e('overlay')]" :style="{ zIndex }">
    <!-- 多加一层主要用来做，弹窗居中，弹窗后续拓展 -->
    <div :class="[ns.e('overlay-dialog')]" :style="overlayDialogStyle" @mousedown="onMousedown" @mouseup="onMouseup" @click="onClick">
      <slot />
    </div>
  </div>
  <div
    v-else
    :class="overlayClass"
    :style="{
      zIndex,
      position: 'fixed',
      top: '0px',
      right: '0px',
      bottom: '0px',
      left: '0px'
    }"
  >
    <!-- 多加一层主要用来做，弹窗居中，弹窗后续拓展 -->
    <div :class="[ns.e('overlay-dialog')]" :style="overlayDialogStyle" @mousedown="onMousedown" @mouseup="onMouseup" @click="onClick">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { CSSProperties } from "vue";
import type { IOverlayProps, IDialogProps } from "./type";
import { useSameTarget, useNamespace } from "@fish-bubble-design/hooks";

const props = defineProps<IOverlayProps & { alignCenter?: IDialogProps["alignCenter"] }>();

// 事件
const emit = defineEmits({
  click: (evt: MouseEvent) => evt instanceof MouseEvent
});

const ns = useNamespace("dialog");

// 弹窗外层的样式
const overlayDialogStyle = computed<CSSProperties>(() => {
  // 垂直居中
  if (props.alignCenter) {
    return { display: "flex" };
  }
  return {};
});

// 蒙层点击事件
const onModalClick = (e) => {
  emit("click", e);
};

// 点击事件
const { onMousedown, onMouseup, onClick } = useSameTarget(onModalClick);
</script>
