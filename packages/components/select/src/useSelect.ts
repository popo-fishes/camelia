/*
 * @Date: 2023-12-15 20:15:15
 * @Description: Modify here please
 */
import { ref, computed, useSlots, reactive, nextTick, watch, watchEffect, onMounted, unref } from "vue";
import { useResizeObserver, isArray, isFunction, useThrottleFn, isString, toRawType, isObject } from "@fish-bubble-design/shared";
import { useFocusController } from "@fish-bubble-design/hooks";
import { isEqual } from "lodash-unified";
import { useInput } from "./useInput";
import type { ISelectProps, ISelectEmits } from "./type";

export const useSelect = (props: ISelectProps, emit: ISelectEmits) => {
  const slots = useSlots();

  // 节点dom
  const calculatorRef = ref<HTMLElement>(null);
  const inputRef = ref<HTMLInputElement | null>(null);
  const menuRef = ref<HTMLElement>(null);
  const popperRef = ref<any>(null);

  // 状态
  const states = reactive({
    // 输入框的值
    inputValue: "",
    // 输入框先前查询的值
    previousQuery: null,
    // 选项列表
    options: new Map(),
    // 缓存选项列表
    cachedOptions: new Map(),
    // option选项的值
    optionValues: [] as any[],
    // 选中项
    selected: props.multiple ? [] : ({} as any),
    // 选中项label
    selectedLabel: "",
    // 是否获取焦点
    inputHovering: false,
    // 输入框的内容宽度
    calculatorWidth: 0,
    // 隐藏之前的控制变量
    isBeforeHide: false
  });

  // 控制展开菜单
  const expanded = ref(false);

  // 输入框事件hooks
  const { wrapperRef, isFocused, handleFocus, handleBlur } = useFocusController(inputRef, {
    beforeBlur(event) {
      // 是内容元素的焦点
      return popperRef.value?.isFocusInsideContent(event);
    },
    afterBlur() {
      expanded.value = false;
    }
  });

  // 输入框事件处理
  const { handleCompositionStart, handleCompositionEnd } = useInput((e) => onInput(e));

  // 是否存在自定义触发对象
  const isCustomTrigger = computed(() => {
    return !!slots.trigger;
  });

  // 禁止？
  const selectDisabled = computed(() => props.disabled);

  // 存在值
  const hasModelValue = computed(() => {
    return props.multiple
      ? isArray(props.modelValue) && props.modelValue.length > 0
      : props.modelValue !== undefined && props.modelValue !== null && props.modelValue !== "";
  });

  // 下拉菜单空数据文本判断
  const emptyText = computed(() => {
    if (props.loading) {
      return props.loadingText || "Loading";
    } else {
      // 如果是搜索时，输入框不存在值，且没有数据，就返回false,然后dropdownMenuVisible计算属性会用到。
      if (props.remote && !states.inputValue && states.options.size === 0) return false;
      // options.length > 0 && filteredOptionsCount筛选没有数据
      if (props.filterable && states.inputValue && states.options.size > 0 && filteredOptionsCount.value === 0) {
        return props.noMatchText || "No matching data";
      }
      if (states.options.size === 0) {
        return props.noDataText || "No data";
      }
    }
    return null;
  });

  // 是否可以清空选项
  const showClose = computed(() => {
    // 开启清除，获取焦点 ，存在值， selectDisabled
    const criteria = props.clearable && states.inputHovering && hasModelValue.value && !selectDisabled.value;
    return criteria;
  });

  // 选项的数组集合
  const optionsArray = computed(() => {
    // states.options变化时。optionsArray会自动更新
    const list = Array.from(states.options.values());
    const newList = [];
    // 根据optionValues查询出options
    states.optionValues.forEach((item) => {
      const index = list.findIndex((i) => i.value === item);
      if (index > -1) {
        newList.push(list[index]);
      }
    });
    return newList.length >= list.length ? newList : list;
  });

  // 缓存选项的数组集合
  const cachedOptionsArray = computed(() => Array.from(states.cachedOptions.values()));

  // 是否显示Placeholder
  const shouldShowPlaceholder = computed(() => {
    // 如果是多选，必须是modelValue没数据。输入框没值 才显示。因为这个时候显示的时tag节点。
    if (isArray(props.modelValue)) {
      return props.modelValue.length === 0 && !states.inputValue;
    }
    return props.filterable ? !states.inputValue : true;
  });

  // 显示的 placeholder | val 选择值
  const currentPlaceholder = computed(() => {
    const _placeholder = props.placeholder ?? "请选择";
    return props.multiple || !hasModelValue.value ? _placeholder : states.selectedLabel;
  });

  // 筛选的选项计数
  const filteredOptionsCount = computed(() => {
    return optionsArray.value.filter((option) => unref(option.visible)).length;
  });

  // 监听输入框的元素变化
  const resetCalculatorWidth = () => {
    states.calculatorWidth = calculatorRef.value.getBoundingClientRect().width;
  };

  useResizeObserver(calculatorRef, resetCalculatorWidth);

  // 下拉菜单控制变量
  const dropdownMenuVisible = computed({
    get() {
      return expanded.value && emptyText.value !== false;
    },
    set(val: boolean) {
      expanded.value = val;
    }
  });

  // tag列表
  const showTagList = computed(() => {
    if (!props.multiple) {
      return [];
    }
    return states.selected;
  });

  // 创建Option
  const onOptionCreate = (vm: any) => {
    states.options.set(vm.value, vm);
    states.cachedOptions.set(vm.value, vm);
  };

  // 卸载option
  const onOptionDestroy = (key, vm: any) => {
    if (states.options.get(key) === vm) {
      states.options.delete(key);
    }
  };

  // select元素获取焦点
  const onMouseenter = () => {
    states.inputHovering = true;
  };

  // select元素失去焦点
  const onMouseleave = () => {
    states.inputHovering = false;
  };

  // 输入框获取焦点
  const focus = () => {
    inputRef.value?.focus();
  };

  // 变化时
  const emitChange = (val) => {
    // 执行深比较来确定两者的值是否相等。
    if (!isEqual(props.modelValue, val)) {
      emit("change", val);
    }
  };

  // 获取索引
  const getValueIndex = (arr: any[] = [], value) => {
    if (!isObject(value)) {
      return arr.indexOf(value);
    } else {
      // eslint-disable-next-line no-console
      console.error("Option value cannot be an object");
      return -1;
    }
  };

  // 点击选择时
  const handleOptionSelect = (option) => {
    if (props.multiple) {
      const value = ((props.modelValue as any) || []).slice();
      const optionIndex = getValueIndex(value, option.value);
      if (optionIndex > -1) {
        value.splice(optionIndex, 1);
      } else if (props.multipleLimit <= 0 || value.length < props.multipleLimit) {
        value.push(option.value);
      }
      emit("update:modelValue", value);
      emitChange(value);
      // 如果是筛选 要不要清空输入框的值
      if (props.filterable && !props.reserveKeyword) {
        states.inputValue = "";
      }
    } else {
      emit("update:modelValue", option.value);
      emitChange(option.value);
      // 单选时关闭菜单
      expanded.value = false;
      // 如果是trigger == hover，就主动关闭菜单
      if (props.trigger == "hover") {
        popperRef.value?.onClose?.();
      }
    }
    // 获取焦点
    focus();
  };

  // 清除按钮方法
  const handleClearClick = () => {
    const value: string | any[] = props.multiple ? [] : "";
    // 把禁止项且选中了的添加进去
    if (!isString(value)) {
      for (const item of states.selected) {
        if (item.isDisabled) (value as any).push(item.value);
      }
    }
    emit("update:modelValue", value);
    emitChange(value);
    // 关闭菜单
    expanded.value = false;
    // 获取焦点
    focus();
  };

  // 切换Menu
  const toggleMenu = () => {
    if (selectDisabled.value) return;

    expanded.value = !expanded.value;
  };

  // 输入框事件
  const onInputChange = () => {
    if (states.inputValue.length > 0 && !expanded.value) {
      expanded.value = true;
    }
    handleQueryChange(states.inputValue);
  };

  // 输入框查询
  const handleQueryChange = (val: string) => {
    if (states.previousQuery === val) {
      return;
    }
    states.previousQuery = val;
    if (props.filterable && isFunction(props.filterMethod)) {
      props.filterMethod(val);
    } else if (props.filterable && props.remote && isFunction(props.remoteMethod)) {
      props.remoteMethod(val);
    }
  };

  // 输入框节流查询
  const debouncedOnInputChange = useThrottleFn(
    () => {
      onInputChange();
    },
    { wait: 500 }
  );

  // 输入口搜索事件
  const onInput = (event) => {
    states.inputValue = event.target.value;
    if (props.remote) {
      debouncedOnInputChange();
    } else {
      return onInputChange();
    }
  };

  // 点击删除tag时
  const onDeleteTag = (event, tag) => {
    const index = states.selected.indexOf(tag);
    if (index > -1 && !selectDisabled.value) {
      const value = (props.modelValue as any).slice();
      value.splice(index, 1);
      emit("update:modelValue", value);
      emitChange(value);
      emit("remove-tag", tag.value);
    }
    event.stopPropagation();
    focus();
  };

  // 更新Option
  const updateOptions = () => {
    if (props.filterable && isFunction(props.filterMethod)) return;
    if (props.filterable && props.remote && isFunction(props.remoteMethod)) return;
    optionsArray.value.forEach((option) => {
      option.updateOption(states.inputValue);
    });
  };

  // set selecte
  const setSelected = () => {
    if (!props.multiple) {
      const option = getOption(props.modelValue);
      states.selectedLabel = option.currentLabel;
      states.selected = option;
      return;
    } else {
      // 如果是多选就清空selectedLabel，多选展示的格式是tag标签
      states.selectedLabel = "";
    }
    const result: any[] = [];
    // 如果是多选就遍历查询
    if (isArray(props.modelValue)) {
      props.modelValue.forEach((value) => {
        result.push(getOption(value));
      });
    }
    states.selected = result;
  };

  const getOption = (value) => {
    let option: any;
    const isObjectValue = toRawType(value).toLowerCase() === "object";

    if (isObjectValue) {
      // eslint-disable-next-line no-console
      console.error("Option value cannot be an object");
      return { value, currentLabel: "" };
    }
    const isNull = toRawType(value).toLowerCase() === "null";
    const isUndefined = toRawType(value).toLowerCase() === "undefined";

    for (let i = states.cachedOptions.size - 1; i >= 0; i--) {
      const cachedOption = cachedOptionsArray.value[i];

      const isEqualValue = cachedOption.value === value;

      if (isEqualValue) {
        option = {
          value,
          // ！！cachedOption.currentLabel是一个响应对象，不能直接把cachedOption.currentLabel 赋值
          currentLabel: unref(cachedOption.currentLabel),
          isDisabled: cachedOption.disabled
        };
        break;
      }
    }

    if (option) return option;
    /// 没有从缓存中找到
    const label = !isNull && !isUndefined ? value : "";
    const newOption = {
      value,
      currentLabel: label
    };
    return newOption;
  };

  // 监听菜单控制器
  watch(
    () => expanded.value,
    (val) => {
      // console.log(val);
      // 打开时查询
      if (val) {
        handleQueryChange(states.inputValue);
      } else {
        // 清空值
        states.inputValue = "";
        states.previousQuery = null;
        states.isBeforeHide = true;
      }
      emit("visible-change", val);
    }
  );

  // 副作用监听器
  watchEffect(() => {
    // 任何事情都可能导致选项更改，然后更新选项
    // 所以每次打开弹窗之前你应该更新下拉菜单
    if (states.isBeforeHide) return;
    // 更新
    updateOptions();
  });

  watch(
    () => props.modelValue,
    (val, oldVal) => {
      if (props.multiple) {
        if (props.filterable && !props.reserveKeyword) {
          states.inputValue = "";
          handleQueryChange("");
        }
      }
      setSelected();
    },
    {
      flush: "post",
      deep: true
    }
  );

  onMounted(() => {
    setSelected();
  });

  const updateTooltip = () => {
    popperRef.value?.updatePopper?.();
  };

  useResizeObserver(menuRef, updateTooltip);
  useResizeObserver(wrapperRef, updateTooltip);

  return {
    states,
    wrapperRef,
    calculatorRef,
    inputRef,
    menuRef,
    popperRef,

    showClose,
    isCustomTrigger,
    shouldShowPlaceholder,

    onMouseenter,
    onMouseleave,
    handleOptionSelect,
    handleClearClick,
    onOptionDestroy,
    onOptionCreate,
    onDeleteTag,

    dropdownMenuVisible,
    expanded,
    hasModelValue,
    currentPlaceholder,
    selectDisabled,

    handleFocus,
    handleBlur,
    handleCompositionStart,
    handleCompositionEnd,
    onInput,
    isFocused,
    showTagList,
    emptyText,
    filteredOptionsCount,

    toggleMenu
  };
};
