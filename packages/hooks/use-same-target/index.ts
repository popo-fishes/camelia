/*
 * @Date: 2023-11-27 16:36:09
 * @Description: 相同的目标检测
 */
import { NOOP } from "@fish-bubble-design/shared/utils";
export const useSameTarget = (handleClick?: (e: MouseEvent) => void) => {
  if (!handleClick) {
    return { onClick: NOOP, onMousedown: NOOP, onMouseup: NOOP };
  }

  let mousedownTarget = false;
  let mouseupTarget = false;
  //请参阅https://javascript.info/mouse-events-basics
  //事件触发顺序为：mousedown->mouseup->click
  //在点击触发后，我们需要将mousedown句柄设置为false。
  const onClick = (e: MouseEvent) => {
    if (mousedownTarget && mouseupTarget) {
      handleClick(e);
    }
    mousedownTarget = mouseupTarget = false;
  };

  const onMousedown = (e: MouseEvent) => {
    mousedownTarget = e.target === e.currentTarget;
  };
  const onMouseup = (e: MouseEvent) => {
    mouseupTarget = e.target === e.currentTarget;
  };

  return { onClick, onMousedown, onMouseup };
};
