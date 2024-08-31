import React, { useContext, useMemo, useState, useRef, useImperativeHandle, useEffect } from "react";
import classNames from "classnames";
import { ConfigContext } from "../config-provider";
import { useNamespace } from "@camelia/core/hooks";
import { useId } from "@camelia/core/hooks";
import { isBoolean } from "@camelia/shared/utils";

import { useDelayedToggle } from "./composables/use-delayed-toggle";
import { composeEventHandlers, TooltipWrapInjectionContext } from "./utils";

import TooltipWrap from "./wrap";
import TooltipTrigger from "./trigger";
import TooltipPopup from "./popup";

import type { ITooltipProps, ITooltipRef } from "./tooltip-type";

const Tooltip = React.forwardRef<ITooltipRef, ITooltipProps>((props, ref) => {
  const {
    role = "tooltip",
    trigger = "hover",
    gpuAcceleration = false,
    persistent = false,
    offset = 6,
    placement = "bottom",
    strategy = "absolute",
    disabled,
    children,
    /** There is no active control by default, it must be important */
    visible = null,
    ...restProps
  } = props;

  const { getPrefixCls } = useContext(ConfigContext);
  const ns = useNamespace("tooltip", getPrefixCls());

  const id = useId(ns.b());
  // 获取tooltip节点容器
  const tooltipRef = useRef<TooltipWrapInjectionContext>(null);
  // 下拉菜单的内容组件实例ref
  const popupRef = useRef<any>();

  // 停止手柄
  // let stopHandle: ReturnType<typeof onClickOutside>;

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
    // // 绑定单击外部
    // stopHandle = onClickOutside(
    //   computed(() => {
    //     return popupRef.value?.contentRef;
    //   }),
    //   // 点击的回调
    //   () => {
    //     //如果是外部控制则不执行
    //     if (unref(controlled)) return;
    //     // 如果不是hoover，则点击非弹窗区域就关闭弹窗
    //     if (unref(trigger) !== "hover") {
    //       onClose();
    //     }
    //   }
    // );
  };

  // pop hide
  const onContentHide = () => {
    restProps.onHide?.();
  };

  const updatePopup = () => {
    const popupComponent = popupRef.current;
    if (popupComponent) {
      popupComponent?.updatePopup();
    }
  };

  const isFocusInsideContent = (event?: FocusEvent) => {
    const popupContent: HTMLElement | undefined = tooltipRef.current?.popupRef?.current;
    // 相关目标
    const activeElement = (event?.relatedTarget as Node) || document.activeElement;
    // 当前节点目标是否在popupContent下拉菜单中
    return popupContent && popupContent.contains(activeElement);
  };

  // watch(
  //   () => unref(open),
  //   (val) => {
  //     if (!val) {
  //       stopHandle?.();
  //     }
  //   },
  //   // 设置 flush: 'post' 将会使侦听器延迟到组件渲染之后再执行
  //   { flush: "post" }
  // );

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

  const popupNode = "prompt text";

  return (
    <TooltipWrap ref={tooltipRef} role={role}>
      <TooltipTrigger onMouseEnter={onMouseenter} onMouseLeave={onMouseleave} onClick={onClick}>
        {children}
      </TooltipTrigger>
      <TooltipPopup
        ref={popupRef}
        gpuAcceleration={gpuAcceleration}
        offset={offset}
        placement={placement}
        persistent={persistent}
        strategy={strategy}
        disabled={disabled}
        open={open}
        id={id}
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
        {popupNode}
      </TooltipPopup>
    </TooltipWrap>
  );
});

export default Tooltip;
