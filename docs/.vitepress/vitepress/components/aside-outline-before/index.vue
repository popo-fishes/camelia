<!--
 * @Date: 2024-01-17 19:43:01
 * @Description: 主要为了监听路由
-->
<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRoute } from "vitepress";
import { isClient } from "@fish-bubble-design/shared";

const route = useRoute();

function updateRoute() {
  if (isClient) {
    const appNode = document.getElementById("app");
    if (appNode) {
      const paths = route.path.split("/");
      const last = paths[paths.length - 1];
      const cls = last.split(".")[0];
      appNode.classList.forEach((className) => {
        appNode.classList.remove(className);
      });
      appNode.classList.add(cls + "-page-box");
    }
  }
}

onMounted(() => {
  updateRoute();
});

watch(
  () => route.path,
  () => {
    updateRoute();
  }
);
</script>

<template>
  <div></div>
</template>
