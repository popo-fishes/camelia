<script setup lang="ts"></script>

<template>
  <div>
    <fb-img-captcha />
    <p>你还可以传递size控制长度</p>
    <fb-img-captcha :width="130" :size="6" />
    <p>你还可以传递type类型: blend: 数字字母混合 number:纯数字 letter:纯字母</p>
    <div style="display: flex">
      <fb-img-captcha :width="100" :size="5" type="letter" style="margin-right: 20px" />
      <fb-img-captcha :width="100" :size="5" type="blend" />
    </div>
  </div>
</template>
