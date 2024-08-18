/*
 * @Date: 2023-12-25 15:06:32
 * @Description: Modify here please
 */
export interface ICheckboxProps {
  /** 内容 */
  children: React.ReactNode;
  /** 指定当前是否选中 */
  checked?: boolean;
  /** 设置不确定状态，只负责样式控制  */
  indeterminate?: boolean;
  /* 禁用 */
  disabled?: boolean;
  /** 是否需要波浪效果 */
  wave?: boolean;
  /** 原生name属性 */
  name?: string;
  /** 值变化 */
  onChange?: (v: boolean) => void;
}

export interface ICheckboxGroupProps<T> {
  value?: T[];
  options?: (CheckboxOptionType<T> | string | number)[];
  /* 禁用 */
  disabled?: boolean;
  /** 值变化 */
  onChange?: (checkedValue: T[]) => void;
  children?: React.ReactNode;
}

export interface CheckboxOptionType<T> {
  label: React.ReactNode;
  value: T;
  disabled?: boolean;
}

export type IcheckboxValueType = string | number | boolean;
