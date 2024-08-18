/*
 * @Date: 2024-03-27 14:11:27
 * @Description: Modify here please
 */
import { useEffect, useRef } from "react";
import { getTargetElement, type BasicTarget } from "../_internal-utils/dom-target";

import { createEffectWithTarget } from "../_internal-utils/create-effect-with-target";

type DocumentEventKey = keyof DocumentEventMap;

const useEffectWithTarget = createEffectWithTarget(useEffect);

// 管理目标元素外点击事件的 Hook。
export function useClickAway<T extends Event = Event>(
  /** 操作者 */
  onClickAway: (e: T) => void,
  /** 目标dom */
  target: BasicTarget | BasicTarget[],
  /** 监听的事件 */
  eventName: DocumentEventKey = "click",
  /** 对内部事件侦听器使用捕获 (用来判断是捕获还是冒泡) */
  capture = true
) {
  const onClickAwayRef = useRef(onClickAway);
  onClickAwayRef.current = onClickAway;

  useEffectWithTarget(
    () => {
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

      eventNames.forEach((event) =>
        document.addEventListener(event, handler, {
          passive: true,
          capture
        })
      );

      return () => {
        eventNames.forEach((event) => document.removeEventListener(event, handler));
      };
    },
    [eventName, capture],
    target
  );
}
