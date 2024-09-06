/*
 * @Date: 2024-08-25 14:09:59
 * @Description: Modify here please
 */
import React, { useContext, cloneElement } from "react";
import ResizeObserver from "rc-resize-observer";
import { TooltipContext } from "./utils";
import type { ITooltipTriggerProps } from "./trigger-type";

// fragment？
function isFragment(child: React.ReactNode): boolean {
  return child && React.isValidElement(child) && child.type === React.Fragment;
}

const TooltipRigger: React.FC<ITooltipTriggerProps & { onTargetResize: () => void; open: boolean }> = (props) => {
  const { children, open, onTargetResize, ...restProps } = props;
  const { triggerRef } = useContext(TooltipContext);

  const child = React.isValidElement(children) && !isFragment(children) ? children : <span>{children}</span>;

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
  const triggerNode = cloneElement(child, {
    ...passedProps,
    ref: triggerRef
  });

  return (
    <ResizeObserver disabled={!open} onResize={onTargetResize}>
      {triggerNode}
    </ResizeObserver>
  );
};

export default TooltipRigger;
