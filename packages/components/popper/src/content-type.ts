/*
 * @Date: 2023-12-18 11:54:14
 * @Description: Modify here please
 */
import type { StyleValue } from "vue";
import type { Placement } from "@popperjs/core";

type ClassType = string | Record<string, boolean> | ClassType[];

export interface IPopperContentProps {
  // https://popper.js.org/docs/v2/modifiers/flip/#fallbackplacements
  fallbackPlacements?: Placement[];
  // https://popper.js.org/docs/v2/modifiers/compute-styles/#gpuacceleration
  gpuAcceleration?: boolean;
  // 偏移像素
  offset?: number;
  /**
   * https://popper.js.org/docs/v2/constructors/#options
   * 弹出位置? 你可以控制下拉菜单在触发对象节点上的某个位置弹出
   */
  placement?: Placement;
  /** 描述要使用的定位策略。默认情况下，它是absolute */
  strategy?: "fixed" | "absolute";
  /** 是否显示 */
  open?: boolean;
  /** 执行的动画 */
  transition?: string;
  /** 是否禁止  */
  disabled?: Boolean;
  /** 弹窗的自定义类名 */
  popperClass?: ClassType;
  /** 弹窗的style属性 */
  popperStyle?: StyleValue;
  /** 设置为 false 时, Popper会根据open的值动态添加 删除节点， 否则它只是被隐藏了  */
  persistent?: boolean;
  /** 弹窗层级 */
  zIndex?: number;
  /** 鼠标是否可进入到 popper 中 */
  enterable?: boolean;
  /** 菜单渲染父节点。默认渲染到 body 上 */
  getPopupContainer?: (el: any) => HTMLElement;
}

export const popperContentEmits = {
  mouseenter: (evt: MouseEvent) => evt instanceof MouseEvent,
  mouseleave: (evt: MouseEvent) => evt instanceof MouseEvent,
  hide: (e: any) => e,
  show: (e: any) => e
};
