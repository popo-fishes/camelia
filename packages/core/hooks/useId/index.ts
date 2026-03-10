/*
 * @Date: 2023-12-19 11:43:08
 * @Description: Modify here please
 */
import { useMemo } from "react";

const defaultIdInjection = {
  prefix: Math.floor(Math.random() * 10000),
  current: 0
};

export const useId = (namespace: string, deterministicId?: string): string => {
  const _namespace = namespace;

  const id = useMemo(() => {
    return deterministicId || `${_namespace}-id-${defaultIdInjection.prefix}-${defaultIdInjection.current++}`;
  }, []);

  return id;
};
