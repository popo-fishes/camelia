/*
 * @Date: 2024-08-03 22:09:25
 * @Description: Modify here please
 */
import React, { useContext, useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";
import { ConfigContext } from "../config-provider";
import { useNamespace, useZIndex } from "@fish-remix/hooks";
import { Close as CloseIcon } from "fish-icons";
import Visible from "../_internal/visible";
import type { IDialogProps } from "./type";
import DialogOverlay from "./dialog-overlay";

const Dialog: React.FC<IDialogProps> = (props) => {
  const {
    top,
    width,
    open,
    mask = true,
    alignCenter = false,
    closeOnClickMask = true,
    showClose = true,
    zIndex,
    overlayClass,
    title,
    className,
    // 内容区
    header,
    children,
    footer,
    // 事件
    onClose,
    afterClose,
    beforeClose
  } = props;

  const { getPrefixCls } = useContext(ConfigContext);

  const ns = useNamespace("dialog", getPrefixCls());

  const [animatedVisible, setAnimatedVisible] = useState<boolean>(false);

  const { currentZIndex } = useZIndex();

  // dialog Style
  const dialogStyle = useMemo<React.CSSProperties>(() => {
    const style: React.CSSProperties = {};
    if (top) {
      style[`marginTop`] = top;
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
    // 等待动画结束才才改变状态
    setAnimatedVisible(false);
    if (animatedVisible) {
      afterClose?.();
    }
  };

  useEffect(() => {
    if (open) {
      setAnimatedVisible(true);
    }
  }, [open]);

  return (
    <CSSTransition in={open && animatedVisible} timeout={300} classNames="dialog-fade" onExited={onExited}>
      <DialogOverlay
        mask={mask}
        overlayClass={overlayClass}
        zIndex={zIndex || currentZIndex}
        style={{ display: animatedVisible ? "block" : "none" }}
        alignCenter={alignCenter}
        onClick={onMaskClick}
      >
        <div
          style={dialogStyle}
          role="dialog"
          className={classNames([ns.b(), ns.is("align-center", alignCenter), className])}
        >
          {/* 弹窗关闭按钮 */}
          <Visible visible={showClose}>
            <button className="closeIconbtn" onClick={onHandleClose}>
              <CloseIcon />
            </button>
          </Visible>
          {/* 头部 */}
          <header className={ns.e("header")}>{header || <p className="title">{title}</p>}</header>
          {/* 内容 */}
          <div className={ns.e("body")}>{children || "内容区，请使用插槽添加内容"}</div>
          {/* 底部 */}
          <Visible visible={footer}>
            <footer className={ns.e("footer")}>{footer}</footer>
          </Visible>
        </div>
      </DialogOverlay>
    </CSSTransition>
  );
};

export default Dialog;
