<!-- eslint-disable no-console -->
<!--
 * @Date: 2024-02-03 16:41:39
 * @Description: Modify here please
-->
<script setup lang="ts">
import { ref } from "vue";

const checkList = ref(["Option2", "Option4"]);

const onChange = (v) => {
  console.log(v);
};
</script>

<template>
  <div>
    <fb-checkbox-group v-model="checkList" @change="onChange">
      <fb-checkbox label="Option1" />
      <fb-checkbox label="Option2" />
      <fb-checkbox label="Option3" />
      <fb-checkbox label="Option4" disabled />
      <fb-checkbox label="Option5" disabled />
    </fb-checkbox-group>
  </div>
</template>
