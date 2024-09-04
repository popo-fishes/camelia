/*
 * @Date: 2023-11-23 13:35:43
 * @Description: Modify here please
 */
import { useContext, useEffect, useState, useMemo, useRef } from "react";
import type { Modifier } from "@popperjs/core";
import { useFloating, offset as offsetFn, shift, flip, arrow } from "@floating-ui/react-dom";

import { isNumber, isUndefined } from "@camelia/shared/utils";
import { useZIndex, usePopper, type IPartialOptions } from "@camelia/core/hooks";

import { TooltipContext } from "../utils";
import type { ITooltipPopupProps } from "../popup-type";

// 默认配置
function genModifiers(options: Pick<ITooltipPopupProps, "offset" | "gpuAcceleration" | "fallbackPlacements">) {
  const { offset, gpuAcceleration, fallbackPlacements } = options;
  return [
    {
      name: "offset",
      options: {
        offset: [0, offset ?? 6]
      }
    },
    // 防止溢出
    {
      name: "preventOverflow",
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    },
    {
      name: "flip",
      options: {
        padding: 5,
        fallbackPlacements
      }
    },
    {
      name: "computeStyles",
      options: {
        gpuAcceleration
      }
    }
  ];
}

const DEFAULT_ARROW_OFFSET = 5;

export const usePopup = (props: ITooltipPopupProps) => {
  const { open, disabled, zIndex, placement, strategy, offset, gpuAcceleration, fallbackPlacements, overlayStyle } =
    props;

  const { popupRef, triggerRef, role } = useContext(TooltipContext);

  const { currentZIndex } = useZIndex();

  const contentZIndex = isNumber(zIndex) ? zIndex : currentZIndex;

  const arrowRef = useRef<HTMLDivElement>(null);

  const [reference, setReference] = useState(null);
  const [floating, setFloating] = useState(null);

  const arrowModifier = useMemo(() => {
    const defaultOffset = DEFAULT_ARROW_OFFSET;
    return {
      name: "arrow",
      enabled: !isUndefined(arrowRef.current),
      options: {
        element: arrowRef.current,
        padding: defaultOffset
      }
    } as any;
  }, [arrowRef.current]);

  // https://popper.js.org/docs/v2/constructors/#options
  const options = useMemo<IPartialOptions>(() => {
    return {
      //  第一次更新后调用的函数
      onFirstUpdate: () => {
        update?.();
      },
      placement,
      strategy,
      modifiers: [
        ...genModifiers({ offset, gpuAcceleration, fallbackPlacements }),
        ...[
          arrowModifier,
          {
            name: "eventListeners",
            enabled: open
          } as Modifier<"eventListeners", any>
        ]
      ]
    };
  }, [placement, strategy, offset, gpuAcceleration, fallbackPlacements, open, arrowModifier]);

  // pop
  const { attributes, styles, update, forceUpdate, instanceRef } = usePopper(triggerRef, popupRef, options);

  // 监听节点更新
  useEffect(() => {
    if (triggerRef.current) {
      setReference(triggerRef.current);
    }
    if (popupRef.current) {
      setFloating(popupRef.current);
    }
  }, [triggerRef.current, popupRef.current]);

  const { floatingStyles, middlewareData } = useFloating({
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
      arrow({
        element: arrowRef
      })
    ],
    elements: {
      reference,
      floating
    }
  });

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

  // useEffect(() => {
  //   if (!disabled && open) {
  //     update?.();
  //   }
  // }, [open, disabled]);

  // useResizeObserver(triggerRef, (info) => {
  //   update?.();
  // });

  return {
    popupRef,
    triggerRef,
    arrowRef,
    instanceRef,

    role,
    attributes,
    popupStyle,
    arrowStyles,

    forceUpdate,
    update
  };
};
