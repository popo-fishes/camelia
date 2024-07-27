/*
 * @Date: 2023-12-25 09:54:16
 * @Description: Modify here please
 */
import type { CSSProperties } from "vue";
import type { ComponentSize } from "@fish-bubble-design/core";

export interface InputProps {
  modelValue?: string | number | null | undefined;
  /** 大小 */
  size?: ComponentSize;
  /** 类型原生 input 类型 | textarea */
  type?: string;
  /** 占位符 */
  placeholder?: string;
  /** 最大输入长度 */
  maxlength?: string | number;
  /** 是否自动获取焦点 */
  autofocus?: boolean;
  /** 校验当前的输入是否合法，如果返回 false 输入框便不会响应此次的输入 */
  allowInput?: (v: any) => boolean;
  /** 是否显示清除按钮 */
  clearable?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readonly?: boolean;
  /** input 元素或 textarea 元素的 style */
  inputStyle?: CSSProperties;
  /** 是否需要波浪效果 */
  wave?: boolean;
}

export type InputEmits = {
  (e: "update:modelValue", value: number | string): void;
  // 在 Input 值改变时触发
  (e: "input", value: number | string): void;
  // 仅当 modelValue 改变时，当输入框失去焦点或用户按Enter时触发
  (e: "change", value: number | string): void;
  (e: "focus", event: any): void;
  (e: "blur", event: any): void;
};
