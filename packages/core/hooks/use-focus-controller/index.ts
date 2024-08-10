/*
 * @Date: 2023-12-25 10:32:53
 * @Description: Modify here please
 */
import { useState, useRef, useEffect } from "react";
import { isFunction, useEventListener } from "@camellia/shared";

interface UseFocusControllerOptions {
  afterFocus?: () => void;
  /**
   * return true to cancel blur
   * @param event React.FocusEvent<HTMLInputElement>
   */
  beforeBlur?: (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => boolean | undefined;
  afterBlur?: () => void;
}

interface EventProps {
  onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export function useFocusController<T extends HTMLElement>(
  target: React.MutableRefObject<T> | undefined,
  { onFocus, onBlur }: EventProps = {},
  { afterFocus, beforeBlur, afterBlur }: UseFocusControllerOptions = {}
) {
  const wrapperRef = useRef<HTMLDivElement>();
  const [isFocused, setFocused] = useState<boolean>(false);

  const handleFocus = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (isFocused) return;
    setFocused(true);
    onFocus?.(event);
    afterFocus?.();
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const cancelBlur = isFunction(beforeBlur) ? beforeBlur(event) : false;

    if (cancelBlur || (event.relatedTarget && wrapperRef.current?.contains(event.relatedTarget as Node))) return;
    setFocused(false);
    onBlur?.(event);
    afterBlur?.();
  };

  const handleClick = () => {
    target.current?.focus();
  };

  useEffect(() => {
    if (wrapperRef.current) {
      wrapperRef.current.setAttribute("tabindex", "-1");
    }
  }, [wrapperRef.current]);

  useEventListener("click", handleClick, { target: wrapperRef });

  return {
    wrapperRef,
    isFocused,
    handleFocus,
    handleBlur
  };
}
