/*
 * @Date: 2024-03-27 14:11:27
 * @Description: Modify here please
 */
import { useEffect, useRef } from "react";
import { getTargetElement, type BasicTarget } from "../utils/domTarget";

type DocumentEventKey = keyof DocumentEventMap;

// 管理目标元素外点击事件的 Hook。
export default function useClickAway<T extends Event = Event>(
  /** 操作者 */
  onClickAway: (e: T) => void,
  /** 目标dom */
  target: BasicTarget | BasicTarget[],
  /** 监听的事件 */
  eventName: DocumentEventKey | DocumentEventKey[] = "click",
  /** 对内部事件侦听器使用捕获 (用来判断是捕获还是冒泡) */
  capture: boolean = true
) {
  const onClickAwayRef = useRef(onClickAway);

  useEffect(() => {
    const handler = (event: any) => {
      const targetArray = Array.isArray(target) ? target : [target];
      if (
        targetArray.some((item) => {
          // 拿到dom
          const targetElement = getTargetElement(item) as HTMLElement;
          // 目标dom不存在或者目标dom内含有触发事件的事件源的dom,则不执行
          return !targetElement || targetElement.contains(event.target);
        })
      ) {
        return;
      }

      onClickAwayRef.current(event);
    };

    document.addEventListener(eventName, handler, {
      passive: true,
      capture
    });
    // 删除事件委托，避免内存泄漏
    return () => {
      document.removeEventListener(eventName, handler);
    };
  }, [eventName, target]);
}
