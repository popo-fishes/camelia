/*
 * @Date: 2023-12-28 09:16:35
 * @Description: 勾选监控参考值以锁定或解锁屏幕
 */
import { useEffect } from "react";
import { useUnmount } from "../use-unmount";
import { isClient } from "../utils";
import { addClass, getScrollBarWidth, hasClass, getStyle, removeClass } from "@camelia/core/utils";

let scrollBarWidth = 0;
let withoutHiddenClass = false;
// 记录下body原始的宽度
let bodyWidth = "0";

let timer = null;

/**
 * 勾选监控参考值以锁定或解锁屏幕
 * @param trigger boolean
 */
export const useLockscreen = (trigger: boolean, hiddenCls: string) => {
  const cleanup = () => {
    timer = setTimeout(() => {
      removeClass(document?.body, hiddenCls);
      // 还原样式
      if (withoutHiddenClass && document) {
        document.body.style.width = bodyWidth;
      }
    }, 200);
  };

  useEffect(() => {
    if (!isClient || (hasClass(document.body, hiddenCls) && trigger)) {
      return;
    }

    if (!trigger) {
      clearTimeout(timer);
      cleanup();
      return;
    }

    withoutHiddenClass = !hasClass(document.body, hiddenCls);
    if (withoutHiddenClass) {
      bodyWidth = document.body.style.width;
    }

    scrollBarWidth = getScrollBarWidth();

    const bodyHasOverflow = document.documentElement.clientHeight < document.body.scrollHeight;
    const bodyOverflowY = getStyle(document.body, "overflowY");

    if (scrollBarWidth > 0 && (bodyHasOverflow || bodyOverflowY === "scroll") && withoutHiddenClass) {
      document.body.style.width = `calc(100% - ${scrollBarWidth}px)`;
    }

    addClass(document.body, hiddenCls);
  }, [trigger]);

  useUnmount(() => {
    clearTimeout(timer);
    cleanup();
  });
};
