/*
 * @Date: 2023-12-02 11:52:03
 * @Description: 防抖
 */
import debounce from "lodash/debounce";
import { useMemo, useRef } from "react";
import { useUnmount } from "../useUnmount";
import { isFunction } from "../utils";

type noop = (...args: any[]) => any;

export function useDebounce<T extends noop>(fn: T, options?: { wait?: number; leading?: boolean }) {
  if (!isFunction(fn)) {
    console.error(`参数“fn”应该是一个函数`);
  }

  const fnRef = useRef(fn);
  fnRef.current = fn;

  const wait = options?.wait ?? 1000;

  const debounced = useMemo(
    () =>
      debounce(
        (...args: Parameters<T>): ReturnType<T> => {
          return fnRef.current(...args);
        },
        wait,
        options
      ),
    []
  );

  useUnmount(() => {
    debounced.cancel();
  });

  return {
    run: debounced,
    cancel: debounced.cancel
  };
}
