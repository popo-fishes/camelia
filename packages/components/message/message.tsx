/*
 * @Date: 2024-07-29 17:08:11
 * @Description: Modify here please
 */
import React, { useContext, useRef, useState, useImperativeHandle, useEffect, useMemo } from "react";
import { useTimeout } from "@fish-remix/shared";
import { CircleClose, WarningFilled, CircleCheckFilled, CircleCloseFilled } from "fish-icons";
import { CSSTransition } from "react-transition-group";
import { ConfigContext } from "../config-provider";
import { useNamespace } from "@fish-remix/hooks";

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
      info: <WarningFilled size="20px" color="#0092ff" />,
      success: <CircleCheckFilled size="20px" color="#06B578" />,
      warning: <WarningFilled size="20px" color="#FF8904" />,
      error: <CircleCloseFilled size="20px" color="#E8362E" />
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

  useImperativeHandle(ref, () => ({
    close
  }));

  return (
    <div className={ns.e("notice-wrapper")} id={id}>
      <CSSTransition in={visible} timeout={300} classNames="message-animation" onExited={onClose}>
        <div style={customStyle} className={ns.e("notice")} ref={messageRef}>
          {icon}
          {isHtml ? (
            <p className={ns.e("content")} dangerouslySetInnerHTML={{ __html: message }} />
          ) : (
            <p className={ns.e("content")}>{message}</p>
          )}
          {showClose && (
            <span onClick={close} className="icon-close">
              <CircleClose />
            </span>
          )}
        </div>
      </CSSTransition>
    </div>
  );
});

export default Message;
