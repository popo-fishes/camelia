/*
 * @Date: 2024-08-04 22:23:58
 * @Description: Modify here please
 */
import React, { useContext, useEffect, useState, useImperativeHandle } from "react";
import { ConfigContext } from "../config-provider";
import { useNamespace } from "@camellia/core/hooks";
import Dialog from "@camellia/components/dialog";
import Button from "@camellia/components/button";
import Visible from "@camellia/components/_internal/visible";
import { Chat } from "fish-icons";

import type { IPromptProps, PromptRef } from "./type";

const Prompt = React.forwardRef<PromptRef, IPromptProps>((props, ref) => {
  const {
    title = "温馨提示",
    okText = "确认",
    cancelText = "取消",
    width = "440px",
    showClose = true,
    showIcon = true,
    /** 内容 */
    content,
    /** 打开弹窗 */
    open,
    icon,
    children,
    footer,
    onCancel,
    afterClose,
    onOk
  } = props;
  const { getPrefixCls } = useContext(ConfigContext);
  const ns = useNamespace("prompt", getPrefixCls());

  // 打开弹窗开关
  const [visible, setVisible] = useState<boolean>(false);

  // 弹窗关闭事件，只要弹窗被关闭了 都会触发。
  const onClose = () => {
    // 关闭弹窗
    setVisible(false);
    onCancel?.({ type: "notBtn" });
  };

  // 取消按钮事件
  const onCancelEvent = () => {
    // 关闭弹窗
    setVisible(false);
    // 标记是取消按钮关闭的
    onCancel?.({ type: "cancel" });
  };

  // 确定按钮事件
  const onConfirm = () => {
    // 关闭弹窗
    setVisible(false);
    // 抛出事件
    onOk?.();
  };

  useEffect(() => {
    setVisible(open);
  }, [open]);

  // 关闭
  function close() {
    setVisible(false);
  }

  useImperativeHandle(ref, () => ({
    close
  }));

  return (
    <Dialog
      open={visible}
      destroyOnClose
      showClose={showClose}
      onClose={onClose}
      afterClose={afterClose}
      width={width}
      top="25vh"
      className={ns.b()}
      header={
        <div className="cc-header">
          <Visible visible={showIcon}>{icon || <Chat className="chat-icon" />}</Visible>
          <p className="title">{title}</p>
        </div>
      }
      footer={
        <>
          {footer || (
            <div className="cc-footer">
              <Button plain onClick={onCancelEvent}>
                {cancelText}
              </Button>
              <Button type="primary" onClick={onConfirm}>
                {okText}
              </Button>
            </div>
          )}
        </>
      }
    >
      {children || <p className="dec" dangerouslySetInnerHTML={{ __html: content }} />}
    </Dialog>
  );
});

export default Prompt;
