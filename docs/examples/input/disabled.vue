<!--
 * @Date: 2024-01-19 15:59:08
 * @Description: Modify here please
-->
<script setup lang="ts">
import { ref } from "vue";

const value = ref("我被禁用了");
</script>

<template>
  <div class="mb-4">
    <fb-input v-model="value" placeholder="基本的 input" disabled />
  </div>
</template>
