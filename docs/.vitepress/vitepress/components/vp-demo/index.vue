<template>
  <ClientOnly>
    <!-- danger here DO NOT USE INLINE SCRIPT TAG -->
    <p text="sm" v-html="decodedDescription" />
    <div class="example">
      <Example :path="path" />
      <div class="op-btns">
        <Copy :size="16" class="op-btn" @click="copyCode" />
        <CanSee :size="16" class="op-btn" @click="toggleSourceVisible()" />
      </div>
      <FbCollapseTransition>
        <SourceCode v-show="sourceVisible" :source="source" />
      </FbCollapseTransition>
      <Transition name="fb-zoom-in-top">
        <div v-show="sourceVisible" class="example-float-control" @click="toggleSourceVisible(false)">
          <Top :size="16" />
          <span>隐藏源代码</span>
        </div>
      </Transition>
    </div>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useClipboard, useToggle } from "@vueuse/core";
import { Copy, CanSee, Top } from "@fish-bubble/icons";
import { message } from "fish-bubble-design";

import Example from "./vp-example.vue";
import SourceCode from "./vp-source-code.vue";

const props = defineProps<{
  rawSource: string; // 源码
  source: string;
  path: string;
  description?: string;
}>();

const { copy, isSupported } = useClipboard({
  source: decodeURIComponent(props.rawSource),
  read: false
});

const [sourceVisible, toggleSourceVisible] = useToggle(false);

const decodedDescription = computed(() => decodeURIComponent(props.description!));

const copyCode = async () => {
  if (!isSupported) {
  }
  try {
    await copy();
    message.success("复制成功！");
  } catch (e: any) {}
};
</script>
<style lang="scss" scoped>
.example {
  border: 1px solid var(--border-color);
  border-radius: 4px;

  .m-0 {
    margin: 0;
  }
  .op-btns {
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 2.5rem;
    border-top: 1px solid var(--border-color);

    .op-btn {
      margin: 0 0.5rem;
      cursor: pointer;
      color: var(--text-color-lighter);
      transition: 0.2s;

      &.github a {
        transition: 0.2s;
        color: var(--text-color-lighter);

        &:hover {
          color: var(--text-color);
        }
      }
    }
  }

  &-float-control {
    display: flex;
    align-items: center;
    justify-content: center;
    border-top: 1px solid var(--border-color);
    height: 44px;
    box-sizing: border-box;
    background-color: var(--bg-color, #fff);
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    margin-top: -1px;
    color: #909399;
    cursor: pointer;
    position: sticky;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;
    span {
      font-size: 14px;
      margin-left: 10px;
    }

    &:hover {
      color: var(--fb-color-primary);
    }
  }
}
.dark .example-float-control {
  background-color: #141414 !important;
}
</style>
