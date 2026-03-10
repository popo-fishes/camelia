/*
 * @Date: 2023-12-19 15:29:10
 * @Description: Modify here please
 */
import { useEffect, useState, useMemo } from "react";

let originalZIndex = 0;
export const defaultInitialZIndex = 2000;

export const useZIndex = (zIndexOverrides?: number) => {
  const [zIndex, setZindex] = useState(originalZIndex);
  const initialZIndex = zIndexOverrides || defaultInitialZIndex;

  const currentZIndex = useMemo(() => initialZIndex + zIndex, [zIndex, initialZIndex]);

  const nextZIndex = () => {
    originalZIndex = zIndex + 1;
    setZindex(zIndex + 1);
  };

  useEffect(() => {
    nextZIndex();
  }, []);

  return {
    currentZIndex
  };
};

export type UseZIndexReturn = ReturnType<typeof useZIndex>;
