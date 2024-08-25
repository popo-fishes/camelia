/*
 * @Date: 2023-11-23 13:35:43
 * @Description: Modify here please
 */
import { computed, inject, unref, ref, onMounted, watch, useAttrs } from "vue";
import type { StyleValue, CSSProperties } from "vue";
import type { Modifier } from "@popperjs/core";

import { isNumber } from "@fish-bubble-design/shared/utils";
import { useZIndex, usePopper, PartialOptions } from "@fish-bubble-design/hooks";

import { POPPER_WRAP_INJECTION_KEY } from "../utils";
import type { IPopperContentProps } from "../content-type";

// 默认配置
function genModifiers(options: IPopperContentProps) {
  const { offset, gpuAcceleration, fallbackPlacements } = options;
  return [
    {
      name: "offset",
      options: {
        offset: [0, offset ?? 6]
      }
    },
    // 防止溢出
    {
      name: "preventOverflow",
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    },
    {
      name: "flip",
      options: {
        padding: 5,
        fallbackPlacements
      }
    },
    {
      name: "computeStyles",
      options: {
        gpuAcceleration
      }
    }
  ];
}

export const usePopperContent = (props: IPopperContentProps, prefix: string) => {
  const attrs = useAttrs();
  const { contentRef, triggerRef, role } = inject(POPPER_WRAP_INJECTION_KEY, undefined)!;

  const { nextZIndex } = useZIndex();

  const contentZIndex = ref<number>(isNumber(props.zIndex) ? props.zIndex : nextZIndex());

  const eventListenerModifier = computed(() => {
    return {
      name: "eventListeners",
      enabled: unref(props.open)
    } as Modifier<"eventListeners", any>;
  });

  // https://popper.js.org/docs/v2/constructors/#options
  const options = computed<PartialOptions>(() => {
    const { placement, strategy } = props;
    return {
      //  第一次更新后调用的函数
      onFirstUpdate: () => {
        update();
      },
      placement,
      strategy,
      modifiers: [...genModifiers(props), ...[unref(eventListenerModifier)]]
    };
  });

  const { attributes, styles, update, forceUpdate, instanceRef } = usePopper(triggerRef, contentRef, options);

  // 内容class
  const contentClass = computed(() => [prefix, props.popperClass]);
  // 内容样式
  const contentStyle = computed<StyleValue[]>(() => {
    return [{ zIndex: unref(contentZIndex) } as CSSProperties, unref(styles) as CSSProperties, , props.popperStyle || {}];
  });
  // 内容属性
  const contentAttrs = computed(() => ({ ...unref(attributes), ...attrs }));

  onMounted(() => {
    watch(
      () => unref(triggerRef)?.getBoundingClientRect(),
      () => {
        update();
      }
    );
  });

  return {
    contentRef,
    triggerRef,
    instanceRef,

    role,
    contentClass,
    contentAttrs,
    contentStyle,

    forceUpdate,
    update
  };
};
