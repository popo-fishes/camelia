/*
 * @Date: 2024-01-11 18:55:38
 * @Description: Modify here please
 */
import { computed, unref, ref, watch, shallowRef, onBeforeUnmount } from "vue";
import { createPopper } from "@popperjs/core";
import type { Ref } from "vue";
import type { Instance, Modifier, Options, VirtualElement } from "@popperjs/core";

type ElementType = HTMLElement | undefined;
type ReferenceElement = ElementType | VirtualElement;

export type PartialOptions = Partial<Options>;

export const usePopper = (
  referenceElementRef: Ref<ReferenceElement>,
  popperElementRef: Ref<ElementType>,
  opts: Ref<PartialOptions> | PartialOptions = {} as PartialOptions
) => {
  // 实例
  const instanceRef = shallowRef<Instance | undefined>();

  const states = ref({
    styles: {
      position: "absolute",
      left: "0",
      top: "0"
    },
    attributes: {}
  });

  // https://popper.js.org/docs/v2/modifiers/#custom-modifiers
  const stateUpdater = {
    name: "updateState",
    enabled: true,
    phase: "write",
    fn: ({ state }) => {
      // console.log(state)
      states.value = {
        styles: state.styles.popper as any,
        attributes: state.attributes.popper as any
      };
    },
    requires: ["computeStyles"]
  } as Modifier<"updateState", any>;

  // https://popper.js.org/docs/v2/constructors/#options
  const options = computed<Options>(() => {
    const { onFirstUpdate, placement, strategy, modifiers } = unref(opts);
    return {
      onFirstUpdate,
      placement: placement || "bottom",
      strategy: strategy || "absolute",
      modifiers: [...(modifiers || []), stateUpdater, { name: "applyStyles", enabled: false }]
    };
  });

  // destroy
  const destroy = () => {
    if (!instanceRef.value) return;

    instanceRef.value.destroy();
    instanceRef.value = undefined;
  };

  watch(
    options,
    (newOptions) => {
      const instance = unref(instanceRef);
      if (instance) {
        instance.setOptions(newOptions);
      }
    },
    {
      deep: true
    }
  );

  watch([referenceElementRef, popperElementRef], ([referenceElement, popperElement]) => {
    destroy();
    if (!referenceElement || !popperElement) return;

    instanceRef.value = createPopper(referenceElement, popperElement, unref(options));
  });

  onBeforeUnmount(() => {
    destroy();
  });

  return {
    styles: computed(() => unref(states).styles),
    attributes: computed(() => unref(states).attributes),
    // Popper 重新计算工具提示的位置 instance.update()
    update: () => unref(instanceRef)?.update(),
    // 它用于强制更新 Popper 的位置，即使没有发生任何可能引起 Popper 位置变化的事件（如窗口大小改变，滚动等）
    forceUpdate: () => unref(instanceRef)?.forceUpdate(),
    // 实例
    instanceRef: computed(() => unref(instanceRef))
  };
};
