<!--
 * @Date: 2024-02-03 22:50:32
 * @Description: Modify here please
-->
<script setup lang="ts"></script>

<template>
  <fb-popper trigger="hover" :persistent="false" :offset="5" :popper-style="{ width: '200px' }">
    <template #default>
      <fb-button class="m-2" plain>Hover to activate</fb-button>
    </template>
    <template #popup>
      <div :class="ss['popover']">
        <div :class="ss['title']">Title</div>
        <div :class="ss['content']">这就是内容，这就是内容，这就是内容</div>
      </div>
    </template>
  </fb-popper>
  <fb-popper trigger="click" :persistent="false" :offset="5" :popper-style="{ width: '200px' }">
    <template #default>
      <fb-button class="m-2" plain>click to activate</fb-button>
    </template>
    <template #popup>
      <div :class="ss['popover']">
        <div :class="ss['title']">Title</div>
        <div :class="ss['content']">这就是内容，这就是内容，这就是内容</div>
      </div>
    </template>
  </fb-popper>
</template>

<style module="ss" lang="scss">
.popover {
  padding: 12px;
  background-color: white;
  border: 1px solid #e4e7ed;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  .title {
    color: #303133;
    font-size: 16px;
    margin-bottom: 12px;
  }
  .content {
    color: #606266;
    font-size: 14px;
  }
}
</style>
