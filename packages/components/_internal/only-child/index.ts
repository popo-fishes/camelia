/* eslint-disable no-console */
/*
 * @Date: 2023-12-18 20:33:58
 * @Description: Modify here please
 */
import { Comment, Fragment, Text, cloneVNode, defineComponent, inject, withDirectives, h } from "vue";

import { FORWARD_REF_INJECTION_KEY, useForwardRefDirective } from "@fish-bubble-design/hooks";

import { isObject, NOOP } from "@fish-bubble-design/shared/utils";

import type { Ref, VNode } from "vue";

const NAME = "OnlyChild";

export const OnlyChild = defineComponent({
  name: NAME,
  setup(_, { slots, attrs }) {
    // 把我当前的触发器ref 共享 (非常关键)
    const forwardRefInjection = inject(FORWARD_REF_INJECTION_KEY);
    // 注册一个指令
    const forwardRefDirective = useForwardRefDirective(forwardRefInjection?.setForwardRef ?? NOOP);
    return () => {
      const defaultSlot = slots.default?.(attrs);
      if (!defaultSlot) return null;

      if (defaultSlot.length > 1) {
        console.info(NAME, "只需要一个有效的子项");
        return null;
      }

      const firstLegitNode = findFirstLegitChild(defaultSlot);
      if (!firstLegitNode) {
        console.info(NAME, "未找到有效的子节点");
        return null;
      }
      // 用于给 vnode 增加自定义指令。
      return withDirectives(cloneVNode(firstLegitNode!, attrs), [[forwardRefDirective]]);
    };
  }
});

function findFirstLegitChild(node: VNode[] | undefined): VNode | null {
  if (!node) return null;
  const children = node as VNode[];
  for (const child of children) {
    // *当用户使用h（Fragment，
    // *当值为基元时，这种触发器情况无法处理
    // *我们应该把包好的绳子还回去
    if (isObject(child)) {
      switch (child.type) {
        case Comment:
          continue;
        case Text:
        case "svg":
          return wrapTextContent(child);
        case Fragment:
          return findFirstLegitChild(child.children as VNode[]);
        default:
          return child;
      }
    }
    return wrapTextContent(child);
  }
  return null;
}

function wrapTextContent(s: string | VNode) {
  return h("span", { class: "only-child-content" }, s);
}

export type OnlyChildExpose = {
  forwardRef: Ref<HTMLElement>;
};
