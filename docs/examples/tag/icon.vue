<!--
 * @Date: 2024-02-03 15:18:40
 * @Description: Modify here please
-->
<script setup lang="ts">
import { PaperAirplane, CameraFilled } from "@fish-bubble/icons";
</script>

<template>
  <div style="display: flex" class="mb-4">
    <fb-tag color="#55acee" class="mr-4">
      <template #icon>
        <paper-airplane style="margin-right: 8px" />
      </template>
      Twitter
    </fb-tag>
    <fb-tag color="#3b5999" class="mr-4">
      <template #icon>
        <CameraFilled style="margin-right: 8px" />
      </template>
      Facebook
    </fb-tag>
    <fb-tag class="mr-4 customTagColor">customTagColor</fb-tag>
    <fb-tag class="mr-4 customTagColor2">customTagColor</fb-tag>
  </div>
</template>

<style lang="scss">
.customTagColor {
  --fb-tag-text-color: #531dab !important;
  --fb-tag-bg-color: #f9f0ff !important;
  --fb-tag-border-color: #d3adf7 !important;
}

.customTagColor2 {
  color: #08979c !important;
  background-color: #e6fffb !important;
  border-color: #87e8de !important;
}
</style>
