<!--
 * @Date: 2024-02-03 22:50:32
 * @Description: Modify here please
-->
<script setup lang="ts"></script>

<template>
  <fb-popper trigger="hover" :offset="10" :persistent="false" placement="top" :popper-class="ss['darkWrap']">
    <template #default>
      <fb-button class="m-2" plain>dark-top</fb-button>
    </template>
    <template #popup>
      <div :class="ss['content']">这就是内容</div>
      <span :class="ss['arrow']"></span>
    </template>
  </fb-popper>
  <fb-popper trigger="hover" :persistent="false" :offset="8" placement="bottom" :popper-class="ss['darkWrap']">
    <template #default>
      <fb-button class="m-2" plain>dark-bottom</fb-button>
    </template>
    <template #popup>
      <div :class="ss['content']">这就是内容</div>
      <span :class="[ss['arrow'], ss['arrow-bottom']]"></span>
    </template>
  </fb-popper>
</template>

<style module="ss" lang="scss">
.darkWrap {
  position: relative;
}
.content {
  padding: 8px 11px;
  background-color: rgb(48, 49, 51);
  color: white;
  border-radius: 4px;
  font-size: 13px;
  line-height: 20px;
}
.arrow {
  position: absolute;
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-bottom: 10px solid #303133;
  bottom: -7px;
  transform: rotate(180deg);
  left: calc(50% - 10px);
}
.arrow-bottom {
  transform: rotate(0) !important;
  bottom: 0 !important;
  top: -7px;
  left: calc(50% - 10px) !important;
}
</style>
