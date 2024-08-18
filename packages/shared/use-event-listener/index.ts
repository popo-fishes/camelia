/*
 * @Date: 2023-12-02 15:16:40
 * @Description: 轻松使用事件监听器
 */
import { defaultWindow } from "../utils";
import type { AnyFn } from "../utils";
import { getTargetElement } from "../_internal-utils/dom-target";
import type { BasicTarget } from "../_internal-utils/dom-target";

import { createEffectWithTarget } from "../_internal-utils/create-effect-with-target";
import { useEffect, useRef } from "react";

const useEffectWithTarget = createEffectWithTarget(useEffect);

export type Target = BasicTarget<HTMLElement | Element | Window | Document>;

type Options<T extends Target = Target> = {
  target?: T;
  capture?: boolean;
  once?: boolean;
  passive?: boolean;
  /** 是否开启监听 */
  enable?: boolean;
};

export function useEventListener(eventName: string, handler: AnyFn, options: Options): void;

export function useEventListener(eventName: string, handler: AnyFn, options: Options = {}) {
  const { enable = true } = options;

  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffectWithTarget(
    () => {
      if (!enable) {
        return;
      }

      const targetElement = getTargetElement(options.target, defaultWindow);
      if (!targetElement?.addEventListener) {
        return;
      }

      const eventListener = (event: Event) => {
        return handlerRef.current(event);
      };

      targetElement.addEventListener(eventName, eventListener, {
        capture: options.capture,
        once: options.once,
        passive: options.passive
      });

      return () => {
        targetElement.removeEventListener(eventName, eventListener, {
          capture: options.capture
        });
      };
    },
    [eventName, options.capture, options.once, options.passive, enable],
    options.target
  );
}
