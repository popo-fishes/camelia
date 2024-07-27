<!--
 * @Date: 2024-02-03 12:31:48
 * @Description: Modify here please
-->
<script setup lang="ts"></script>

<template>
  <div class="mb-4">
    <fb-tag class="mr-4"><a :class="ss.bslink" href="https://www.baidu.com" target="_blank">我是链接</a></fb-tag>
    <fb-tag class="mr-4" type="success">我是标签</fb-tag>
    <fb-tag class="mr-4" type="info">我是标签</fb-tag>
    <fb-tag class="mr-4" type="warning">我是标签</fb-tag>
    <fb-tag class="mr-4" type="danger">我是标签</fb-tag>
  </div>

  <div class="mb-4">
    <fb-tag class="mr-4" size="large">large</fb-tag>
    <fb-tag class="mr-4">default</fb-tag>
    <fb-tag class="mr-4" size="small">small</fb-tag>
  </div>
</template>

<style module="ss">
.bslink {
  text-decoration: none !important;
  color: inherit !important;
}
</style>
