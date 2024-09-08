/*
 * @Date: 2024-08-25 15:30:03
 * @Description: Modify here please
 */
import React, { useContext, useMemo, useState, useEffect, useImperativeHandle, useCallback } from "react";
import { CSSTransition } from "react-transition-group";
import { useNamespace, useId } from "@camelia/core/hooks";

import Portal from "../_internal/portal";
import { ConfigContext } from "../config-provider";
import { getParent } from "./utils";
import { usePopup } from "./composables/use-popup";
import { ITooltipPopupProps, ITooltipPopupRef } from "./popup-type";
import classNames from "classnames";

const TooltipPopup = React.forwardRef<ITooltipPopupRef, ITooltipPopupProps>((props, ref) => {
  const {
    children,
    open,
    effect,
    showArrow,
    destroyTooltipOnHide,
    transitionName,
    duration = 200,
    ...restProps
  } = props;

  const [animatedVisible, setAnimatedVisible] = useState<boolean>(open);

  const { popupRef, triggerRef, arrowRef, popupStyle, arrowStyles, attributes, update } = usePopup({
    ...props,
    open: animatedVisible
  });

  const { getPrefixCls } = useContext(ConfigContext);
  const ns = useNamespace("popper", getPrefixCls());

  // Unique id value
  const id = useId(ns.b());

  useEffect(() => {
    if (open) {
      setAnimatedVisible(true);
    }
  }, [open]);

  // 动画类名
  const motionName = useMemo(() => {
    return transitionName || `${getPrefixCls()}-zoom-big-fast`;
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

  const getContainer = useCallback(() => {
    return getParent(props.getPopupContainer, triggerRef.current);
  }, [props.getPopupContainer, triggerRef.current]);

  const contentClass = [ns.b(), ns.is(effect), props.overlayClassName];

  useImperativeHandle(ref, () => ({
    updatePopper
  }));

  return (
    <Portal open={open || animatedVisible} autoDestroy={destroyTooltipOnHide} getContainer={getContainer}>
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
          style={{ ...popupStyle } as any}
          className={classNames(contentClass)}
          onMouseEnter={(e) => restProps.onMouseEnter?.(e)}
          onMouseLeave={(e) => restProps.onMouseLeave?.(e)}
          {...{ ...attributes, id }}
        >
          <div className={ns.e("content")}>{children}</div>
          {showArrow && <div className={ns.e("arrow")} data-popper-arrow ref={arrowRef} style={{ ...arrowStyles }} />}
        </div>
      </CSSTransition>
    </Portal>
  );
});

export default TooltipPopup;
