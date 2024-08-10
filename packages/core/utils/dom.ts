/*
 * @Date: 2023-12-28 09:58:58
 * @Description: Modify here please
 */
import { isClient } from "@camelia/shared/utils";

let scrollBarWidth: number;
export const getScrollBarWidth = (): number => {
  if (!isClient) return 0;
  if (scrollBarWidth !== undefined) return scrollBarWidth;

  const outer = document.createElement("div");
  outer.style.overflow = "auto";
  outer.style.height = "100%";
  outer.style.visibility = "hidden";
  outer.style.width = "100px";
  outer.style.position = "absolute";
  outer.style.top = "-9999px";
  document.body.appendChild(outer);

  const widthNoScroll = outer.offsetWidth;

  outer.style.overflow = "scroll";

  const inner = document.createElement("div");
  inner.style.width = "100%";
  outer.appendChild(inner);

  const widthWithScroll = inner.offsetWidth;

  outer.parentNode?.removeChild(outer);
  scrollBarWidth = widthNoScroll - widthWithScroll;

  return scrollBarWidth;
};

export function canUseDom() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}
