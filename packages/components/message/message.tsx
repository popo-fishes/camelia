/*
 * @Date: 2024-07-29 17:08:11
 * @Description: Modify here please
 */
import React, { useContext, useRef, useState, useImperativeHandle, useEffect, useMemo } from "react";
import { useTimeout } from "@camelia/shared";
import { CircleClose, WarningFilled, CircleCheckFilled, CircleCloseFilled } from "fish-icons";
import { CSSTransition } from "react-transition-group";
import { ConfigContext } from "../config-provider";
import { useNamespace } from "@camelia/core/hooks";

import type { MessageRef, IMessageProps } from "./type";

const Message = React.forwardRef<MessageRef, IMessageProps>((props, ref) => {
  const { showClose = false, message, isHtml = false, id = "", duration = 3000, offset = 20, onClose } = props;

  const messageRef = useRef<HTMLDivElement>(null);

  const { getPrefixCls } = useContext(ConfigContext);

  const ns = useNamespace("message", getPrefixCls());

  const [visible, setVisible] = useState<boolean>(false);

  const customStyle = useMemo<React.CSSProperties>(
    () => ({
      marginTop: `${offset}px`
    }),
    [offset]
  );

  const icon: React.ReactNode = useMemo(() => {
    const iconMap = {
      info: <WarningFilled size="20px" color="#22cccc" />,
      success: <CircleCheckFilled size="20px" color="#00b96b" />,
      warning: <WarningFilled size="20px" color="#e6a23c" />,
      error: <CircleCloseFilled size="20px" color="#f56c6c" />
    };
    return props.icon || iconMap[props.type || "info"];
  }, [props.icon, props.type]);

  // 时间到了就关闭
  const { start } = useTimeout(
    () => {
      close();
    },
    duration,
    { immediate: false }
  );

  // 开启定时器
  function startTimer() {
    // 时间不存在，不关闭
    if (duration === 0) return;
    start();
  }

  useEffect(() => {
    startTimer();
    setVisible(true);
  }, []);

  // 关闭
  function close() {
    setVisible(false);
  }

  const onIconClose = (e: any) => {
    e?.stopPropagation();
    close();
  };

  const onExited = () => {
    requestAnimationFrame(() => {
      onClose?.();
    });
  };

  useImperativeHandle(ref, () => ({
    close
  }));

  return (
    <div className={ns.e("notice-wrapper")} id={id}>
      <CSSTransition nodeRef={messageRef} in={visible} timeout={300} classNames="message-animation" onExited={onExited}>
        <div style={customStyle} className={ns.e("notice")} ref={messageRef}>
          {icon}
          {isHtml ? (
            <p className={ns.e("content")} dangerouslySetInnerHTML={{ __html: message }} />
          ) : (
            <p className={ns.e("content")}>{message}</p>
          )}
          {showClose && <CircleClose onClick={onIconClose as any} className="icon-close" />}
        </div>
      </CSSTransition>
    </div>
  );
});

export default Message;
