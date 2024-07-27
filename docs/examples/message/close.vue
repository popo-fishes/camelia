<!--
 * @Date: 2024-02-03 21:02:34
 * @Description: Modify here please
-->
<script setup lang="ts">
import { message } from "fish-bubble-design";

const open2 = () => {
  message.success({
    showClose: true,
    message: "This is a success message",
    duration: 3000
  });
};
</script>

<template>
  <div>
    <fb-button plain @click="open2">success</fb-button>
  </div>
</template>
