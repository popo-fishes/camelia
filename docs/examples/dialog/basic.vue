<template>
  <fb-button plain @click="dialogVisible = true">Open Dialog</fb-button>

  <fb-dialog v-model:open="dialogVisible" title="Tips" width="500">
    <p>Some contents...</p>
    <p>Some contents...</p>
    <p>Some contents...</p>
    <template #footer>
      <div :class="ss['dialog-footer']">
        <fb-button plain @click="dialogVisible = false">Cancel</fb-button>
        <fb-button type="primary" @click="dialogVisible = false"> Confirm </fb-button>
      </div>
    </template>
  </fb-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const dialogVisible = ref(false);
</script>

<style module="ss">
.dialog-footer {
  display: flex;
  justify-content: flex-end;
}
</style>
