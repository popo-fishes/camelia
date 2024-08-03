/*
 * @Date: 2024-08-02 16:03:16
 * @Description: Modify here please
 */
import { useEffect } from "react";
import { isFunction } from "../utils";

export const useMount = (fn: () => void) => {
  if (!isFunction(fn)) {
    console.error(`参数“fn”应该是一个函数`);
  }
  useEffect(() => {
    fn?.();
  }, []);
};
