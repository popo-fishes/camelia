<!--
 * @Date: 2024-02-03 16:41:39
 * @Description: Modify here please
-->
<script setup lang="ts">
import { ref } from "vue";

const checkAll = ref(false);

const isIndeterminate = ref(false);

const checkedvalue = ref();

const plainOptions = ["Apple", "Pear", "Orange"];

const handleCheckAllChange = (val: boolean) => {
  checkedvalue.value = val ? plainOptions : [];
  isIndeterminate.value = false;
};
const handleCheckedCitiesChange = (value: string[]) => {
  const checkedCount = value.length;
  // 全选是否选中
  checkAll.value = checkedCount === plainOptions.length;
  // 是否改变半选状态
  isIndeterminate.value = checkedCount > 0 && checkedCount < plainOptions.length;
};
</script>

<template>
  <div>
    <fb-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">Check all</fb-checkbox>
    <fb-checkbox-group v-model="checkedvalue" @change="handleCheckedCitiesChange">
      <fb-checkbox v-for="item in plainOptions" :key="item" :label="item" />
    </fb-checkbox-group>
  </div>
</template>
