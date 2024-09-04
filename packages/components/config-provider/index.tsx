/*
 * @Date: 2024-07-28 13:24:01
 * @Description: Modify here please
 */
import React, { useCallback, useContext } from "react";
import { useMemo } from "@camelia/shared";
import type { ConfigCustomProps } from "./context";
import { ConfigContext } from "./context";

export interface ConfigProviderProps {
  prefixCls?: string;
  children?: React.ReactNode;
}

export { ConfigContext, type ConfigCustomProps };

const ConfigProvider: React.FC<ConfigProviderProps> & {
  /** @private internal Usage. do not use in your production */
  ConfigContext: typeof ConfigContext;
} = (props) => {
  const { children, prefixCls } = props;

  const context = useContext<ConfigCustomProps>(ConfigContext);

  const getPrefixCls = useCallback(
    (suffixCls: string, customizePrefixCls?: string) => {
      if (customizePrefixCls) {
        return customizePrefixCls;
      }
      const mergedPrefixCls = prefixCls || context.getPrefixCls("");

      return suffixCls ? `${mergedPrefixCls}-${suffixCls}` : mergedPrefixCls;
    },
    [context.getPrefixCls, prefixCls]
  );

  const config: ConfigCustomProps = {
    ...context,
    getPrefixCls
  };

  // 可能导致所有组件重新渲染，即使它的 props 没有改变
  const memoedConfig = useMemo(
    () => config,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    config,
    (prevConfig: any, currentConfig: any) => {
      const prevKeys: any = Object.keys(prevConfig) as Array<keyof typeof config>;
      const currentKeys = Object.keys(currentConfig) as Array<keyof typeof config>;
      return prevKeys.length !== currentKeys.length || prevKeys.some((key) => prevConfig[key] !== currentConfig[key]);
    }
  );

  return <ConfigContext.Provider value={memoedConfig}>{children}</ConfigContext.Provider>;
};

ConfigProvider.ConfigContext = ConfigContext;

export default ConfigProvider;
