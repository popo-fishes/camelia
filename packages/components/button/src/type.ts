/*
 * @Date: 2024-01-06 10:42:26
 * @Description: Modify here please
 */
import type { ComponentSize } from "@fish-bubble-design/core";
export interface IButtonProps {
  /** 按钮节点元素 */
  tag?: string;
  /** 按钮类型 */
  type?: "" | "primary" | "success" | "warning" | "danger" | "default";
  /** 幽灵属性，使按钮背景透明 */
  ghost?: boolean;
  /** 确定它是否为普通按钮 */
  plain?: boolean;
  /** 按钮大小, 你还可以外面自己传递class自己修改按钮样式：如宽度 :class="$style.contactBtn" */
  size?: ComponentSize;
  /** 按钮的宽度， 因为有的地方按钮宽度不统一，其它都是一样的效果。所以添加一个width */
  width?: string | number;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否加载中, 不建议在非type为primary情况下使用，因为背景颜色冲突看不出效果； 你还可以插槽自定义 loading图标 */
  loading?: boolean;
  /** 是否需要波浪效果 */
  wave?: boolean;
}
