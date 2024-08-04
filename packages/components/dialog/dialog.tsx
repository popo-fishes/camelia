/*
 * @Date: 2024-08-03 22:09:25
 * @Description: Modify here please
 */
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";
import { ConfigContext } from "../config-provider";
import { useNamespace, useZIndex } from "@fish-remix/hooks";
import { Close } from "fish-icons";
import Visible from "../_internal/visible";
import { IDialogProps } from "./type";
import DialogOverlay from "./DialogOverlay";

const Dialog: React.FC<IDialogProps> = (props) => {
  const {
    top,
    open,
    children,
    mask = true,
    alignCenter = false,
    closeOnClickMask = true,
    showClose = true,
    lockScroll = true,
    destroyOnClose = true,
    overlayClass,
    className,
    width,
    onClose,
    afterClose,
    beforeClose
  } = props;
  const { getPrefixCls } = useContext(ConfigContext);

  const ns = useNamespace("dialog", getPrefixCls());

  const [animatedVisible, setAnimatedVisible] = useState<boolean>(false);

  const { currentZIndex } = useZIndex();

  const timeoutRef = useRef<number>();

  // dialog样式
  const dialogStyle = useMemo<React.CSSProperties>(() => {
    const style: React.CSSProperties = {};
    if (top) {
      style[`margin-top`] = top;
    }
    if (width) {
      style[`width`] = typeof width == "string" ? width : `${width}px`;
    }
    style[`display`] = animatedVisible ? "block" : "none";
    return style;
  }, [top, width, animatedVisible]);

  // 点击蒙层时
  const onMaskClick = (e: any) => {
    if (closeOnClickMask) {
      onHandleClose(e);
    }
  };

  // 关闭弹窗的方法
  const onHandleClose = (e) => {
    function hide(shouldCancel?: boolean) {
      if (shouldCancel) return;
      onClose?.(e as any);
    }
    // 关闭前的回调，会暂停 Dialog 的关闭. 回调函数内执行 done 参数方法的时候才是真正关闭对话框的时候.
    if (beforeClose) {
      beforeClose?.(hide);
    } else {
      onClose?.(e as any);
    }
  };

  // 弹窗元素已从 DOM 中移除时调用
  const onExited = () => {
    setAnimatedVisible(false);
    if (animatedVisible) {
      afterClose?.();
    }
  };

  useEffect(() => {
    if (open) {
      setAnimatedVisible(true);
    }
    // timeoutRef.current = requestAnimationFrame(() => {
    //   setAnimatedVisible(open);
    // });
  }, [open]);

  useEffect(
    () => () => {
      clearTimeout(timeoutRef.current);
    },
    []
  );

  return (
    <CSSTransition in={open && animatedVisible} timeout={300} classNames="dialog-fade" onExited={onExited}>
      <DialogOverlay
        mask={mask}
        overlayClass={overlayClass}
        zIndex={currentZIndex}
        style={{ display: animatedVisible ? "block" : "none" }}
        alignCenter={alignCenter}
        onClick={onMaskClick}
      >
        <div
          style={dialogStyle}
          role="dialog"
          className={classNames([ns.b(), ns.is("align-center", alignCenter), className])}
        >
          1<br />1<br />1 1<br />1<br />1 1<br />1<br />1 1<br />1<br />1
        </div>
      </DialogOverlay>
    </CSSTransition>
  );
};

export default Dialog;
