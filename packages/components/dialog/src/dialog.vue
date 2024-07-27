<!--
 * @Date: 2023-11-27 14:27:58
 * @Description: 基础弹窗
-->
<script setup lang="ts">
import { computed, ref, onMounted, watch } from "vue";
import type { CSSProperties } from "vue";
import type { IDialogProps } from "./type";
import { useZIndex } from "@fish-bubble-design/hooks";
import { isClient, isNumber } from "@fish-bubble-design/shared/utils";
import { useNamespace, useLockscreen } from "@fish-bubble-design/hooks";

import DialogOverlay from "./dialog-overlay.vue";
import DialogContent from "./dialog-content.vue";

defineOptions({
  inheritAttrs: false,
  name: "FbDialog"
});

// 属性
const props = withDefaults(defineProps<IDialogProps>(), {
  modal: true,
  appendTo: "body",
  alignCenter: false,
  closeOnClickModal: false,
  showClose: true,
  lockScroll: true
});

const ns = useNamespace("dialog");

// 事件
const emit = defineEmits({
  close: () => true,
  ["update:open"]: (value: boolean) => typeof value === "boolean"
});

// 弹窗控制器
const visible = ref(false);

const { nextZIndex } = useZIndex();

const contentZIndex = ref<number>(isNumber(props.zIndex) ? props.zIndex : nextZIndex());

// dialog样式
const dialogStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {};
  if (props.top) {
    style[`margin-top`] = props.top;
  }
  if (props.width) {
    style[`width`] = typeof props.width == "string" ? props.width : `${props.width}px`;
  }
  return style;
});

// 弹窗元素已从 DOM 中移除时调用
const onAfterLeave = () => {
  emit("close");
  emit("update:open", false);
};

// 蒙层点击事件
const onModalClick = () => {
  if (props.closeOnClickModal) {
    onHandleClose();
  }
};

if (props.lockScroll) {
  useLockscreen(visible, ns.b("parent--hidden"));
}

// 关闭弹窗的方法
const onHandleClose = () => {
  function hide(shouldCancel?: boolean) {
    if (shouldCancel) return;
    visible.value = false;
  }
  // 关闭前的回调，会暂停 Dialog 的关闭. 回调函数内执行 done 参数方法的时候才是真正关闭对话框的时候.
  if (props?.beforeClose) {
    props?.beforeClose?.(hide);
  } else {
    visible.value = false;
  }
};

// 初始化
onMounted(() => {
  if (props.open) {
    if (!isClient) return;
    visible.value = true;
  }
});

// 监听变化
watch(
  () => props.open,
  (val) => {
    if (val) {
      if (!isClient) return;
      visible.value = true;
    } else {
      if (visible.value) {
        visible.value = false;
      }
    }
  }
);
</script>

<template>
  <teleport :to="props.appendTo">
    <transition name="dialog-fade" @after-leave="onAfterLeave">
      <DialogOverlay
        v-show="visible"
        :modal="props.modal"
        :overlay-class="props.overlayClass"
        :z-index="contentZIndex"
        :align-center="props.alignCenter"
        @click="onModalClick"
      >
        <div :style="dialogStyle" role="dialog" :class="[ns.b(), ns.is('align-center', props.alignCenter), $attrs?.class]">
          <DialogContent :show-close="props.showClose" @close="onHandleClose" :title="title">
            <!-- 头部 -->
            <template #header>
              <slot name="header" />
            </template>
            <!-- 默认插槽 -->
            <slot />
            <!-- 底部 -->
            <template v-if="$slots?.footer" #footer>
              <slot name="footer" />
            </template>
          </DialogContent>
        </div>
      </DialogOverlay>
    </transition>
  </teleport>
</template>
