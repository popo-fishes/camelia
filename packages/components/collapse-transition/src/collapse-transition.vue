<!--
 * @Date: 2024-01-17 20:54:55
 * @Description: Modify here please
-->
<template>
  <transition :name="ns.b()" v-on="on">
    <slot />
  </transition>
</template>
<script lang="ts" setup>
import { useNamespace } from "@fish-bubble-design/hooks";

// 折叠器动画
defineOptions({
  name: "FbCollapseTransition"
});

const ns = useNamespace("collapse-transition");

const reset = (el: any) => {
  el.style.maxHeight = "";
  el.style.overflow = el.dataset.oldOverflow;
  el.style.paddingTop = el.dataset.oldPaddingTop;
  el.style.paddingBottom = el.dataset.oldPaddingBottom;
};

const on = {
  beforeEnter(el: any) {
    if (!el.dataset) el.dataset = {};

    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;
    if (el.style.height) el.dataset.elExistsHeight = el.style.height;

    el.style.maxHeight = 0;
    el.style.paddingTop = 0;
    el.style.paddingBottom = 0;
  },

  enter(el: any) {
    requestAnimationFrame(() => {
      el.dataset.oldOverflow = el.style.overflow;
      if (el.dataset.elExistsHeight) {
        el.style.maxHeight = el.dataset.elExistsHeight;
      } else if (el.scrollHeight !== 0) {
        el.style.maxHeight = `${el.scrollHeight}px`;
      } else {
        el.style.maxHeight = 0;
      }

      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
      el.style.overflow = "hidden";
    });
  },

  afterEnter(el: any) {
    el.style.maxHeight = "";
    el.style.overflow = el.dataset.oldOverflow;
  },

  enterCancelled(el: any) {
    reset(el);
  },

  beforeLeave(el: any) {
    if (!el.dataset) el.dataset = {};
    el.dataset.oldPaddingTop = el.style.paddingTop;
    el.dataset.oldPaddingBottom = el.style.paddingBottom;
    el.dataset.oldOverflow = el.style.overflow;

    el.style.maxHeight = `${el.scrollHeight}px`;
    el.style.overflow = "hidden";
  },

  leave(el: any) {
    if (el.scrollHeight !== 0) {
      el.style.maxHeight = 0;
      el.style.paddingTop = 0;
      el.style.paddingBottom = 0;
    }
  },

  afterLeave(el: any) {
    reset(el);
  },

  leaveCancelled(el: any) {
    reset(el);
  }
};
</script>
