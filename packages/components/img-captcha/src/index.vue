<!--
 * @Date: 2023-11-21 10:43:27
 * @Description: 图片验证码
-->
<script lang="ts" setup>
import { onMounted, computed } from "vue";
import type { CSSProperties } from "vue";

import { useCaptcha, generateRandomId } from "./use-captcha";
import { useNamespace } from "@fish-bubble-design/hooks";

import type { ImgCaptchaProps } from "./type";

const props = withDefaults(defineProps<ImgCaptchaProps>(), {
  width: 95,
  height: 38,
  size: 4,
  type: "number"
});

defineOptions({
  name: "FbImgCaptcha"
});

const nodeId = computed(() => {
  return "imgCaptcha" + generateRandomId();
});

const { imgCaptchaCode, refresh, init } = useCaptcha(props, nodeId.value);

const ns = useNamespace("img-captcha");

const style = computed<CSSProperties>(() => {
  const style: CSSProperties = {};
  if (props.width) {
    style[`width`] = typeof props.width == "string" ? props.width : `${props.width}px`;
  }
  if (props.height) {
    style[`height`] = typeof props.height == "string" ? props.height : `${props.height}px`;
  }
  return style;
});

onMounted(() => {
  init();
  refresh();
});

const validate = (code: string) => {
  let codeState: boolean = false;
  const vcode = code.toLowerCase();
  if (!imgCaptchaCode.value || !vcode) return false;

  const lcode = imgCaptchaCode.value.toLowerCase();

  if (vcode == lcode) {
    codeState = true;
  } else {
    codeState = false;
  }
  return codeState;
};

defineExpose({ validate });
</script>

<template>
  <div :id="nodeId" :class="ns.b()" :style="style" />
</template>
