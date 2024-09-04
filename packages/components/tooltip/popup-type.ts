/*
 * @Date: 2023-12-18 11:54:14
 * @Description: Modify here please
 */
import type { Placement } from "@floating-ui/react-dom";
import type { Instance } from "@popperjs/core";

export interface ITooltipPopupProps {
  children: React.ReactNode;
  /** https://popper.js.org/docs/v2/modifiers/flip/#fallbackplacements */
  fallbackPlacements?: Placement[];
  /** https://popper.js.org/docs/v2/modifiers/compute-styles/#gpuacceleration */
  gpuAcceleration?: boolean;
  /** 偏移像素 */
  offset?: number;
  /**
   * https://popper.js.org/docs/v2/constructors/#options
   * 弹出位置? 你可以控制下拉菜单在触发对象节点上的某个位置弹出
   */
  placement?: Placement;
  /** 描述要使用的定位策略。默认情况下，它是absolute */
  strategy?: "fixed" | "absolute";
  /** 主题 内置了 dark / light 两种 */
  effect?: string;
  /** 是否显示 */
  open?: boolean;
  /** 是否禁止  */
  disabled?: Boolean;
  /** 内部的类名 */
  internalClassName?: string;
  /** 卡片类名 */
  overlayClassName?: string;
  /** 卡片样式  */
  overlayStyle?: React.CSSProperties;
  /** 关闭后是否销毁 Tooltip  */
  destroyTooltipOnHide?: boolean;
  /** 弹窗层级 */
  zIndex?: number;
  /** 执行的动画的类名 */
  transitionName?: string;
  /** 执行动画的时长，当你需要自定义动画时，这个是很有用的 */
  duration?: number;
  /** 是否显示箭头 */
  showArrow?: boolean;
  /** 菜单渲染父节点。默认渲染到 body 上 */
  getPopupContainer?: (el: any) => HTMLElement;
  /** 显示时的回调 */
  onShow?: () => void;
  /** 隐藏时的回调 */
  onHide?: () => void;
  onMouseEnter?: (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  onMouseLeave?: (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export interface ITooltipPopupRef {
  /** popperjs instance */
  popperInstanceRef: React.MutableRefObject<Instance | undefined>;
  /** updatePopper */
  updatePopper: () => void;
}
