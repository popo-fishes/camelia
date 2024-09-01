import React, { useContext, useMemo, useState, useRef, useImperativeHandle, useEffect } from "react";
import classNames from "classnames";
import { ConfigContext } from "../config-provider";
import { useNamespace } from "@camelia/core/hooks";
import { isBoolean } from "@camelia/shared/utils";

import { useDelayedToggle } from "./composables/use-delayed-toggle";
import { useClickUtside } from "./composables/use-click-utside";
import { composeEventHandlers, TooltipWrapInjectionContext } from "./utils";

import TooltipWrap from "./wrap";
import TooltipTrigger from "./trigger";
import TooltipPopup from "./popup";

import type { ITooltipProps, ITooltipRef } from "./tooltip-type";
import type { ITooltipPopupRef } from "./popup-type";

const Tooltip = React.forwardRef<ITooltipRef, ITooltipProps>((props, ref) => {
  const {
    /** There is no active control by default, it must be important */
    visible = null,
    role = "tooltip",
    trigger = "hover",
    effect = "dark",
    gpuAcceleration = false,
    destroyTooltipOnHide = false,
    showArrow = true,
    placement = "top",
    strategy = "absolute",
    disabled,
    children,
    title,
    offset,
    overlay,
    ...restProps
  } = props;

  const { getPrefixCls } = useContext(ConfigContext);
  const ns = useNamespace("tooltip", getPrefixCls());

  // 获取tooltip节点容器
  const tooltipRef = useRef<TooltipWrapInjectionContext>(null);
  // 下拉菜单的内容组件实例ref
  const popupComponentRef = useRef<ITooltipPopupRef>(null);

  // Pop up controller
  const [open, setOpen] = useState(false);

  /** Active control, no longer affected by trigger values */
  const controlled = useMemo(() => isBoolean(visible), [visible]);

  // Stop when controlling or disabling
  const stopWhenControlledOrDisabled = () => {
    if (controlled || disabled) {
      return true;
    }
  };

  // return 2 control methods
  const { onOpen, onClose } = useDelayedToggle({
    showAfterTime: restProps.showAfterTime,
    hideAfterTime: restProps.hideAfterTime,
    open: () => {
      setOpen(true);
    },
    close: () => {
      setOpen(false);
    }
  });

  const { start, stop } = useClickUtside(() => {
    //如果是外部控制则不执行
    if (controlled) return;
    // 如果不是hoover，则点击非弹窗区域就关闭弹窗
    if (trigger !== "hover") {
      onClose();
    }
  }, tooltipRef.current?.popupRef?.current);

  // Get Focus
  const onMouseenter = composeEventHandlers(stopWhenControlledOrDisabled, () => {
    if (trigger === "hover") {
      onOpen();
    }
  });
  // Lost Focus
  const onMouseleave = composeEventHandlers(stopWhenControlledOrDisabled, () => {
    if (trigger === "hover") {
      onClose();
    }
  });
  // When clicked
  const onClick = composeEventHandlers(stopWhenControlledOrDisabled, () => {
    if (trigger === "click") {
      if (open) {
        onClose();
      } else {
        onOpen();
      }
    }
  });

  // pop show
  const onContentShow = () => {
    restProps.onShow?.();
    // Start monitoring external clicks
    start();
  };

  // pop hide
  const onContentHide = () => {
    restProps.onHide?.();
  };

  const updatePopup = () => {
    const popupComponent = popupComponentRef.current;
    if (popupComponent) {
      popupComponent?.updatePopper();
    }
  };

  const isFocusInsideContent = (event?: FocusEvent) => {
    const popupContent: HTMLElement | undefined = tooltipRef.current?.popupRef?.current;
    // 相关目标
    const activeElement = (event?.relatedTarget as Node) || document.activeElement;
    // 当前节点目标是否在popupContent下拉菜单中
    return popupContent && popupContent.contains(activeElement);
  };

  /**
   *  When open is closed: stops listening for external clicks,
   * it actively uninstalls events
   */
  useEffect(() => {
    if (!open) {
      stop?.();
    }
  }, [open]);

  useEffect(() => {
    if (disabled && open) {
      setOpen(false);
    }
  }, [disabled, open]);

  useEffect(() => {
    if (isBoolean(visible)) {
      setOpen(visible);
    }
  }, [visible]);

  // =========================== Imperative ===========================
  useImperativeHandle(ref, () => ({
    /** tooltip component */
    tooltipRef,
    /** open Popup */
    onOpen,
    /** close Popup */
    onClose,
    /** update Popup */
    updatePopup,
    /** 验证当前焦点目标是--提示内容中的节点 */
    isFocusInsideContent
  }));

  const memoedOffset = useMemo(() => {
    if (showArrow) {
      return offset ?? 12;
    } else {
      return offset ?? 6;
    }
  }, [showArrow, offset]);

  const popupNode = useMemo<ITooltipProps["overlay"]>(() => {
    return overlay || title || null;
  }, [overlay, title]);

  return (
    <TooltipWrap ref={tooltipRef} role={role}>
      <TooltipTrigger onMouseEnter={onMouseenter} onMouseLeave={onMouseleave} onClick={onClick}>
        {children}
      </TooltipTrigger>
      <TooltipPopup
        ref={popupComponentRef}
        gpuAcceleration={gpuAcceleration}
        offset={memoedOffset}
        effect={effect}
        showArrow={showArrow}
        placement={placement}
        destroyTooltipOnHide={destroyTooltipOnHide}
        strategy={strategy}
        disabled={disabled}
        open={open}
        zIndex={restProps.zIndex}
        transitionName={restProps.transitionName}
        duration={restProps.duration}
        overlayClassName={classNames(restProps.overlayClassName, restProps.internalClassName || ns.b())}
        overlayStyle={restProps.overlayStyle}
        getPopupContainer={restProps.getPopupContainer}
        fallbackPlacements={restProps.fallbackPlacements}
        onMouseEnter={onMouseenter}
        onMouseLeave={onMouseleave}
        onShow={onContentShow}
        onHide={onContentHide}
      >
        {typeof popupNode === "function" ? popupNode() : popupNode}
      </TooltipPopup>
    </TooltipWrap>
  );
});

export default Tooltip;
