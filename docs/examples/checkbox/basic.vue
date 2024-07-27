<!--
 * @Date: 2024-02-03 16:41:39
 * @Description: Modify here please
-->
<script setup lang="ts">
import { ref } from "vue";
const checked = ref(false);
const checked2 = ref(false);
</script>

<template>
  <div>
    <fb-checkbox v-model="checked">Checkbox</fb-checkbox>
    <fb-checkbox v-model="checked2" disabled label="Checkbox2" />
  </div>
</template>
