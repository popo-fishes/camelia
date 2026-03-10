/*
 * @Date: 2024-09-08 13:59:29
 * @Description: Modify here please
 */
import React, { useContext, useMemo, cloneElement, createRef } from "react";
import { ConfigContext } from "../config-provider";
import { useNamespace, KeyCode, composeRef } from "@camelia/core";
import type { ITooltipProps, ITooltipRef } from "../tooltip";
import Tooltip from "../tooltip";

export interface IPopoverProps extends ITooltipProps {
  title?: React.ReactNode | (() => React.ReactNode);
  content?: React.ReactNode | (() => React.ReactNode);
}

interface OverlayProps {
  prefixCls?: string;
  title?: React.ReactNode;
  content?: React.ReactNode;
}

const getRenderNode = <T extends IPopoverProps["title"]>(propValue?: T): React.ReactNode => {
  if (!propValue) {
    return null;
  }

  return typeof propValue === "function" ? propValue() : propValue;
};

const Overlay: React.FC<OverlayProps> = ({ title, content, prefixCls }) => {
  if (!title && !content) {
    return null;
  }
  return (
    <>
      {title && <div className={`${prefixCls}__title`}>{title}</div>}
      {content && <div className={`${prefixCls}__inner-content`}>{content}</div>}
    </>
  );
};

const Popover = React.forwardRef<ITooltipRef, IPopoverProps>((props, ref) => {
  const {
    title,
    content,
    virtualRef,
    overlayClassName,
    virtualTriggering,
    placement = "top",
    effect = "",
    trigger = "hover",
    children,
    destroyTooltipOnHide = false,
    overlayStyle = {},
    ...otherProps
  } = props;

  const { getPrefixCls } = useContext(ConfigContext);
  const ns = useNamespace("popover", getPrefixCls());

  const internalRef = createRef<ITooltipRef>();
  const PopoverRef = composeRef(ref, internalRef);

  // 动画类名
  const motionName = useMemo(() => {
    return otherProps.transitionName || `${getPrefixCls()}-zoom-big`;
  }, [otherProps.transitionName]);

  const titleNode = getRenderNode(title);
  const contentNode = getRenderNode(content);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.keyCode === KeyCode.ESC) {
      internalRef.current.onClose();
    }
  };

  const triggerChild =
    React.isValidElement(children) && !virtualTriggering
      ? cloneElement(children as any, {
          onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (React.isValidElement(children)) {
              children?.props.onKeyDown?.(e);
            }
            onKeyDown(e);
          }
        })
      : null;

  return (
    <Tooltip
      placement={placement}
      trigger={trigger}
      effect={effect}
      virtualTriggering={virtualTriggering}
      virtualRef={virtualRef}
      destroyTooltipOnHide={destroyTooltipOnHide}
      overlayStyle={overlayStyle}
      {...otherProps}
      internalClassName={ns.b()}
      overlayClassName={overlayClassName}
      ref={PopoverRef}
      overlay={titleNode || contentNode ? <Overlay prefixCls={ns.b()} title={titleNode} content={contentNode} /> : null}
      transitionName={motionName}
    >
      {triggerChild}
    </Tooltip>
  );
});

export default Popover;
