<!--
 * @Date: 2024-02-03 18:21:12
 * @Description: Modify here please
-->
<script setup lang="ts">
import { ref, reactive } from "vue";
import { message } from "fish-bubble-design";

// 图文验证码ref
const imgCaptchaRef = ref<any>(null);
// 表单
const formData = reactive({ codeImg: "" });

/** 输入图文验证码 */
const onChangeCodeImg = (value) => {
  /** 只能输入数字 */
  const newText = value.replace(/[^\d]+/, "");
  formData.codeImg = newText;
};

const onSubmit = () => {
  if (!!imgCaptchaRef.value && !imgCaptchaRef.value.validate(formData.codeImg)) {
    message.warning("请输入正确的图形验证码");
    return;
  }
};
</script>

<template>
  <div :class="ss.wrap">
    <fb-input size="large" @input="onChangeCodeImg" v-model="formData.codeImg" placeholder="请输入图形验证码" :maxlength="4" />
    <fb-img-captcha ref="imgCaptchaRef" :size="4" :class="ss.code" />
  </div>
  <div>
    <fb-button type="primary" @click="onSubmit">验证</fb-button>
  </div>
</template>

<style module="ss">
.wrap {
  position: relative;
  margin-bottom: 15px;
  .code {
    position: absolute;
    right: 12px;
    top: 5px;
  }
}
</style>
