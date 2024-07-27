<!--
 * @Date: 2024-01-18 20:41:20
 * @Description: Modify here please
-->
<script setup lang="ts">
import { ref } from "vue";
const options = [
  { label: "a1a1a1a1", value: "1" },
  { label: "b1b1b1b1", value: "2" },
  { label: "c2c2c2c2", value: "3" },
  { label: "e3e3e3e3", value: "5" },
  { label: "f3f3f3f3", value: "6" },
  { label: "h4h4h4h4", value: "8" }
];
const value = ref([]);
const value2 = ref([]);
</script>

<template>
  <div class="mb-4">
    <fb-select v-model="value" :options="options" placeholder="present-mode：tag" multiple style="width: 300px" />
  </div>
  <div class="mb-4">
    <fb-select v-model="value2" :options="options" placeholder="present-mode：text" multiple style="width: 300px" present-mode="text" />
  </div>
</template>
