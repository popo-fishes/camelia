<!--
 * @Date: 2024-01-18 19:29:46
 * @Description: Modify here please
-->
<script setup lang="ts">
import { shallowRef } from "vue";
import type { DefineComponent } from "vue";
import IconData from "./icons.json";
import * as Icons from "@fish-bubble/icons";

const datas = shallowRef<DefineComponent[]>([]);
const iconMap = new Map(Object.entries(Icons));

IconData.data.forEach((com, index) => {
  const icon = iconMap.get(com);
  if (icon) {
    datas.value.push(icon as any);
  }
});
</script>

<template>
  <div class="demo-icon-item">
    <ul class="demo-icon-list">
      <li v-for="(component, index) in datas" :key="'icon' + index" class="icon-item">
        <span class="demo-svg-icon">
          <component :is="component" :size="20" />
          <span class="icon-name">{{ component.name }}</span>
        </span>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.dark .icon-item {
  :hover {
    background-color: #2b2b2c;
  }
}
.demo-icon {
  &-item {
    margin-top: 24px;
    &:first-child {
      margin-top: 0;
    }
  }
  &-title {
    font-weight: 400;
    font-size: 18px;
    line-height: 26px;
  }
  &-list {
    overflow: hidden;
    list-style: none;
    padding: 0 !important;
    border-radius: 4px;
    display: grid;
    grid-template-columns: repeat(7, 1fr);

    .icon-item {
      text-align: center;
      height: 90px;
      font-size: 13px;
      margin-top: 0 !important;
      &:hover {
        background-color: #f2f6fc;
        .fb-icon {
          color: var(--brand-color-light);
        }
        color: var(--brand-color-light);
      }

      .demo-svg-icon {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
        cursor: pointer;

        .icon-name {
          margin-top: 8px;
        }
      }
    }
  }
}
</style>
