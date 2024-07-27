/*
 * @Date: 2023-12-20 19:43:43
 * @Description: Modify here please
 */
import { defineComponent, inject } from "vue";
import { isEqual } from "lodash-unified";
import type { Component, VNode, VNodeNormalizedChildren } from "vue";
import { selectKey } from "./utils";

export default defineComponent({
  name: "Options",
  setup(_, { slots }) {
    const select = inject(selectKey);

    let cachedOptions: any[] = [];

    return () => {
      const children = slots.default?.();
      const valueList: any[] = [];

      function filterOptions(children?: VNodeNormalizedChildren) {
        if (!Array.isArray(children)) return;
        (children as VNode[]).forEach((item) => {
          const name = ((item?.type || {}) as Component)?.name;
          if (name === "FbOption") {
            valueList.push(item.props?.value);
          } else if (Array.isArray(item.children)) {
            filterOptions(item.children);
          }
        });
      }

      if (children.length) {
        filterOptions(children![0]?.children);
      }

      if (!isEqual(valueList, cachedOptions)) {
        cachedOptions = valueList;
        if (select) {
          select.states.optionValues = valueList;
        }
      }

      return children;
    };
  }
});
