import React, { useContext, useMemo, useState, useRef, useImperativeHandle, useEffect } from "react";
import classNames from "classnames";
import { ConfigContext } from "../config-provider";
import { useNamespace } from "@camelia/core/hooks";
import { isBoolean } from "@camelia/shared/utils";

import { useDelayedToggle } from "./composables/useDelayedToggle";
import { useClickUtside } from "./composables/useClickUtside";
import { composeEventHandlers, TooltipWrapInjectionContext } from "./utils";

import TooltipWrap from "./Wrap";
import TooltipTrigger from "./Trigger";
import TooltipPopup from "./Popup";

import type { ITooltipProps, ITooltipRef } from "./tooltip-type";
import type { ITooltipPopupRef } from "./popup-type";

const Tooltip = React.forwardRef<ITooltipRef, ITooltipProps>((props, ref) => {
  const {
    /** There is no active control by default, it must be important */
    visible = null,
    role = "tooltip",
    trigger = "hover",
    effect = "dark",
    destroyTooltipOnHide = true,
    showArrow = true,
    placement = "top",
    strategy = "absolute",
    disabled,
    children: TriggerNode,
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
    restProps.onOpenChange?.(true);
    /**
     * Start monitoring external clicks
     * !! if： When actively controlling pop outside, do not turn on monitoring
     */
    if (!stopWhenControlledOrDisabled()) {
      start();
    }
  };

  // pop hide
  const onContentHide = () => {
    restProps.onOpenChange?.(false);
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
    if (!open && !stopWhenControlledOrDisabled()) {
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
    /** 获取popup的ref */
    popupRef: tooltipRef.current?.popupRef,
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
      <TooltipTrigger
        open={open}
        virtualTriggering={restProps.virtualTriggering}
        virtualRef={restProps.virtualRef}
        onTargetResize={() => {
          updatePopup();
        }}
        onMouseEnter={onMouseenter}
        onMouseLeave={onMouseleave}
        onClick={onClick}
      >
        {TriggerNode}
      </TooltipTrigger>
      <TooltipPopup
        ref={popupComponentRef}
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
        overlayClassName={classNames(restProps.internalClassName || ns.b(), restProps.overlayClassName)}
        overlayStyle={restProps.overlayStyle}
        getPopupContainer={restProps.getPopupContainer}
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
