/*
 * @Date: 2024-08-03 22:09:25
 * @Description: Modify here please
 */
import React, { useContext, useEffect, useState } from "react";
import { ConfigContext } from "../config-provider";
import { useNamespace } from "@fish-remix/hooks";
import type { IDialogProps } from "./type";
import Portal from "../_internal/portal";
import Dialog from "./dialog";

const DialogWrap: React.FC<IDialogProps> = (props) => {
  const { open, getContainer, destroyOnClose = true, afterClose, lockScroll = true } = props;
  const { getPrefixCls } = useContext(ConfigContext);

  const [animatedVisible, setAnimatedVisible] = useState<boolean>(open);

  const ns = useNamespace("dialog", getPrefixCls());

  useEffect(() => {
    if (open) {
      setAnimatedVisible(true);
    }
  }, [open]);

  // 关闭时销毁将删除包裹
  if (destroyOnClose && !animatedVisible) {
    return null;
  }

  return (
    <Portal
      open={open || animatedVisible}
      getContainer={getContainer}
      autoLock={lockScroll && (open || animatedVisible)}
      autoDestroy={false}
      bodyHiddenClass={ns.b("parent--hidden")}
    >
      <Dialog
        {...props}
        afterClose={() => {
          afterClose?.();
          // 等待动画结束才才改变状态
          setAnimatedVisible(false);
        }}
      />
    </Portal>
  );
};

export default DialogWrap;
