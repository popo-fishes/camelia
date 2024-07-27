<!-- eslint-disable no-console -->
<!--
 * @Date: 2024-01-19 15:59:08
 * @Description: Modify here please
-->
<script setup lang="ts">
import { ref } from "vue";

const value = ref(null);

const onChange = (v) => {
  console.log(v);
};

const onInput = (v) => {
  console.log("-----", v);
};

const onlyAllowNumber = (value) => {
  return !value || /^\d+$/.test(value);
};
</script>

<template>
  <div class="mb-4">
    <fb-input v-model="value" @change="onChange" @input="onInput" :allow-input="onlyAllowNumber" placeholder="只能输入数字" />
  </div>
</template>
