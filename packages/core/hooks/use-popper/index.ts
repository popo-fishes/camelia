/*
 * @Date: 2024-01-11 18:55:38
 * @Description: Modify here please
 */
import { useRef, useEffect, useMemo, useState } from "react";
import { createPopper } from "@popperjs/core";
import { useUnmount } from "@camelia/shared";
import type { MutableRefObject } from "react";
import type { Instance, Modifier, Options, VirtualElement } from "@popperjs/core";

type ElementType = HTMLElement | undefined;
type ReferenceElement = ElementType | VirtualElement;

export type IPartialOptions = Partial<Options>;

export const usePopper = (
  referenceElementRef: MutableRefObject<ReferenceElement>,
  popupElement: MutableRefObject<ElementType>,
  opts = {} as IPartialOptions
) => {
  // 实例
  const instanceRef = useRef<Instance | undefined>();

  const [states, setState] = useState({
    styles: {
      position: "absolute",
      left: "0",
      top: "0"
    },
    arrowStyles: {
      position: "absolute"
    },
    attributes: {}
  });

  // https://popper.js.org/docs/v2/modifiers/#custom-modifiers
  const stateUpdater = {
    name: "updateState",
    enabled: true,
    phase: "write",
    fn: ({ state }) => {
      setState({
        styles: state.styles.popper as any,
        arrowStyles: state.styles.arrow as any,
        attributes: state.attributes.popper as any
      });
    },
    requires: ["computeStyles"]
  } as Modifier<"updateState", any>;

  // https://popper.js.org/docs/v2/constructors/#options
  const options = useMemo<Options>(() => {
    const { onFirstUpdate, placement, strategy, modifiers } = opts;
    return {
      onFirstUpdate,
      placement: placement || "bottom",
      strategy: strategy || "absolute",
      modifiers: [...(modifiers || []), stateUpdater, { name: "applyStyles", enabled: false }]
    };
  }, [opts]);

  // destroy
  const destroy = () => {
    if (!instanceRef.current) return;

    instanceRef.current.destroy();
    instanceRef.current = undefined;
  };

  useEffect(() => {
    const instance = instanceRef.current;
    if (instance) {
      instance.setOptions(options);
    }
  }, [instanceRef.current, options]);

  useEffect(() => {
    destroy();
    if (!referenceElementRef.current || !popupElement.current) return;
    // create Popper
    instanceRef.current = createPopper(referenceElementRef.current, popupElement.current, options);
  }, [referenceElementRef.current, popupElement.current]);

  useUnmount(() => {
    destroy();
  });

  return {
    styles: states.styles,
    attributes: states.attributes,
    arrowStyles: states.arrowStyles,
    // Popper 重新计算工具提示的位置 instanceRef.current.update()
    update: () => instanceRef.current?.update(),
    // 它用于强制更新 Popper 的位置，即使没有发生任何可能引起 Popper 位置变化的事件（如窗口大小改变，滚动等）
    forceUpdate: () => instanceRef.current?.forceUpdate(),
    // 实例
    instanceRef: instanceRef
  };
};
