/*
 * @Date: 2023-11-23 13:35:43
 * @Description: Modify here please
 */
import { useContext, useEffect, useState, useMemo, useRef } from "react";
import {
  useFloating,
  offset as offsetFn,
  shift,
  flip,
  arrow,
  detectOverflow,
  autoUpdate
} from "@floating-ui/react-dom";

import { isNumber } from "@camelia/shared/utils";
import { useZIndex } from "@camelia/core/hooks";

import { TooltipContext } from "../utils";
import type { ITooltipPopupProps } from "../popup-type";

export const usePopup = (props: ITooltipPopupProps): any => {
  const { open, disabled, zIndex, placement, strategy, offset, overlayStyle, showArrow } = props;

  const { popupRef, triggerRef, role } = useContext(TooltipContext);

  const { currentZIndex } = useZIndex();

  const contentZIndex = isNumber(zIndex) ? zIndex : currentZIndex;

  const arrowRef = useRef<HTMLDivElement>(null);

  const [reference, setReference] = useState(null);
  const [floating, setFloating] = useState(null);

  // Monitor node updates
  useEffect(() => {
    if (triggerRef.current) {
      setReference(triggerRef.current);
    }
    if (popupRef.current) {
      setFloating(popupRef.current);
    }
  }, [triggerRef.current, popupRef.current]);

  /** detect Overflow */
  const middleware = {
    name: "middleware",
    async fn(state) {
      const overflow = await detectOverflow(state, {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      });
      return {};
    }
  };

  const {
    placement: popperPlacement,
    floatingStyles,
    middlewareData,
    elements,
    update
  } = useFloating({
    transform: false,
    placement: placement,
    strategy,
    middleware: [
      // Translate floating elements along the specified axis.
      offsetFn(offset ?? 6),
      // Move floating elements to keep them in the view.
      shift(),
      // Change the position of floating elements to keep them in the view.
      flip(),
      middleware,
      showArrow &&
        arrow({
          element: arrowRef
        })
    ],
    elements: {
      reference,
      floating
    }
  });

  /**
   * auto update
   * automatically updates the position of the floating element when necessary to ensure it stays anchored.
   */
  useEffect(() => {
    if (open && elements.reference && elements.floating) {
      const cleanup = autoUpdate(elements.reference, elements.floating, update);
      return cleanup;
    }
  }, [open, elements, update]);

  // arrow Style
  const arrowStyles = useMemo(() => {
    return {
      left: middlewareData.arrow?.x,
      top: middlewareData.arrow?.y
    };
  }, [middlewareData.arrow]);

  // popup Style
  const popupStyle = {
    ...floatingStyles,
    ...overlayStyle,
    ...{ zIndex: contentZIndex },
    display: !open || disabled ? "none" : ""
  };

  return {
    popupRef,
    triggerRef,
    arrowRef,

    attributes: {
      role,
      tabIndex: -1,
      "data-popper-placement": popperPlacement
    },
    popupStyle,
    arrowStyles,

    update
  };
};
