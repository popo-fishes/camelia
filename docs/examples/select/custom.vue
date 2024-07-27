<!--
 * @Date: 2024-01-18 20:41:20
 * @Description: Modify here please
-->
<script setup lang="ts">
import { ref, computed } from "vue";
const options = [
  { label: "Drive My Car", value: "2" },
  { label: "Norwegian Wood", value: "3" },
  { label: "Nowhere Man", value: "15" },
  { label: "Think For Yourself", value: "16" },
  { label: "Drive My Car", value: "22" },
  { label: "Norwegian Wood", value: "23" },
  { label: "Nowhere Man", value: "52" },
  { label: "Think For Yourself", value: "62" }
];
const value = ref(null);
</script>

<template>
  <div class="mb-4">
    <fb-select v-model="value">
      <fb-option style="justify-content: space-between" v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
        <span>{{ item.label }}</span>
        <span style="color: #909399; font-size: 13px">{{ item.label }}{{ item.value }}</span>
      </fb-option>
    </fb-select>
  </div>
</template>
