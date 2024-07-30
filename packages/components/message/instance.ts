/*
 * @Date: 2023-11-23 19:50:37
 * @Description: Modify here please
 */
import type { MessageContext } from "./type";

// msg收集器
export const instances: MessageContext[] = [];

// 获取当前的msg，上一个msg
export const getInstance = (id: string) => {
  const idx = instances.findIndex((instance) => instance.id === id);
  const current = instances[idx];
  let prev: MessageContext | undefined;
  if (idx > 0) {
    prev = instances[idx - 1];
  }
  return { current, prev };
};

// 获取上一个msg的top位置
export const getLastOffset = (id: string): number => {
  const { prev } = getInstance(id);
  if (!prev) return 0;
  if (prev.ref.current?.bottom) {
    return prev.ref.current?.bottom;
  }
  return 0;
};
