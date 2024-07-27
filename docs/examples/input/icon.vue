<!--
 * @Date: 2024-01-19 15:59:08
 * @Description: Modify here please
-->
<script setup lang="ts">
import { ref } from "vue";
import { DialOut, Invisible } from "@fish-bubble/icons";

const value = ref(null);
const value2 = ref(null);

const onlyAllowNumber = (value) => {
  return !value || /^\d+$/.test(value);
};
</script>

<template>
  <div class="mb-4">
    <fb-input v-model="value" type="number" clearable :allow-input="onlyAllowNumber">
      <template #prefix><span style="margin-right: 5px">￥</span></template>
      <template #suffix><span style="margin-left: 5px">RMB</span></template>
    </fb-input>
  </div>
  <div class="mb-4">
    <fb-input v-model="value2">
      <template #prefix>
        <DialOut style="margin-right: 5px" />
      </template>
      <template #suffix>
        <Invisible style="color: rgba(0, 0, 0, 0.45)" />
      </template>
    </fb-input>
  </div>
</template>
