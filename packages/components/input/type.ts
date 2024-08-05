/*
 * @Date: 2023-12-25 09:54:16
 * @Description: Modify here please
 */
import type { CSSProperties } from "react";
import type { ComponentSize } from "@fish-remix/core";

export interface InputProps {
  /** 输入内容 */
  value?: string | number | null | undefined;
  /** 大小 */
  size?: ComponentSize;
  /** 类型原生 input 类型 | textarea */
  type?: string;
  /** 占位符 */
  placeholder?: string;
  /** 最大输入长度 */
  maxLength?: number;
  /** 是否自动获取焦点 */
  autoFocus?: boolean;
  /** 是否显示清除按钮 */
  clearable?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readOnly?: boolean;
  /** 是否需要波浪效果 */
  wave?: boolean;
  /** 自定义className */
  className?: string;
  style?: CSSProperties;
  /** input 元素或 textarea 元素的 style */
  inputStyle?: CSSProperties;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  /** 校验当前的输入是否合法，如果返回 false 输入框便不会响应此次的输入 */
  allowInput?: (v: any) => boolean;
  onChange?: (v: string | number | null | undefined) => void;
  onClear?: () => void;
}

export interface InputRef {
  focus: () => Promise<void>;
  blur: () => void;
}
