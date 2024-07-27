/* eslint-disable no-console */
/*
 * @Date: 2023-12-29 22:29:58
 * @Description: Modify here please
 */
import type { App } from "vue";
import * as Components from "./component";
import { version } from "./version";

export * from "@fish-bubble-design/components";

export * from "@fish-bubble-design/hooks";

const INSTALLED_KEY = Symbol("INSTALLED_KEY");

export const install = function (app: App) {
  if (app[INSTALLED_KEY]) return;

  app[INSTALLED_KEY] = true;

  Object.keys(Components).forEach((key) => {
    const component = Components[key];
    // 注册插件
    if (component.install) {
      app.use(component);
    }
  });

  app.config.globalProperties.$message = Components.message;
  app.config.globalProperties.$prompt = Components.prompt;

  return app;
};

export { version };

export default {
  version,
  install
};
