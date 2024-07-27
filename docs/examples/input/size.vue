<!--
 * @Date: 2024-01-18 20:41:20
 * @Description: Modify here please
-->
<script setup lang="ts">
import { ref } from "vue";

const value = ref(null);
</script>

<template>
  <div style="display: flex">
    <div class="mb-4 mr-4">
      <fb-input style="width: 200px" v-model="value" size="large" />
    </div>
    <div class="mb-4 mr-4">
      <fb-input style="width: 200px" v-model="value" />
    </div>
    <div class="mb-4 mr-4">
      <fb-input style="width: 200px" v-model="value" size="small" />
    </div>
  </div>
</template>
