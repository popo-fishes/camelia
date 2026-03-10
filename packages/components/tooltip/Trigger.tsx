/*
 * @Date: 2024-08-25 14:09:59
 * @Description: Modify here please
 */
import React, { useContext, cloneElement, useEffect } from "react";
import ResizeObserver from "rc-resize-observer";
import { TooltipContext } from "./utils";
import type { ITooltipTriggerProps } from "./trigger-type";

// fragment？
function isFragment(child: React.ReactNode): boolean {
  return child && React.isValidElement(child) && child.type === React.Fragment;
}

const TooltipTrigger: React.FC<ITooltipTriggerProps & { onTargetResize: () => void; open: boolean }> = (props) => {
  const { children, open, onTargetResize, virtualRef, virtualTriggering, ...restProps } = props;
  const { triggerRef } = useContext(TooltipContext);

  const isExistNode = React.isValidElement(children);

  const child = isExistNode && !isFragment(children) ? children : <span>{children}</span>;

  // Transfer props to cloneProps for use by the target node
  const passedProps: Record<string, any> = {};
  const passedEventList = ["onMouseEnter", "onMouseLeave", "onClick"];

  passedEventList.forEach((eventName) => {
    if (restProps[eventName]) {
      passedProps[eventName] = (...args: any[]) => {
        restProps[eventName](...args);
      };
    }
  });

  // Child Node
  const triggerNode = isExistNode
    ? cloneElement(child, {
        ...passedProps,
        ref: triggerRef
      })
    : null;

  /**
   * Replace trigger， To achieve triggering of different virtual elements
   * Unfortunately, it can only actively use “visible” outside to control Popup
   */
  useEffect(() => {
    // replace trigger
    if (virtualRef?.current && virtualTriggering) {
      triggerRef.current = virtualRef?.current;
    }
  }, [virtualRef?.current, virtualTriggering]);

  return (
    <>
      {isExistNode ? (
        <ResizeObserver disabled={!open} onResize={onTargetResize}>
          {triggerNode}
        </ResizeObserver>
      ) : null}
    </>
  );
};

export default TooltipTrigger;
