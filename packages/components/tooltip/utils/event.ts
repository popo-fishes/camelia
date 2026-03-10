/*
 * @Date: 2023-12-19 20:45:28
 * @Description: Modify here please
 */

// 事件处理程序
export const composeEventHandlers = <E>(theirsHandler?: (event: E) => boolean | void, oursHandler?: (event: E) => void) => {
  const handleEvent = (event: E) => {
    const shouldPrevent = theirsHandler?.(event);
    if (!shouldPrevent) {
      return oursHandler?.(event);
    }
  };
  return handleEvent;
};
