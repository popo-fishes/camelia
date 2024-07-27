<!--
 * @Date: 2023-11-28 16:30:59
 * @Description: 全局提示弹窗
-->
<template>
  <fb-dialog v-model:open="visible" :show-close="showClose" @close="onClose" :width="width" top="25vh" :class="ns.b()">
    <template #header>
      <div class="cc-header">
        <template v-if="showIcon">
          <!-- 你可以自定义加载图标 -->
          <slot v-if="$slots?.icon" name="icon" />
          <!-- 默认加载图标 -->
          <Chat v-else class="chat-icon" />
        </template>
        <p class="title">{{ title }}</p>
      </div>
    </template>
    <slot>
      <p class="dec" v-html="content" />
    </slot>

    <template #footer>
      <slot name="footer">
        <div class="cc-footer">
          <fb-button plain @click="onCancel" v-if="cancelText">{{ cancelText }}</fb-button>
          <fb-button type="primary" @click="onConfirm" v-if="okText">{{ okText }}</fb-button>
        </div>
      </slot>
    </template>
  </fb-dialog>
</template>

<script lang="ts" setup>
import { ref, watch, unref } from "vue";
import type { IPromptProps, IPrompEmits } from "./type";
import { useNamespace } from "@fish-bubble-design/hooks";
import { Chat } from "@fish-bubble/icons";
import FbDialog from "@fish-bubble-design/components/dialog";
import FbButton from "@fish-bubble-design/components/button";

defineOptions({ name: "FbPrompt" });

const props = withDefaults(defineProps<IPromptProps>(), {
  title: "温馨提示",
  okText: "确认",
  cancelText: "取消",
  width: "440px",
  showClose: true,
  showIcon: true
});

// 暴露事件
const emit = defineEmits<IPrompEmits>();

const ns = useNamespace("prompt");

// 打开弹窗开关
const visible = ref(false);

// 关闭弹窗的触发目标，可能是关闭按钮，可能是图标关闭（这个有可能别人需要用到点击了什么目标）
const cancelType = ref<string | null>(null);

// 弹窗关闭事件，只要弹窗被关闭了 都会触发。
const onClose = () => {
  // 因为只要弹窗被关闭了 都会触发，但是我们点击按钮时，并不行触发这个事件，所以我们坐下判断。
  // 如果是点击确认按钮关闭弹窗，就不在触发cancel事件了。
  if (cancelType.value == "OK") {
    // 置空关闭按钮类型
    cancelType.value = null;

    return;
  }
  // 关闭抛出事件
  emit("cancel", { type: (cancelType.value as any) || "notBtn" });
  // 置空关闭按钮类型
  cancelType.value = null;
};
// 取消按钮事件
const onCancel = () => {
  // 标记是取消按钮关闭的
  cancelType.value = "cancel";
  // 关闭弹窗
  visible.value = false;
};

// 确定按钮事件
const onConfirm = () => {
  // 标记是确认按钮关闭的
  cancelType.value = "ok";
  // 关闭弹窗
  visible.value = false;
  // 抛出事件
  emit("ok");
};

// 主要是想给外面主动调用组件方法
const close = () => {
  visible.value = false;
};

watch(
  () => unref(props.open),
  (val) => {
    visible.value = val;
  },
  { immediate: true }
);

watch(
  () => unref(visible),
  (val) => {
    if (!val) {
      emit("update:open", false);
    }
  }
);

// 暴露属性
defineExpose({ close });
</script>
