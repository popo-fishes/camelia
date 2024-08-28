/*
 * @Date: 2023-12-19 12:25:31
 * @Description: Modify here please
 */
import type { MutableRefObject } from "react";
import type { ITooltipWrapProps } from "./wrap-type";
import type { ITooltipTriggerProps } from "./trigger-type";
import type { ITooltipPopupProps } from "./popup-type";
import type { TooltipWrapInjectionContext } from "./utils";

export interface ITooltipProps extends ITooltipWrapProps, ITooltipTriggerProps, ITooltipPopupProps {
  /** 主动控制，不在受trigger的值影响 */
  visible?: boolean | null;
  /** 消失的延迟，以毫秒为单位 */
  hideAfterTime?: number;
  /** 出现延迟，以毫秒为单位 */
  showAfterTime?: number;
}

export interface ITooltipRef {
  tooltipRef: MutableRefObject<TooltipWrapInjectionContext>;
  onOpen: (time?: number) => void;
  onClose: (time?: number) => void;
  updatePopup: () => void;
  isFocusInsideContent: (event?: FocusEvent) => void;
}
