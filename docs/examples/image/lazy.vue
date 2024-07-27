<!--
 * @Date: 2024-02-03 18:52:24
 * @Description: Modify here please
-->
<script setup lang="ts">
const urls = ["/img1.jpg", "/img2.webp", "/img3.webp", "/img4.webp"];
</script>

<template>
  <div :class="ss.image__lazy">
    <fb-image v-for="url in urls" :key="url" :class="ss.imge" :src="url" lazy />
  </div>
</template>

<style module="ss" lang="scss">
.image__lazy {
  height: 300px;
  overflow-y: auto;
  .imge {
    width: 200px;
    height: 200px;
    margin-bottom: 20px;
  }
}
</style>
