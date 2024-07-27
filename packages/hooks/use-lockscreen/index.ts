/* eslint-disable no-console */
/*
 * @Date: 2023-12-28 09:16:35
 * @Description: Modify here please
 */
import { isRef, onScopeDispose, watch } from "vue";
import { isClient } from "@fish-bubble-design/shared/utils";
import { addClass, getScrollBarWidth, hasClass, getStyle, removeClass } from "@fish-bubble-design/core/utils";

import type { Ref } from "vue";

/**
 * 勾选监控参考值以锁定或解锁屏幕
 * @param trigger {Ref<boolean>}
 */
export const useLockscreen = (trigger: Ref<boolean>, hiddenCls: string) => {
  if (!isRef(trigger)) {
    console.error(`[useLockscreen]，您需要将ref参数传递给此函数`);
  }

  if (!isClient || hasClass(document.body, hiddenCls)) {
    return;
  }

  let scrollBarWidth = 0;
  let withoutHiddenClass = false;
  // 记录下body原始的宽度
  let bodyWidth = "0";

  const cleanup = () => {
    setTimeout(() => {
      removeClass(document?.body, hiddenCls);
      // 还原样式
      if (withoutHiddenClass && document) {
        document.body.style.width = bodyWidth;
      }
    }, 200);
  };

  watch(trigger, (val) => {
    if (!val) {
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
  });

  onScopeDispose(() => cleanup());
};
