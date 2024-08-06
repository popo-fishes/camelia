/*
 * @Date: 2023-12-25 09:54:16
 * @Description: Modify here please
 */
import type { CSSProperties, ReactNode } from "react";
import type { ComponentSize } from "@fish-remix/core";

export interface InputProps {
  /** 输入内容 */
  value?: string;
  /** 大小 */
  size?: ComponentSize;
  /** 类型原生 input 类型 */
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
  /** 自定义外层className */
  className?: string;
  /** 自定义外层style */
  style?: CSSProperties;
  /** input 元素的 style */
  inputStyle?: CSSProperties;
  /** 带有前缀图标的 input */
  prefix?: ReactNode;
  /** 带有后缀图标的 input */
  suffix?: ReactNode;
  /** 校验当前的输入是否合法，如果返回 false 输入框便不会响应此次的输入 */
  allowInput?: (v: any) => boolean;
  /** 输入框内容变化时的回调 */
  onChange?: (v: string) => void;
  /** 按下清除按钮的回调 */
  onClear?: () => void;
  /** 按下回车的回调  */
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export interface InputRef {
  focus: () => Promise<void>;
  blur: () => void;
}

export interface ITextAreaProps {
  /** 输入内容 */
  value?: string;
  /** 占位符 */
  placeholder?: string;
  /** 最大输入长度 */
  maxLength?: number;
  /** 是否自动获取焦点 */
  autoFocus?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否只读 */
  readOnly?: boolean;
  /** 是否需要波浪效果 */
  wave?: boolean;
  /** 自定义外层className */
  className?: string;
  /** 自定义外层style */
  style?: CSSProperties;
  /** input 元素的 style */
  inputStyle?: CSSProperties;
  /** 校验当前的输入是否合法，如果返回 false 输入框便不会响应此次的输入 */
  allowInput?: (v: any) => boolean;
  /** 输入框内容变化时的回调 */
  onChange?: (v: string) => void;
  /** 按下回车的回调  */
  onPressEnter?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

export interface ITextAreaRef {
  focus: () => Promise<void>;
  blur: () => void;
}
