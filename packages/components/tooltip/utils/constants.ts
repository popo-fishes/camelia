/*
 * @Date: 2023-12-18 20:10:26
 * @Description: Modify here please
 */
import React from "react";
import type { MutableRefObject } from "react";

//  Tooltip相关
export type TooltipWrapInjectionContext = {
  /** 触发器 */
  triggerRef: MutableRefObject<HTMLElement | undefined>;
  /** popup */
  popupRef: MutableRefObject<HTMLDivElement | undefined>;
  role: string;
};

export const TooltipContext = React.createContext<TooltipWrapInjectionContext>({
  triggerRef: null,
  popupRef: null,
  role: ""
});
