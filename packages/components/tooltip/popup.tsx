/*
 * @Date: 2024-08-25 15:30:03
 * @Description: Modify here please
 */
import React, { useContext, useMemo, useState, useEffect, useImperativeHandle } from "react";
import { CSSTransition } from "react-transition-group";

import Portal from "../_internal/portal";
import { ConfigContext } from "../config-provider";
import { getParent } from "./utils";
import { usePopup } from "./composables/use-popup";
import { ITooltipPopupProps, ITooltipPopupRef } from "./popup-type";

const TooltipPopup = React.forwardRef<ITooltipPopupRef, ITooltipPopupProps & { id: string }>((props, ref) => {
  const { children, open, persistent, transitionName, duration = 200, ...restProps } = props;

  const { popupRef, triggerRef, instanceRef, popupStyle, attributes, update, role, forceUpdate } = usePopup(props);

  const { getPrefixCls } = useContext(ConfigContext);

  const [animatedVisible, setAnimatedVisible] = useState<boolean>(open);

  useEffect(() => {
    if (open) {
      setAnimatedVisible(true);
    }
  }, [open]);

  // 动画类名
  const motionName = useMemo(() => {
    return transitionName || `${getPrefixCls()}-zoom-in-top`;
  }, [transitionName]);

  // When the element has been removed from the DOM
  const onAfterLeave = () => {
    // 等待动画结束才才改变状态
    setAnimatedVisible(false);
    requestAnimationFrame(() => {
      restProps.onHide?.();
    });
  };

  // Called when the transition is complete
  const onAfterShow = () => {
    restProps.onShow?.();
  };

  const updatePopper = () => update();

  const getContainer = () => {
    return getParent(props.getPopupContainer, triggerRef.current);
  };

  useImperativeHandle(ref, () => ({
    popperInstanceRef: instanceRef,
    updatePopper
  }));

  return (
    <Portal open={open || animatedVisible} autoDestroy={persistent} getContainer={getContainer}>
      <CSSTransition
        in={open && animatedVisible}
        nodeRef={popupRef}
        timeout={duration}
        classNames={motionName}
        onEnter={onAfterShow}
        onExited={onAfterLeave}
      >
        <div
          ref={popupRef}
          role={role}
          id={restProps.id}
          style={{ ...popupStyle } as any}
          className={restProps.overlayClassName}
          tabIndex={-1}
          onMouseEnter={(e) => restProps.onMouseEnter?.(e)}
          onMouseLeave={(e) => restProps.onMouseLeave?.(e)}
          {...attributes}
        >
          {children}
        </div>
      </CSSTransition>
    </Portal>
  );
});

export default TooltipPopup;
