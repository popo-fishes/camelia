/*
 * @Date: 2024-09-08 09:47:51
 * @Description: Modify here please
 */
import * as React from "react";

export type MemoChildrenProps = {
  shouldUpdate: boolean;
  children: React.ReactNode;
};

export default React.memo(
  ({ children }: MemoChildrenProps) => children as React.ReactElement,
  (_, { shouldUpdate }) => !shouldUpdate
);
