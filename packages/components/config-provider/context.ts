/*
 * @Date: 2024-07-28 13:37:29
 * @Description: Modify here please
 */
import React from "react";

export interface ConfigCustomProps {
  getPrefixCls: (suffixCls?: string, customizePrefixCls?: string) => string;
}

export const defaultPrefixCls = "fb";

const defaultGetPrefixCls = (suffixCls?: string, customizePrefixCls?: string) => {
  if (customizePrefixCls) {
    return customizePrefixCls;
  }
  return suffixCls ? `${defaultPrefixCls}-${suffixCls}` : defaultPrefixCls;
};

export const ConfigContext = React.createContext<ConfigCustomProps>({
  getPrefixCls: defaultGetPrefixCls
});
