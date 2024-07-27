/*
 * @Date: 2023-12-18 13:55:45
 * @Description: Modify here please
 */
import { isClient } from "@fish-bubble-design/shared/utils";

export * from "./constants";
export * from "./event";

// 获取挂载器
export const getParent = <T>(getContainer: T, triggerNode: HTMLElement | undefined) => {
  if (!isClient) {
    return null;
  }

  if (getContainer) {
    if (typeof getContainer === "string") {
      return document.querySelectorAll(getContainer)[0] as HTMLElement;
    }
    if (typeof getContainer === "function") {
      // 如果包裹器方法存在，把目标元素返回去
      const node = getContainer(triggerNode);
      return node || document.body;
    }
    if (typeof getContainer === "object" && getContainer instanceof window.HTMLElement) {
      return getContainer;
    }
  }
  return document.body;
};
