/*
 * @Date: 2023-12-25 15:06:32
 * @Description: Modify here please
 */
export interface ICheckboxProps {
  tag?: string;
  modelValue?: number | string | boolean;
  /** 在Checkbox组中使用时复选框的值 */
  label?: string | boolean | number | object;
  /** 设置不确定状态，只负责样式控制  */
  indeterminate?: boolean;
  /* 禁用 */
  disabled?: boolean;
  /** 是否需要波浪效果 */
  wave?: boolean;
  /** 原生name属性 */
  name?: string;
}

export interface CheckboxEmits {
  (e: "update:modelValue", value: any): void;
  (e: "change", value: any): void;
}

export interface ICheckboxGroupProps {
  tag?: string;
  modelValue?: Array<number | string | boolean>;
}
