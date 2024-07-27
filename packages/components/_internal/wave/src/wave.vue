<!--
 * @Date: 2024-01-04 20:24:45
 * @Description: 波浪效果组件
-->
<script setup lang="ts">
import { ref, onBeforeUnmount, nextTick } from "vue";
import { useNamespace } from "@fish-bubble-design/hooks";

defineOptions({
  name: "BaseWave"
});

const ns = useNamespace("base-wave");

const selfRef = ref<HTMLElement | null>(null);
// 主动控制模式
const activeRef = ref(false);
let animationTimerId: number | null = null;

onBeforeUnmount(() => {
  if (animationTimerId !== null) {
    window.clearTimeout(animationTimerId);
  }
});

const play = () => {
  if (animationTimerId !== null) {
    window.clearTimeout(animationTimerId);
    activeRef.value = false;
    animationTimerId = null;
  }
  void nextTick(() => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    void selfRef.value?.offsetHeight;
    activeRef.value = true;
    animationTimerId = window.setTimeout(() => {
      activeRef.value = false;
      animationTimerId = null;
    }, 1000);
  });
};

defineExpose({ play });
</script>

<template>
  <div ref="selfRef" aria-hidden :class="[ns.b(), activeRef && `is-active`]" />
</template>
