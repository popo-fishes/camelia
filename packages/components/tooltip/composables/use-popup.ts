/*
 * @Date: 2023-11-23 13:35:43
 * @Description: Modify here please
 */
import { useContext, useMemo } from "react";
import type { Modifier } from "@popperjs/core";

import { isNumber } from "@camelia/shared/utils";
import { useZIndex, usePopper, IPartialOptions } from "@camelia/core/hooks";

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

export const usePopup = (props: ITooltipPopupProps) => {
  const { open, zIndex, placement, strategy, offset, gpuAcceleration, fallbackPlacements, overlayStyle } = props;

  const { popupRef, triggerRef, role } = useContext(TooltipContext);

  const { currentZIndex } = useZIndex();

  const contentZIndex = isNumber(zIndex) ? zIndex : currentZIndex;

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
        {
          name: "eventListeners",
          enabled: open
        } as Modifier<"eventListeners", any>
      ]
    };
  }, [placement, strategy, offset, gpuAcceleration, fallbackPlacements, open]);

  // pop
  const { attributes, styles, update, forceUpdate, instanceRef } = usePopper(triggerRef, popupRef, options);

  // 内容样式
  const popupStyle = { ...{ zIndex: contentZIndex }, ...styles, ...overlayStyle };

  // useEffect(() => {
  //   watch(
  //     () => unref(triggerRef)?.getBoundingClientRect(),
  //     () => {
  //       update();
  //     }
  //   );
  // }, [triggerRef.current]);

  return {
    popupRef,
    triggerRef,
    instanceRef,

    role,
    attributes,
    popupStyle,

    forceUpdate,
    update
  };
};
