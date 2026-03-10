/*
 * @Date: 2024-09-01 15:16:40
 * @Description: 轻松使用事件监听器
 */
import { defaultWindow } from "../utils";
import type { AnyFn } from "../utils";
import { getTargetElement } from "../_internal-utils/getTargetElement";
import type { BasicTarget } from "../_internal-utils/getTargetElement";

import { createEffectWithTarget } from "../_internal-utils/createEffectWithTarget";
import { useEffect, useRef } from "react";

const useEffectWithTarget = createEffectWithTarget(useEffect);

export type Target = BasicTarget<HTMLElement | Element | Window | Document>;

type Options<T extends Target = Target> = {
  target?: T;
  /** capture：布尔值，指定事件是否在捕获或冒泡阶段执行。默认为 */
  capture?: boolean;
  /** once：布尔值，指定监听器是否在触发一次后被自动移除。默认为 false。 */
  once?: boolean;
  /** passive：布尔值，当为 true 时，表示 listener 将不会调用 preventDefault()。默认为 false。 */
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
        /**
         * Uninstalling must also be done during the capture phase
         * capture is required
         */
        targetElement.removeEventListener(eventName, eventListener, {
          capture: options.capture
        });
      };
    },
    [eventName, options.capture, options.once, options.passive, enable],
    options.target
  );
}
