<!--
 * @Date: 2023-12-16 22:15:33
 * @Description: Modify here please
-->
<template>
  <li role="option" :id="id" v-show="visible" :class="containerKls" @click.stop="selectOptionClick">
    <slot>
      <span>{{ currentLabel }}</span>
    </slot>
  </li>
</template>

<script lang="ts" setup>
import { computed, unref, inject, getCurrentInstance, onBeforeUnmount, reactive, toRefs, nextTick, watch } from "vue";
import { useId } from "@fish-bubble-design/hooks";
import { isObject } from "@fish-bubble-design/shared";
import { isEqual } from "lodash-unified";
import { selectKey, escapeStringRegexp } from "./utils";
import type { IOption } from "./type";

defineOptions({
  name: "FbOption"
});

const props = defineProps<IOption>();

const id = useId();

const select = inject(selectKey);

const containerKls = computed(() => [
  "dropdown__item",
  {
    disabled: unref(props.disabled),
    selected: unref(itemSelected)
  }
]);

const states = reactive({
  visible: true
});

const { visible } = toRefs(states);

const vm = getCurrentInstance().proxy as any;

const updateOption = (query: string) => {
  const regexp = new RegExp(escapeStringRegexp(query), "i");
  states.visible = regexp.test(currentLabel.value as any);
};

const currentLabel = computed(() => {
  return props.label || (isObject(props.value) ? "" : props.value);
});

vm.updateOption = updateOption;

vm.currentLabel = currentLabel;

vm.visible = visible;

select.onOptionCreate(vm);

// 是否选中
const itemSelected = computed(() => {
  if (select.props.multiple) {
    return contains(select.props.modelValue as unknown[], props.value);
  } else {
    return contains([select.props.modelValue] as unknown[], props.value);
  }
});

const contains = (arr = [], target) => {
  if (!isObject(props.value)) {
    return arr && arr.includes(target);
  } else {
    // eslint-disable-next-line no-console
    console.error("Option value cannot be an object");
    return false;
  }
};

// 点击时
const selectOptionClick = () => {
  if (props.disabled !== true) {
    select.handleOptionSelect(vm);
  }
};

onBeforeUnmount(() => {
  const key = vm.value;
  const { selected } = select.states;
  const selectedOptions = select.props.multiple ? selected : [selected];
  const doesSelected = selectedOptions.some((item) => {
    return item.value === vm.value;
  });
  // 如果未选择该选项，请将其删除
  nextTick(() => {
    if (select.states.options.get(key) === vm && !doesSelected) {
      // console.log(key, 2);
      select.states.cachedOptions.delete(key);
    }
  });
  select.onOptionDestroy(key, vm);
});

watch(
  () => props.value,
  (val, oldVal) => {
    // 如果值变化了，则重新添加
    if (!isEqual(val, oldVal)) {
      select.onOptionDestroy(oldVal, vm);
      // console.log(val, 1);
      select.onOptionCreate(vm);
    }
  }
);
</script>
