/*
 * @Date: 2024-09-01 14:11:27
 * @Description: Modify here please
 */
import { useState } from "react";
import { useClickAway, type BasicTarget } from "@camelia/shared/use-click-away";

export function useClickUtside<T extends Event = Event>(
  /** 操作者 */
  onClickAway: (e: T) => void,
  /** 目标dom */
  target: BasicTarget | BasicTarget[]
) {
  const [enable, setEnable] = useState(false);

  useClickAway(onClickAway, target, {
    enable
  });

  /** 开始监听外部点击 */
  const start = () => {
    setEnable(true);
  };

  /** 停止监听外部点击，它主动卸载事件 */
  const stop = () => {
    setEnable(false);
  };

  return {
    start,
    stop
  };
}
