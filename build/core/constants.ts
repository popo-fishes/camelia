/*
 * @Date: 2023-12-29 23:54:07
 * @Description: Unified management of naming for the entire project
 * ！！！core area
 */
import { resolve } from "path";

// UI library name
export const UINAME = "camllia";

// UI BRAND name
export const PKG_BRAND_NAME = "Camllia";

// 工程目录的入口
export const projRoot = resolve(__dirname, "..", "..");

/** packages目录 */
export const pkgsRoot = resolve(projRoot, "packages");

/** 打包脚本 */
export const buildRoot = resolve(projRoot, "build");

/** 打包时的，外层目录 `/dist` */
export const buildOutput = resolve(projRoot, "dist");

/** 打包时， 构建ui库输出的目录 */
export const epOutput = resolve(buildOutput, "camllia");

/** UI库packages 工程目录 */
export const libraryRoot = resolve(pkgsRoot, "camllia");

/** UI库packages 工程目录的package.json文件 */
export const libraryPackage = resolve(libraryRoot, "package.json");

/** 全局获取---获取当前版本号 */
export const getVersion = () => {
  const pathVersion = resolve(libraryRoot, "version");
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require(pathVersion).version as string;
};
