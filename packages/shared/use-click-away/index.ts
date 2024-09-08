/*
 * @Date: 2024-09-01 14:11:27
 * @Description: Modify here please
 */
import { useEffect, useRef } from "react";
import { getTargetElement, type BasicTarget } from "../_internal-utils/dom-target";

import { createEffectWithTarget } from "../_internal-utils/create-effect-with-target";

type DocumentEventKey = keyof DocumentEventMap;

const useEffectWithTarget = createEffectWithTarget(useEffect);

type IOptions = {
  /** 监听的事件 */
  eventName?: DocumentEventKey;
  /** 是否开启监听 */
  enable?: boolean;
};

const defaultOptions = {
  eventName: "click",
  enable: true
};

// 管理目标元素外点击事件的 Hook。
export function useClickAway<T extends Event = Event>(
  /** 操作者 */
  onClickAway: (e: T) => void,
  /** 目标dom */
  target: BasicTarget | BasicTarget[],
  options?: IOptions
) {
  const onClickAwayRef = useRef(onClickAway);
  onClickAwayRef.current = onClickAway;
  const { eventName, enable } = { ...defaultOptions, ...options } as IOptions;

  useEffectWithTarget(
    () => {
      if (!enable) {
        return;
      }
      const handler = (event: any) => {
        const targets = Array.isArray(target) ? target : [target];
        if (
          targets.some((item) => {
            const targetElement = getTargetElement(item);
            return !targetElement || targetElement.contains(event.target);
          })
        ) {
          return;
        }
        onClickAwayRef.current(event);
      };

      const eventNames = Array.isArray(eventName) ? eventName : [eventName];

      eventNames.forEach((event) => document.addEventListener(event, handler));

      return () => {
        eventNames.forEach((event) => document.removeEventListener(event, handler));
      };
    },
    [eventName, enable],
    target
  );
}

export type { BasicTarget, IOptions };
