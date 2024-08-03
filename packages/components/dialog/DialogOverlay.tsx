/*
 * @Date: 2024-08-03 22:09:25
 * @Description: Modify here please
 */
import React, { useContext, useMemo } from "react";
import classNames from "classnames";
import { ConfigContext } from "../config-provider";
import { useNamespace } from "@fish-remix/hooks";
import Visible from "../_internal/visible";

import { useSameTarget } from "./composables/use-same-target";

import type { IOverlayProps, IDialogProps } from "./type";

const DialogOverlay: React.FC<IOverlayProps & { alignCenter?: IDialogProps["alignCenter"] }> = (props) => {
  const { modal, zIndex, overlayClass, children, alignCenter, style } = props;
  const { getPrefixCls } = useContext(ConfigContext);

  const ns = useNamespace("dialog", getPrefixCls());

  // 蒙层点击事件
  const onModalClick = (e) => {
    props.onClick?.();
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

  return (
    <>
      <Visible visible={modal}>
        <div className={classNames(overlayClass, ns.e("overlay"))} style={{ zIndex, ...style }}>
          <div
            className={classNames(ns.e("overlay-dialog"))}
            onMouseDown={onMousedown}
            onMouseUp={onMouseup}
            onClick={onClick}
            style={overlayDialogStyle}
          >
            {children}
          </div>
        </div>
      </Visible>
      <Visible visible={!modal}>
        <div
          className={classNames(overlayClass || "")}
          style={{ zIndex, position: "fixed", top: "0px", right: "0px", bottom: "0px", left: "0px", ...style }}
        >
          <div
            className={classNames(ns.e("overlay-dialog"))}
            onMouseDown={onMousedown}
            onMouseUp={onMouseup}
            onClick={onClick}
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
