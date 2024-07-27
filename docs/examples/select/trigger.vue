<!--
 * @Date: 2024-01-18 20:41:20
 * @Description: Modify here please
-->
<script setup lang="ts">
import { ref, computed } from "vue";
const options = [
  { label: "text 1", value: "2" },
  { label: "text 2", value: "3" },
  { label: "text 3", value: "15" },
  { label: "text 4", value: "16" },
  { label: "text 5", value: "22" }
];
const value = ref(null);
</script>

<template>
  <div class="mb-4">
    <fb-select v-model="value" style="width: fit-content" :options="options" trigger="hover">
      <template #trigger>
        <span style="cursor: #1c2025">text select</span>
      </template>
    </fb-select>
  </div>
</template>
