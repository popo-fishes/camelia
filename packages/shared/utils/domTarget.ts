/*
 * @Date: 2024-07-29 18:59:19
 * @Description: Modify here please
 */
import type { MutableRefObject } from "react";
import { isClient, isFunction } from ".";

type TargetValue<T> = T | undefined | null;

type TargetType = HTMLElement | Element | Window | Document;

export type BasicTarget<T extends TargetType = Element> =
  | (() => TargetValue<T>)
  | TargetValue<T>
  | MutableRefObject<TargetValue<T>>;

export function getTargetElement<T extends TargetType>(target: BasicTarget<T>, defaultElement?: T) {
  if (!isClient) {
    return undefined;
  }

  if (!target) {
    return defaultElement;
  }

  let targetElement: TargetValue<T>;

  if (isFunction(target)) {
    targetElement = (target as any)?.();
  } else if ("current" in target) {
    targetElement = target.current;
  } else {
    targetElement = target as TargetValue<T>;
  }

  return targetElement;
}
