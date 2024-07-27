<!--
 * @Date: 2024-02-03 21:13:43
 * @Description: Modify here please
-->
<script setup lang="ts">
import { message } from "fish-bubble-design";

const open2 = () => {
  message.success({
    isHtml: true,
    message: "<span style='color: red'>This is a success message</span>"
  });
};
</script>

<template>
  <div>
    <fb-button plain @click="open2">success</fb-button>
  </div>
</template>
