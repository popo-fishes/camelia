/*
 * @Date: 2024-08-03 22:09:25
 * @Description: Modify here please
 */
import React, { useEffect, useState } from "react";
import type { IDialogProps } from "./type";
import Portal from "../_internal/portal";
import Dialog from "./dialog";

const DialogWrap: React.FC<IDialogProps> = (props) => {
  const { open, getContainer, destroyOnClose = false, afterClose, lockScroll = true } = props;

  const [animatedVisible, setAnimatedVisible] = useState<boolean>(open);

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
