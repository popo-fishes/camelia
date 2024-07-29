/*
 * @Date: 2024-07-29 17:08:11
 * @Description: Modify here please
 */
import React, { useContext, useRef, useState, useImperativeHandle, useEffect, useMemo } from "react";
import { useTimeoutFn, useResizeObserver } from "@fish-remix/shared";
import { CircleClose, WarningFilled, CircleCheckFilled, CircleCloseFilled } from "fish-icons";
import { CSSTransition } from "react-transition-group";
import { ConfigContext } from "../config-provider";
import { getLastOffset } from "./instance";
import { useNamespace } from "@fish-remix/hooks";

import type { MessageRef, IMessageProps } from "./type";

const Message = React.forwardRef<MessageRef, IMessageProps>((props, ref) => {
  const {
    showClose = false,
    message,
    isHtml = false,
    id = "",
    zIndex = 500,
    duration = 3000,
    offset = 20,
    onClose
  } = props;

  const messageRef = useRef<HTMLDivElement>(null);

  const { getPrefixCls } = useContext(ConfigContext);

  const ns = useNamespace("message", getPrefixCls());

  const [visible, setVisible] = useState<boolean>(false);
  const [height, setHeight] = useState<number>(0);

  // 最后一个msg的位置
  const lastOffset = getLastOffset(id);

  // 当前msg的top值等于：当前距离顶部的偏移量 + 上一个距离顶部的top值
  const __offset = useMemo(() => offset + lastOffset, [offset, lastOffset]);

  const customStyle = useMemo<React.CSSProperties>(
    () => ({
      top: `${__offset}px`,
      zIndex: zIndex
    }),
    [__offset, zIndex]
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

  // 当前msg的位置：主要是为了下一个msg 获取 当前这个的位置。我们这里暴露下
  // 当前的就是当前的msg高度 + 现在的top值
  const bottom = height + __offset;

  // 时间到了就关闭
  const { start } = useTimeoutFn(
    () => {
      close();
    },
    duration,
    { immediate: false }
  );

  useResizeObserver(messageRef, (_) => {
    const h = messageRef.current?.getBoundingClientRect().height;
    setHeight(h || 0);
  });

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
    bottom,
    close
  }));

  return (
    <CSSTransition in={visible} timeout={300} classNames="ani-message-fade" appear={false} onExited={onClose}>
      <div style={customStyle} className={ns.b()} ref={messageRef}>
        {icon}
        {isHtml ? (
          <p className={ns.e("content")} dangerouslySetInnerHTML={{ __html: message }} />
        ) : (
          <p className={ns.e("content")}>{message}</p>
        )}
        {showClose && (
          <span onClick={close}>
            <CircleClose className="icon-close" />
          </span>
        )}
      </div>
    </CSSTransition>
  );
});

export default Message;
