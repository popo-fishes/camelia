/*
 * @Date: 2023-12-19 12:25:31
 * @Description: Modify here please
 */
import type { MutableRefObject, ReactNode } from "react";
import type { ITooltipWrapProps } from "./wrap-type";
import type { ITooltipTriggerProps } from "./trigger-type";
import type { ITooltipPopupProps } from "./popup-type";
import type { TooltipWrapInjectionContext } from "./utils";

export interface ITooltipProps
  extends Omit<ITooltipWrapProps, "children">,
    Omit<ITooltipTriggerProps, "onMouseEnter" | "onMouseLeave" | "children">,
    Omit<ITooltipPopupProps, "onMouseEnter" | "onMouseLeave" | "onHide" | "onShow" | "children"> {
  /** !!! This is a trigger node, which does not need to be passed because it can be passed after the virtual node */
  children?: React.ReactNode;
  /** 主动控制，不在受trigger的值影响 */
  visible?: boolean | null;
  /** 提示文字节点 */
  title?: ReactNode | (() => ReactNode);
  /** 卡片内容节点 */
  overlay?: React.ReactNode | (() => ReactNode);
  /** 消失的延迟，以毫秒为单位 */
  hideAfterTime?: number;
  /** 出现延迟，以毫秒为单位 */
  showAfterTime?: number;
  /** 显示隐藏的回调 */
  onOpenChange?: (open: boolean) => void;
}

export interface ITooltipRef {
  /** tooltip Component */
  tooltipRef: MutableRefObject<TooltipWrapInjectionContext>;
  /** 获取popup的ref */
  popupRef: MutableRefObject<HTMLDivElement | undefined>;
  /** open Popup */
  onOpen: (time?: number) => void;
  /** close Popup */
  onClose: (time?: number) => void;
  /** update Popup */
  updatePopup: () => void;
  /** 验证当前焦点目标是--提示内容中的节点 */
  isFocusInsideContent: (event?: FocusEvent) => void;
}
