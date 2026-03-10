/*
 * @Date: 2024-01-06 10:42:26
 * @Description: Modify here please
 */
import type { ComponentSize } from "@camelia/core";

export type ButtonHTMLType = "submit" | "button" | "reset";

type MergedHTMLAttributes = Omit<
  React.HTMLAttributes<HTMLElement> & React.ButtonHTMLAttributes<HTMLElement> & React.AnchorHTMLAttributes<HTMLElement>,
  "type"
>;

export interface IButtonProps extends MergedHTMLAttributes {
  /** 按钮类型 */
  type?: "" | "primary" | "success" | "warning" | "danger" | "default";
  /** 幽灵属性，使按钮背景透明 */
  ghost?: boolean;
  /** 确定它是否为普通按钮 */
  plain?: boolean;
  /** 按钮大小, 还可以外面传递className修改按钮样式 */
  size?: ComponentSize;
  /** 按钮的宽度， 因为有的地方按钮宽度不统一，其它都是一样的效果。所以添加一个width */
  width?: string | number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否加载中, 不建议在非type为primary情况下使用，因为背景颜色冲突看不出效果； */
  loading?: boolean;
  /** 按钮前面的图标 */
  icon?: React.ReactNode;
  /** 内容 */
  children?: React.ReactNode;
  /** 设置 button 原生的 type 值，可选值请参考 HTML 标准 */
  htmlType?: ButtonHTMLType;
  /** 自定义className */
  className?: string;
  /** 是否需要波浪效果 */
  isWave?: boolean;
}
