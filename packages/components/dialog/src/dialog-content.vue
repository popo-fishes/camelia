<!--
 * @Date: 2023-11-28 11:26:29
 * @Description: 弹窗内容
-->
<template>
  <!-- 弹窗关闭按钮 -->
  <button class="closeIconbtn" v-if="showClose" @click="$emit('close')">
    <close-icon />
  </button>
  <!-- 头部 -->
  <header :class="[ns.e('header')]">
    <slot name="header">
      <p class="title">{{ title }}</p>
    </slot>
  </header>
  <!-- 内容 -->
  <div :class="[ns.e('body')]">
    <slot>内容区，请使用插槽添加内容</slot>
  </div>
  <!-- 底部 -->
  <footer :class="[ns.e('footer')]" v-if="$slots?.footer">
    <slot name="footer" />
  </footer>
</template>

<script setup lang="ts">
import type { IDialogContentProps } from "./type";
import { Close as CloseIcon } from "@fish-bubble/icons";
import { useNamespace } from "@fish-bubble-design/hooks";
const ns = useNamespace("dialog");
// 属性
defineProps<IDialogContentProps>();
// 事件
defineEmits({ close: () => true });
</script>
