<!--
 * @Date: 2023-12-18 21:20:32
 * @Description: content pop-up
-->
<template>
  <transition :name="transitionClass" v-if="isSSR" @after-enter="onAfterShow" @after-leave="onAfterLeave">
    <div
      ref="contentRef"
      :role="role"
      v-bind="contentAttrs"
      v-show="shouldShow"
      :style="contentStyle"
      :class="contentClass"
      tabindex="-1"
      @mouseenter="(e) => $emit('mouseenter', e)"
      @mouseleave="(e) => $emit('mouseleave', e)"
    >
      <template v-if="!isDestroyed">
        <slot />
      </template>
    </div>
  </transition>
  <teleport :to="container" v-else>
    <transition :name="transitionClass" @after-enter="onAfterShow" @after-leave="onAfterLeave">
      <div
        ref="contentRef"
        :role="role"
        v-bind="contentAttrs"
        v-show="shouldShow"
        :style="contentStyle"
        :class="contentClass"
        tabindex="-1"
        @mouseenter="(e) => $emit('mouseenter', e)"
        @mouseleave="(e) => $emit('mouseleave', e)"
      >
        <template v-if="!isDestroyed">
          <slot />
        </template>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { ref, computed, onBeforeUnmount, unref, onMounted, shallowRef, onBeforeMount, watch, nextTick } from "vue";
import { isClient } from "@fish-bubble-design/shared/utils";
import { useNamespace } from "@fish-bubble-design/hooks";
import { IPopperContentProps, popperContentEmits } from "./content-type";
import { usePopperContent } from "./composables/use-content";
import { getParent } from "./utils";

defineOptions({
  name: "PopperContent",
  inheritAttrs: false
});

const ns = useNamespace("popper");

const emit = defineEmits(popperContentEmits);

const props = defineProps<IPopperContentProps>();

const { contentRef, triggerRef, instanceRef, contentStyle, contentClass, contentAttrs, update, role, forceUpdate } = usePopperContent(props, ns.b());

// Has it been destroyed
const isDestroyed = ref(false);

// During SSR - insertion is not allowed by default, move to the target container
const isSSR = ref(true);

// container
const container = shallowRef<HTMLElement | null>(null);

let parent: HTMLElement | null = null;
let timer: any = null;

const transitionClass = computed(() => {
  return props.transition || `${unref(ns.namespace)}-zoom-in-top`;
});

const shouldShow = computed(() => {
  return props.disabled ? false : unref(props.open);
});

// Mount container
const createMountContainer = () => {
  if (!isClient) {
    return null;
  }
  if (container.value && !container.value.parentNode) {
    parent = getParent(props.getPopupContainer, triggerRef.value);
    if (parent) {
      parent.appendChild(container.value);
    }
  }
};

onBeforeMount(() => {
  if (!isClient) {
    return null;
  }
  if (!container.value) {
    container.value = document.createElement("div");
    // Change to Teleport
    isSSR.value = false;
  }
});

onMounted(() => {
  // 如果persistent为true代表，页面加载出来了就需要创建节点。否则就是根据open的值动态添加 删除节点
  if (props.persistent) {
    createMountContainer();
  }
});

onBeforeUnmount(() => {
  isDestroyed.value = true;

  if (parent && parent?.contains(container.value)) {
    parent.removeChild(container.value);
  }
});

// When the element has been removed from the DOM
const onAfterLeave = (e) => {
  emit("hide", e);
};

// Called when the transition is complete
const onAfterShow = (e) => {
  emit("show", e);
};

watch(
  () => unref(shouldShow),
  (val) => {
    // 如果persistent为false,代表打开时就需要创建节点，关闭时，就需要销毁节点
    if (!props.persistent) {
      timer && clearTimeout(timer);
      if (val) {
        createMountContainer();
        nextTick(() => {
          forceUpdate();
        });
      } else {
        timer = setTimeout(() => {
          if (parent && parent?.contains(container.value)) {
            parent.removeChild(container.value);
          }
        }, 300);
      }
    }
  },
  // 设置 flush: 'post' 将会使侦听器延迟到组件渲染之后再执行
  { flush: "post" }
);

const updatePopper = () => update();

defineExpose({
  /** popperjs instance */
  popperInstanceRef: instanceRef,
  /** updatePopper */
  updatePopper
});
</script>
