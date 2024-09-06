/*
 * @Date: 2024-08-03 22:09:25
 * @Description: Modify here please
 */
import React, { useContext, useMemo } from "react";
import classNames from "classnames";
import { ConfigContext } from "../config-provider";
import { useNamespace } from "@camelia/core/hooks";
import { KeyCode } from "@camelia/core";
import Visible from "../_internal/visible";

import { useSameTarget } from "./composables/use-same-target";

import type { IOverlayProps, IDialogProps } from "./type";

type RepeatOverlayProps = IOverlayProps & {
  alignCenter: IDialogProps["alignCenter"];
  keyboard: IDialogProps["keyboard"];
} & {
  nodeRef: React.MutableRefObject<HTMLDivElement>;
  /** 蒙层点击 */
  onClick: (e: React.MouseEventHandler<HTMLDivElement>) => void;
  /** esc按键关闭时 */
  onInternalClose: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  /** 内容 */
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const DialogOverlay: React.FC<RepeatOverlayProps> = (props) => {
  const { mask, zIndex, overlayClass, children, alignCenter, style, nodeRef, keyboard } = props;
  const { getPrefixCls } = useContext(ConfigContext);

  const ns = useNamespace("dialog", getPrefixCls());

  // 蒙层点击事件
  const onModalClick = (e) => {
    props.onClick?.(e);
  };

  // 点击事件
  const { onMousedown, onMouseup, onClick } = useSameTarget(onModalClick);

  // 弹窗外层的样式
  const overlayDialogStyle = useMemo<React.CSSProperties>(() => {
    // 垂直居中
    if (alignCenter) {
      return { display: "flex" };
    }
    return {};
  }, [alignCenter]);

  function onWrapperKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (keyboard && e.keyCode === KeyCode.ESC) {
      e.stopPropagation();
      props.onInternalClose?.(e);
      return;
    }
  }

  return (
    <>
      <Visible visible={mask}>
        <div className={classNames(overlayClass, ns.e("overlay"))} style={{ zIndex, ...style }} ref={nodeRef}>
          <div
            className={classNames(ns.e("overlay-dialog"))}
            onMouseDown={onMousedown}
            onMouseUp={onMouseup}
            onClick={onClick}
            tabIndex={-1}
            onKeyDown={onWrapperKeyDown}
            style={overlayDialogStyle}
          >
            {children}
          </div>
        </div>
      </Visible>
      <Visible visible={!mask}>
        <div
          className={classNames(overlayClass || "")}
          ref={nodeRef}
          style={{ zIndex, position: "fixed", top: "0px", right: "0px", bottom: "0px", left: "0px", ...style }}
        >
          <div
            className={classNames(ns.e("overlay-dialog"))}
            onMouseDown={onMousedown}
            onMouseUp={onMouseup}
            onClick={onClick}
            tabIndex={-1}
            onKeyDown={onWrapperKeyDown}
            style={overlayDialogStyle}
          >
            {children}
          </div>
        </div>
      </Visible>
    </>
  );
};

export default DialogOverlay;
