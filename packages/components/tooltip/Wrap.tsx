/*
 * @Date: 2024-08-25 11:15:58
 * @Description: Modify here please
 */

import React, { useRef, useImperativeHandle } from "react";
import type { ITooltipWrapProps } from "./wrap-type";
import { TooltipContext, TooltipWrapInjectionContext } from "./utils";

interface WrapRef extends TooltipWrapInjectionContext {}

const TooltipWrap = React.forwardRef<WrapRef, ITooltipWrapProps>((props, ref) => {
  const { children, role } = props;

  const triggerRef = useRef<HTMLElement>();
  const popupRef = useRef<HTMLDivElement>();

  const tooltipProvides = {
    /**
     * @description triggerRef
     */
    triggerRef,
    /**
     * @description contentRef
     */
    popupRef,
    /** @description role */
    role
  } as TooltipWrapInjectionContext;

  useImperativeHandle(ref, () => tooltipProvides);

  return <TooltipContext.Provider value={{ ...tooltipProvides }}>{children}</TooltipContext.Provider>;
});

export default TooltipWrap;
