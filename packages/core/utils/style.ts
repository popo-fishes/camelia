/*
 * @Date: 2023-12-28 09:26:59
 * @Description: Modify here please
 */
import { isObject, isClient } from "@camelia/shared/utils";
import type { CSSProperties } from "react";

export const classNameToArray = (cls = "") => cls.split(" ").filter((item) => !!item.trim());

export const hasClass = (el: Element, cls: string): boolean => {
  if (!el || !cls) return false;
  if (cls.includes(" ")) throw new Error("className should not contain space.");
  return el.classList.contains(cls);
};

export const addClass = (el: Element, cls: string) => {
  if (!el || !cls.trim()) return;
  el.classList.add(...classNameToArray(cls));
};

export const removeClass = (el: Element, cls: string) => {
  if (!el || !cls?.trim()) return;
  el.classList.remove(...classNameToArray(cls));
};

export const getStyle = (element: HTMLElement, styleName: string): string => {
  if (!isClient || !element || !styleName) return "";
  try {
    const style = (element.style as any)[styleName];
    if (style) return style;
    // 获取window
    const computed: any = document.defaultView?.getComputedStyle(element, "");
    return computed ? computed[styleName] : "";
  } catch {
    return (element.style as any)[styleName];
  }
};

export const setStyle = (
  element: HTMLElement,
  styleName: CSSProperties | keyof CSSProperties,
  value?: string | number
) => {
  if (!element || !styleName) return;

  if (isObject(styleName)) {
    Object.entries(styleName).forEach(([prop, value]: any) => setStyle(element, prop, value));
  } else {
    element.style[styleName as string] = value as any;
  }
};

export const removeStyle = (element: HTMLElement, style: CSSProperties | keyof CSSProperties) => {
  if (!element || !style) return;

  if (isObject(style)) {
    Object.keys(style).forEach((prop: any) => removeStyle(element, prop));
  } else {
    setStyle(element, style, "");
  }
};
