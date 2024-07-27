<!--
 * @Date: 2024-01-17 10:30:41
 * @Description: Modify here please
-->
<script setup lang="ts">
import { ref, computed } from "vue";
interface Props {}
const props = withDefaults(defineProps<Props>(), {});
</script>

<template>
  <div class="homeBox">
    <div class="inner">
      <h1 class="title">Fish Bubble</h1>
      <p class="dec">为开发人员准备的基于Vue 3.0的桌面组件库</p>
      <img src="/home-banner.png" class="banner" />
      <div class="wrap">
        <p class="card-title">四大利器，为您保驾护航</p>
        <ul class="row">
          <li class="col-md-3">
            <div class="card-item">
              <img src="/guide.png" />
              <h3>文档</h3>
              <p>我们全面覆盖了 fish-bubble 的各个方面，为开发者提供明确的方向指导和深入的设计理念，旨在启发您的洞见，让您的开发之路如马踏平川般顺畅。</p>
            </div>
          </li>
          <li class="col-md-3">
            <div class="card-item">
              <img src="/components.png" />
              <h3>组件</h3>
              <p>我们的目标是以精简的代码实现功能，追求代码的简洁性和效率。</p>
            </div>
          </li>
          <li class="col-md-3">
            <div class="card-item">
              <img src="/js.png" />
              <h3>工具库</h3>
              <p>众多的精致小工具，宛如开发过程中的得力助手，随召随到，让您掌握神奇的飞镖，精准命中百步之外的目标。</p>
            </div>
          </li>
          <li class="col-md-3">
            <div class="card-item">
              <img src="/layout.png" />
              <h3>布局</h3>
              <p>我们汇集了大量常用页面和布局，旨在减轻开发者的重复负担，让您得以专心于逻辑的构建，以更少的努力实现更大的成效。</p>
            </div>
          </li>
        </ul>
      </div>
      <p style="padding: 100px 0 30px 0; text-align: center; color: #606266; font-size: 14px">
        Copyright 2024 Fish Bubble | <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank" style="color: #606266">蜀ICP备2020025971号-1</a>
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.homeBox {
  width: 100%;
  .inner {
    max-width: 1200px;
    margin: 0 auto;
    padding-top: 90px;
    text-align: center;

    .title {
      font-size: 48px;
      font-weight: 800;
      margin: 0;
      height: 60px;
      line-height: 60px;
      color: var(--text-color);
      font-family: Inter, sans-serif;
    }
    .dec {
      font-size: 16px;
      margin-top: 20px;
      color: var(--text-color-light);
    }
  }
  .wrap {
    overflow: hidden;
    .card-title {
      color: #303133;
      font-size: 24px;
      padding: 20px 0;
    }
  }
  .row {
    margin-right: -15px;
    margin-left: -15px;
    overflow: hidden;
    .col-md-3 {
      width: 25%;
      float: left;
      padding: 0 20px;
      box-sizing: border-box;
      .card-item {
        height: 390px;
        border: 1px solid #eaeefb;
        border-radius: 5px;
        -webkit-transition: bottom 0.4s;
        transition: bottom 0.4s;
        position: relative;
        bottom: 0;
        img {
          width: 160px;
          margin: 40px auto 20px;
        }
        h3 {
          color: #606266;
          font-size: 18px;
          font-weight: 400;
          line-height: 45px;
        }
        p {
          font-size: 14px;
          color: #909399;
          padding: 0 25px;
          margin-bottom: 40px;
        }
      }
    }
  }
}
</style>
