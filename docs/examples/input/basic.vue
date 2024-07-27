<!--
 * @Date: 2024-01-19 15:59:08
 * @Description: Modify here please
-->
<script setup lang="ts">
import { ref } from "vue";

const value = ref("hahahh");
</script>

<template>
  <div class="mb-4">
    <fb-input v-model:model-value="value" placeholder="基本的 input" clearable />
  </div>
</template>
