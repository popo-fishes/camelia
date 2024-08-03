/*
 * @Date: 2024-08-03 22:09:25
 * @Description: Modify here please
 */
import React, { useContext, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";
import { ConfigContext } from "../config-provider";
import { useNamespace, useZIndex, useLockscreen } from "@fish-remix/hooks";
import { Close } from "fish-icons";
import Visible from "../_internal/visible";
import { IDialogProps } from "./type";
import { isFunction, isClient } from "@fish-remix/shared";
import DialogOverlay from "./DialogOverlay";

const Dialog: React.FC<IDialogProps> = (props) => {
  const {
    getContainer,
    children,
    modal = true,
    alignCenter = false,
    closeOnClickModal = false,
    showClose = true,
    lockScroll = true,
    overlayClass,
    className,
    width,
    top,
    open
  } = props;
  const { getPrefixCls } = useContext(ConfigContext);

  // 弹窗控制器
  const [visible, setVisible] = useState<boolean>(false);

  const ns = useNamespace("dialog", getPrefixCls());

  const { currentZIndex } = useZIndex();

  // dialog样式
  const dialogStyle = useMemo<React.CSSProperties>(() => {
    const style: React.CSSProperties = {};
    if (top) {
      style[`margin-top`] = top;
    }
    if (width) {
      style[`width`] = typeof width == "string" ? width : `${width}px`;
    }
    style[`display`] = visible ? "block" : "none";
    return style;
  }, [top, width, visible]);

  const portalNode = useMemo(() => {
    if (!isClient) return null;
    if (isFunction(getContainer)) {
      return getContainer();
    } else {
      return document.body;
    }
  }, [getContainer]);

  useLockscreen(visible && lockScroll, ns.b("parent--hidden"));

  const onModalClick = () => {
    if (closeOnClickModal) {
      onHandleClose();
    }
  };

  // 关闭弹窗的方法
  const onHandleClose = () => {
    function hide(shouldCancel?: boolean) {
      if (shouldCancel) return;
      setVisible(false);
    }
    // 关闭前的回调，会暂停 Dialog 的关闭. 回调函数内执行 done 参数方法的时候才是真正关闭对话框的时候.
    if (props?.beforeClose) {
      props?.beforeClose?.(hide);
    } else {
      setVisible(false);
    }
  };

  // 初始化
  useEffect(() => {
    if (open) {
      if (!isClient) return;
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (open) {
      if (!isClient) return;
      setVisible(true);
    } else {
      if (open) {
        setVisible(false);
      }
    }
  }, [open]);

  // 弹窗元素已从 DOM 中移除时调用
  const onExited = () => {
    props?.onClose();
  };

  const Modal = (
    <>
      <CSSTransition in={visible} timeout={300} classNames="dialog-fade" onExited={onExited}>
        <DialogOverlay
          modal={modal}
          overlayClass={overlayClass}
          zIndex={currentZIndex}
          style={{ display: visible ? "block" : "none" }}
          alignCenter={alignCenter}
          onClick={onModalClick}
        >
          <div
            style={dialogStyle}
            role="dialog"
            className={classNames([ns.b(), ns.is("align-center", alignCenter), className])}
          >
            111
          </div>
        </DialogOverlay>
      </CSSTransition>
    </>
  );

  return <>{createPortal(Modal, portalNode)}</>;
};

export default Dialog;
