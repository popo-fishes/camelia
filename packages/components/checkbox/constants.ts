/*
 * @Date: 2024-08-18 10:49:11
 * @Description: Modify here please
 */
import React from "react";

type CheckboxGroupContext = {
  value?: string[] | number[];
  changeEvent?: (...args: any) => any;
};

export const CheckboxGroupContex = React.createContext<CheckboxGroupContext>({});
