/*
 * @Date: 2024-02-05 10:58:06
 * @Description:监听元素外部的click  vue 指令
 */
import type { ObjectDirective } from "vue";
import { onClickOutside } from ".";

export const vOnClickOutside: ObjectDirective<HTMLElement> = {
  mounted(el, binding) {
    // 对内部事件侦听器使用捕获 (用来判断是捕获还是冒泡)
    const capture = !binding.modifiers.bubble;

    if (typeof binding.value === "function") {
      (el as any).__onClickOutside_stop = onClickOutside(el, binding.value, { capture });
    } else {
      // console.log(binding.value);
      const [handler, options] = binding.value;
      (el as any).__onClickOutside_stop = onClickOutside(el, handler, Object.assign({ capture }, options));
    }
  },
  // 卸载时清除
  unmounted(el) {
    (el as any).__onClickOutside_stop();
  }
};
