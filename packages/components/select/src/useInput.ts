/*
 * @Date: 2024-02-05 16:00:50
 * @Description: Modify here please
 */
import { ref } from "vue";
import { isFunction } from "@fish-bubble-design/shared";

export function useInput(handleInput: (event: InputEvent) => void) {
  const isComposing = ref(false);

  const handleCompositionStart = () => {
    isComposing.value = true;
  };

  const handleCompositionEnd = (event) => {
    if (isComposing.value) {
      isComposing.value = false;
      if (isFunction(handleInput)) {
        handleInput(event);
      }
    }
  };

  return {
    handleCompositionStart,
    handleCompositionEnd
  };
}
