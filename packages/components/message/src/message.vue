<!--
 * @Date: 2023-11-23 17:08:51
 * @Description: message组件
-->
<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import type { CSSProperties } from "vue";
import { useTimeoutFn, useResizeObserver } from "@fish-bubble-design/shared";
import { getLastOffset } from "./instance";
import { CircleClose, WarningFilled, CircleCheckFilled, CircleCloseFilled } from "@fish-bubble/icons";
import { useNamespace } from "@fish-bubble-design/hooks";
import type { IMessageProps } from "./type";

const props = withDefaults(defineProps<IMessageProps>(), {
  showClose: false,
  dangerouslyUseHTMLString: false,
  id: "",
  zIndex: 500,
  duration: 3000,
  offset: 20
});

// 销毁时暴露事件destroy
defineEmits<{ (e: "destroy"): void }>();

const ns = useNamespace("message");

const messageRef = ref<HTMLDivElement>();
const visible = ref(false);
const height = ref(0);

// 最后一个msg的位置
const lastOffset = computed(() => getLastOffset(props.id));

// 当前msg的top值等于：当前距离顶部的偏移量 + 上一个距离顶部的top值
const offset = computed(() => props.offset + lastOffset.value);

const customStyle = computed<CSSProperties>(() => ({
  top: `${offset.value}px`,
  zIndex: props?.zIndex
}));

const iconOption = computed(() => {
  const iconMap = {
    info: { icon: WarningFilled, color: "#0092ff" },
    success: { icon: CircleCheckFilled, color: "#06B578" },
    warning: { icon: WarningFilled, color: "#FF8904" },
    error: { icon: CircleCloseFilled, color: "#E8362E" }
  };
  return props.icon ? { icon: props.icon, color: iconMap[props.type].color } : iconMap[props.type || "icon"];
});

// 当前msg的位置：主要是为了下一个msg 获取 当前这个的位置。我们这里暴露下
// 当前的就是当前的msg高度 + 现在的top值
const bottom = computed((): number => height.value + offset.value);

// 时间到了就关闭
const { start } = useTimeoutFn(
  () => {
    close();
  },
  props.duration,
  { immediate: false }
);
// 开启定时器
function startTimer() {
  // 时间不存在，不关闭
  if (props.duration === 0) return;
  start();
}
// 关闭
function close() {
  visible.value = false;
}

onMounted(() => {
  startTimer();
  visible.value = true;
});

useResizeObserver(messageRef, (entries) => {
  height.value = messageRef.value!.getBoundingClientRect().height;
});

// 暴露属性
defineExpose({ bottom, close });
</script>

<template>
  <transition name="ani-message-fade" @before-leave="onClose" @after-leave="$emit('destroy')">
    <!-- mouseenter，当鼠标滑动到消息容器上，不关闭消息 -->
    <div v-show="visible" :id="id" :style="customStyle" :class="[ns.b()]" ref="messageRef">
      <component :is="iconOption.icon" :size="20" :color="iconOption.color" />
      <slot>
        <p v-if="!isHtml" :class="[ns.e('content')]">
          {{ message }}
        </p>
        <p v-else v-html="message" :class="[ns.e('content')]" />
      </slot>
      <CircleClose v-if="showClose" @click.stop="close" class="icon-close" />
    </div>
  </transition>
</template>
