<!--
 * @Date: 2024-02-03 21:02:34
 * @Description: Modify here please
-->
<script setup lang="ts">
import { message } from "fish-bubble-design";

const open1 = () => {
  message.info("this is a message.");
};
const open2 = () => {
  message.success("This is a success message");
};
const open3 = () => {
  message.warning("This is a warning message");
};
const open4 = () => {
  message.error("this is a error message.");
};
</script>

<template>
  <div>
    <fb-button plain @click="open2">success</fb-button>
    <fb-button plain @click="open3">warning</fb-button>
    <fb-button plain @click="open1">message</fb-button>
    <fb-button plain @click="open4">error</fb-button>
  </div>
</template>
