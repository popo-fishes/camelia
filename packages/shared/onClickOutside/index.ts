/* eslint-disable no-console */
import type { MaybeElementRef } from "../unrefElement";
import { unrefElement } from "../unrefElement";
import { useEventListener } from "../useEventListener";
import { defaultWindow, NOOP, isIOS } from "../utils";
import type { Fn } from "../utils";

export interface OnClickOutsideOptions {
  window?: Window;
  /**
   * 不应触发事件的元素列表。
   */
  ignore?: (MaybeElementRef | string)[];
  /**
   * 对内部事件侦听器使用捕获 (用来判断是捕获还是冒泡)
   * @default true
   */
  capture?: boolean;
  /**
   * 如果焦点移动到iframe，则运行处理程序函数。
   * @default false
   */
  detectIframe?: boolean;
}

let _iOSWorkaround = false;

/**
 * 监听元素外部的click
 * @param target
 * @param handler
 * @param options
 */
export function onClickOutside<T extends OnClickOutsideOptions>(
  target: MaybeElementRef,
  handler: (e: PointerEvent | FocusEvent) => void,
  options: T = {} as T
): (() => void) | undefined {
  const { window = defaultWindow, ignore = [], capture = true, detectIframe = false } = options;

  if (!window) return;

  // 修复: onClickOutside 在 Safari iOS 上不起作用
  // How it works: https://stackoverflow.com/a/39712411
  if (isIOS && !_iOSWorkaround) {
    _iOSWorkaround = true;
    Array.from(window.document.body.children).forEach((el) => el.addEventListener("click", NOOP));
    window.document.documentElement.addEventListener("click", NOOP);
  }

  // 标记物
  let shouldListen = true;

  const shouldIgnore = (event: PointerEvent) => {
    return ignore.some((target) => {
      if (typeof target === "string") {
        return Array.from(window.document.querySelectorAll(target)).some((el) => el === event.target || event.composedPath().includes(el));
      } else {
        const el = unrefElement(target);
        return el && (event.target === el || event.composedPath().includes(el));
      }
    });
  };

  const listener = (event: PointerEvent) => {
    const el = unrefElement(target);

    if (!event.composedPath) {
      console.info("此函数使用Event.composedPath() ， IE 11、Edge 18 及更低版本不支持该函数");
      return;
    }

    if (!el || el === event.target || event.composedPath().includes(el)) return;

    if (event.detail === 0) shouldListen = !shouldIgnore(event);

    // 不应该监听
    if (!shouldListen) {
      shouldListen = true;
      return;
    }
    // 执行cb函数
    handler(event);
  };

  const cleanup = [
    // pointerdown事件通常会在click事件之前触发
    useEventListener(window, "click", listener, { passive: true, capture }),
    useEventListener(
      window,
      "pointerdown",
      (e) => {
        const el = unrefElement(target);
        if (!e.composedPath) {
          console.info("此函数使用Event.composedPath() ， IE 11、Edge 18 及更低版本不支持该函数");
          shouldListen = false;
        } else {
          // 判断当前点击的节点是否包含了目标触发器
          shouldListen = !shouldIgnore(e) && !!(el && !e.composedPath().includes(el));
        }
      },
      { passive: true }
    ),
    detectIframe &&
      useEventListener(window, "blur", (event) => {
        setTimeout(() => {
          const el = unrefElement(target);
          if (window.document.activeElement?.tagName === "IFRAME" && !el?.contains(window.document.activeElement)) handler(event as any);
        }, 0);
      })
  ].filter(Boolean) as Fn[];

  const stop = () => cleanup.forEach((fn) => fn());

  return stop;
}
