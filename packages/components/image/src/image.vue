<!--
 * @Date: 2023-08-24 10:03:48
 * @Description: 图片组件
-->
<script lang="ts" setup>
import type { CSSProperties } from "vue";
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { CanSee } from "@fish-bubble/icons";
import { useNamespace } from "@fish-bubble-design/hooks";
import { Picture } from "@fish-bubble/icons";

import type { ImageProps } from "./type";

const props = withDefaults(defineProps<ImageProps>(), {
  preview: false
});

defineOptions({
  name: "FbImage"
});

const emit = defineEmits({
  load: (evt: Event) => evt instanceof Event,
  error: (evt: Event) => evt instanceof Event
});

const ns = useNamespace("image");

const imgDom = ref();
const load = ref(false);
const hasLoadError = ref(false);
let observer: any;
let timer: any;

// 图片外层样式
const imgWrapStyle = computed<CSSProperties>(() => {
  const style: CSSProperties = {};
  if (props.height) {
    style[`height`] = typeof props.height == "string" ? props.height : `${props.height}px`;
  }
  if (props.width) {
    style[`width`] = typeof props.width == "string" ? props.width : `${props.width}px`;
  }
  return style;
});

// 图片地址
const imgSrc = computed(() => {
  // load加载成功 或者 没开启懒加载也直接返回
  if (load.value || !props.lazy) return props.src;
  return "";
});

const hasImg = computed(() => {
  // load加载成功 或者 没开启懒加载也直接返回
  if (load.value || !props.lazy) return true;
  return false;
});

const ObserverView = (fn: Function) => {
  const observer = new IntersectionObserver((entrys) => entrys.forEach((entry) => fn(entry)), {
    rootMargin: "0px",
    threshold: 0
  });
  return observer;
};

onMounted(() => {
  // 需要懒加载
  if (props?.lazy) {
    observer = ObserverView((entry: any) => {
      if (entry.isIntersecting) {
        const img = new Image();
        img.src = props.src;
        img.onload = () => {
          timer = setTimeout(() => {
            if (!props.src) {
              load.value = false;
            } else {
              load.value = true;
            }
          }, 200);
        };
        // 当内容可见
        observer.unobserve(imgDom.value);
        observer = null;
      }
    });
    observer.observe(imgDom.value); // 观察
  }
});

onBeforeUnmount(() => {
  observer && observer.unobserve(imgDom.value);
  timer && clearTimeout(timer);
}); // 不观察了

// 点击预览
const clickHandler = () => {};

const handleError = (event) => {
  hasLoadError.value = true;
  emit("error", event);
};

const handleLoad = (event) => {
  hasLoadError.value = false;
  emit("load", event);
};
</script>

<template>
  <div ref="imgDom" :class="[ns.b(), $attrs.class]" :style="imgWrapStyle">
    <slot v-if="hasLoadError" name="error">
      <div :class="ns.e('error')"><Picture size="30px" /></div>
    </slot>
    <template v-else>
      <!-- 图片地址 -->
      <template v-if="hasImg">
        <a :href="linkUrl" v-if="!!linkUrl" target="_blank">
          <img :src="imgSrc" :class="[ns.e('inner')]" :alt="alt" :fit="fit" @load="handleLoad" @error="handleError" />
        </a>
        <img v-else :src="imgSrc" :class="[ns.e('inner')]" :alt="alt" :fit="fit" @click="clickHandler" @load="handleLoad" @error="handleError" />
      </template>
      <!-- placeholder占位 -->
      <div v-else :class="ns.e('placeholder')">
        <slot name="placeholder" />
      </div>
    </template>
    <!-- 预览按钮蒙层 -->
    <div :class="ns.e('preview')" v-if="preview">
      <div class="inner-wrap"><CanSee class="icon-cansee" />预览</div>
    </div>
  </div>
</template>
