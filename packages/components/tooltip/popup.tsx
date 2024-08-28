/*
 * @Date: 2024-08-25 15:30:03
 * @Description: Modify here please
 */
import React, { useContext, useMemo, useState, useRef, useImperativeHandle } from "react";
import { CSSTransition } from "react-transition-group";

import Portal from "../_internal/portal";

import { ConfigContext } from "../config-provider";
import { useNamespace } from "@camelia/core/hooks";
import { ITooltipPopupProps } from "./popup-type";

const TooltipPopup = React.forwardRef<any, ITooltipPopupProps & { id: string }>((props, ref) => {
  const { children, open, ...restProps } = props;

  // const { popupRef, triggerRef, instanceRef, contentStyle, contentClass, contentAttrs, update, role, forceUpdate } =
  //   usePopperContent(props);

  // When the element has been removed from the DOM
  const onAfterLeave = () => {
    restProps.onHide?.();
  };

  // Called when the transition is complete
  const onAfterShow = () => {
    restProps.onShow?.();
  };

  return (
    <Portal open={open} autoDestroy={false}>
      <CSSTransition in={open} timeout={260} classNames="dialog-fade" onExited={onAfterLeave}>
        <div
          // ref={popupRef}
          // role={role}
          // style={contentStyle}
          // className={contentClass}
          tabIndex={-1}
          onMouseEnter={(e) => restProps.onMouseEnter?.(e)}
          onMouseLeave={(e) => restProps.onMouseLeave?.(e)}
          // {...contentAttrs}
        >
          {children}
        </div>
      </CSSTransition>
    </Portal>
  );
});

export default TooltipPopup;
