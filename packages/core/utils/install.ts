/*
 * @Date: 2024-01-02 09:35:21
 * @Description: Modify here please
 */
import type { AppContext, Plugin } from "vue";

export type SFCWithInstall<T> = T & Plugin;

export type SFCInstallWithContext<T> = SFCWithInstall<T> & {
  _context: AppContext | null;
};

export const withInstall = <T, E extends Record<string, any>>(main: T, extra?: E) => {
  (main as SFCWithInstall<T>).install = (app): void => {
    for (const comp of [main, ...Object.values(extra ?? {})]) {
      app.component(comp.name, comp);
    }
  };

  if (extra) {
    for (const [key, comp] of Object.entries(extra)) {
      (main as any)[key] = comp;
    }
  }
  return main as SFCWithInstall<T> & E;
};

export const withNoopInstall = <T>(component: T) => {
  (component as SFCWithInstall<T>).install = () => {};

  return component as SFCWithInstall<T>;
};
