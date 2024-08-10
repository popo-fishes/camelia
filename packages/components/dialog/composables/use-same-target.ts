/*
 * @Date: 2023-11-27 16:36:09
 * @Description: 相同的目标检测
 */
import { NOOP } from "@camllia/shared/utils";

let mousedownTarget = false;
let mouseupTarget = false;

export const useSameTarget = (handleClick?: (e: MouseEvent) => void) => {
  if (!handleClick) {
    return { onClick: NOOP, onMousedown: NOOP, onMouseup: NOOP };
  }
  //请参阅https://javascript.info/mouse-events-basics
  //事件触发顺序为：mousedown->mouseup->click
  //在点击触发后，我们需要将mousedown句柄设置为false。
  const onClick = (e: any) => {
    if (mousedownTarget && mouseupTarget) {
      handleClick(e);
    }
    mousedownTarget = mouseupTarget = false;
  };

  const onMousedown = (e: any) => {
    mousedownTarget = e.target === e.currentTarget;
  };
  const onMouseup = (e: any) => {
    mouseupTarget = e.target === e.currentTarget;
  };

  return { onClick, onMousedown, onMouseup };
};
