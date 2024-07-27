<!--
 * @Date: 2024-01-18 20:41:20
 * @Description: Modify here please
-->
<script setup lang="ts">
import { ref, onMounted } from "vue";

const value = ref("");

const list = ref<any[]>([
  { label: "a1a1a1a1", value: "1" },
  { label: "b1b1b1b1", value: "2" },
  { label: "c2c2c2c2", value: "3" },
  { label: "d2d2d2d2", value: "4", disabled: true },
  { label: "e3e3e3e3", value: "5" },
  { label: "f3f3f3f3", value: "6" },
  { label: "g4g4g4g4", value: "7", disabled: true },
  { label: "h4h4h4h4", value: "8" },
  { label: "i5i5i5i5", value: "9", disabled: true },
  { label: "j5j5j5j5", value: "10" }
]);

const options = ref<any>([]);

onMounted(() => {
  options.value = list.value.map((item) => {
    return { ...item };
  });
});

const filterMethod = (query) => {
  if (query) {
    options.value = list.value.filter((item) => {
      return item.label.toLowerCase().includes(query.toLowerCase());
    });
  } else {
    options.value = list.value.map((item) => {
      return { ...item };
    });
  }
};
</script>

<template>
  <div class="mb-4">
    <fb-select v-model="value" :options="options" placeholder="请输入" filterable :filter-method="filterMethod" style="width: 300px" />
  </div>
</template>
