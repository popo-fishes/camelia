<!--
 * @Date: 2023-12-18 19:57:38
 * @Description: Modify here please
-->
<template>
  <PopperWrap ref="popperRef" :role="role">
    <PopperTrigger @click="onClick" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
      <slot v-if="$slots.default" />
    </PopperTrigger>
    <PopperContent
      ref="popperContentRef"
      :fallback-placements="fallbackPlacements"
      :gpu-acceleration="gpuAcceleration"
      :offset="offset"
      :placement="placement"
      :persistent="persistent"
      :strategy="strategy"
      :disabled="disabled"
      :open="open"
      :transition="transition"
      :id="id"
      :z-index="zIndex"
      :popper-class="popperClass"
      :popper-style="popperStyle"
      :get-popup-container="getPopupContainer"
      @mouseenter="onPopperMouseenter"
      @mouseleave="onMouseleave"
      @show="onContentShow"
      @hide="onContentHide"
    >
      <slot name="popup" />
    </PopperContent>
  </PopperWrap>
</template>

<script lang="ts" setup>
import { computed, ref, watch, unref, toRef } from "vue";
import PopperWrap from "./wrap.vue";
import PopperTrigger from "./trigger.vue";
import PopperContent from "./content.vue";
import { isBoolean } from "@fish-bubble-design/shared/utils";

import { onClickOutside } from "@fish-bubble-design/shared/onClickOutside";
import { useId } from "@fish-bubble-design/hooks";

import { composeEventHandlers } from "./utils";
import { useDelayedToggle } from "./composables/use-delayed-toggle";

import type { IPopperProps } from "./popper-type";

defineOptions({
  name: "FbPopper"
});

const emit = defineEmits(["show", "hide"]);

const props = withDefaults(defineProps<IPopperProps>(), {
  role: "tooltip",
  trigger: "hover",
  gpuAcceleration: false,
  persistent: true,
  enterable: true,
  offset: 6,
  placement: "bottom",
  strategy: "absolute",
  /** There is no active control by default, it must be important */
  visible: null
});

const id = useId();
// 获取popper节点容器
const popperRef = ref();
// 下拉菜单的内容组件实例ref
const popperContentRef = ref<any>();

// 停止手柄
let stopHandle: ReturnType<typeof onClickOutside>;

// Pop up controller
const open = ref(false);

/** Active control, no longer affected by trigger values */
const controlled = computed(() => isBoolean(props.visible));

// Stop when controlling or disabling
const stopWhenControlledOrDisabled = () => {
  if (unref(controlled) || props.disabled) {
    return true;
  }
};

// return 2 control methods
const { onOpen, onClose } = useDelayedToggle({
  showAfterTime: props.showAfterTime,
  hideAfterTime: props.hideAfterTime,
  open: () => {
    open.value = true;
  },
  close: () => {
    open.value = false;
  }
});

const trigger = toRef(props, "trigger");

// Get Focus
const onMouseenter = composeEventHandlers(stopWhenControlledOrDisabled, () => {
  if (unref(trigger) === "hover") {
    onOpen();
  }
});
// Popper Focus
const onPopperMouseenter = composeEventHandlers(stopWhenControlledOrDisabled, () => {
  if (props.enterable && unref(trigger) === "hover") {
    onOpen();
  }
});
// Lost Focus
const onMouseleave = composeEventHandlers(stopWhenControlledOrDisabled, () => {
  if (unref(trigger) === "hover") {
    onClose();
  }
});
// When clicked
const onClick = composeEventHandlers(stopWhenControlledOrDisabled, () => {
  if (unref(trigger) === "click") {
    if (open.value) {
      onClose();
    } else {
      onOpen();
    }
  }
});

// pop show
const onContentShow = (e) => {
  emit("show", e);
  // 绑定单击外部
  stopHandle = onClickOutside(
    computed(() => {
      return popperRef.value?.contentRef;
    }),
    // 点击的回调
    () => {
      //如果是外部控制则不执行
      if (unref(controlled)) return;
      // 如果不是hoover，则点击非弹窗区域就关闭弹窗
      if (unref(trigger) !== "hover") {
        onClose();
      }
    }
  );
};

// pop hide
const onContentHide = (e) => {
  emit("hide", e);
};

const updatePopper = () => {
  const popperComponent = unref(popperContentRef);
  if (popperComponent) {
    popperComponent?.updatePopper();
  }
};

const isFocusInsideContent = (event?: FocusEvent) => {
  const popperContent: HTMLElement | undefined = popperRef.value?.contentRef;
  // 相关目标
  const activeElement = (event?.relatedTarget as Node) || document.activeElement;
  // 当前节点目标是否在popperContent下拉菜单中
  return popperContent && popperContent.contains(activeElement);
};

watch(
  () => unref(open),
  (val) => {
    if (!val) {
      stopHandle?.();
    }
  },
  // 设置 flush: 'post' 将会使侦听器延迟到组件渲染之后再执行
  { flush: "post" }
);

watch(
  () => props.disabled,
  (disabled) => {
    if (disabled && open.value) {
      open.value = false;
    }
  }
);

watch(
  () => props.visible,
  (value) => {
    if (isBoolean(value)) {
      open.value = value;
    }
  },
  { immediate: true }
);

defineExpose({
  /** popper component */
  popperRef,
  /** open popper*/
  onOpen,
  /** close popper*/
  onClose,
  /** update popper*/
  updatePopper,
  /** 验证当前焦点目标是--提示内容中的节点 */
  isFocusInsideContent
});
</script>
