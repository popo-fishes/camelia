<!--
 * @Date: 2024-01-19 15:59:08
 * @Description: Modify here please
-->
<script setup lang="ts">
import { ref } from "vue";
import { Search } from "@fish-bubble/icons";

const value = ref(null);
</script>

<template>
  <div class="mb-4">
    <div class="custom-input-wrap">
      <!-- 前缀自己去写吧~~ -->
      <fb-input v-model="value" placeholder="基本的 input" />
      <!-- 后缀标签 -->
      <div class="suffix-wrap"><Search /></div>
    </div>
  </div>
</template>

<style lang="scss">
.custom-input-wrap {
  display: flex;
  .fb-input {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .suffix-wrap {
    height: auto;
    width: 50px;
    background-color: #f5f7fa;
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
    box-shadow:
      0 1px 0 0 var(--fb-color-info-light-3) inset,
      0 -1px 0 0 var(--fb-color-info-light-3) inset,
      -1px 0 0 0 var(--fb-color-info-light-3) inset;
  }
}
</style>
