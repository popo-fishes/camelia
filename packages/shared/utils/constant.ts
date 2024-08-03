/*
 * @Date: 2024-02-04 13:41:29
 * @Description: Modify here please
 */
import { isClient } from "./is";

export const defaultWindow = /* #__PURE__ */ isClient ? window : undefined;

export const defaultDocument = /* #__PURE__ */ isClient ? window.document : undefined;

// 无活动
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const NOOP = () => {};
