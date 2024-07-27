<!--
 * @Date: 2024-02-03 15:03:16
 * @Description: Modify here please
-->
<template>
  <fb-tag v-for="tag in tags" :key="tag.name" class="mr-4" @close="handleClose(tag)" closable :type="tag.type">
    {{ tag.name }}
  </fb-tag>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const tags = ref([
  { name: "Tag 1", type: "" },
  { name: "Tag 2", type: "success" },
  { name: "Tag 3", type: "info" },
  { name: "Tag 4", type: "warning" },
  { name: "Tag 5", type: "danger" }
]);

const handleClose = (tag) => {
  tags.value.splice(tags.value.indexOf(tag), 1);
};
</script>
