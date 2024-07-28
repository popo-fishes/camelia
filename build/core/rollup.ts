/*
 * @Date: 2023-12-29 21:29:17
 * @Description: Modify here please
 */
import { getPackageDependencies } from "../utils";
import { libraryPackage } from ".";
import type { OutputOptions, RollupBuild } from "rollup";

/** 生成打包 包外部 */
export const generateExternal = async (options: { full: boolean }) => {
  const { dependencies, peerDependencies } = getPackageDependencies(libraryPackage);

  return (id: string) => {
    const packages: string[] = [...peerDependencies];
    if (!options.full) {
      packages.push(...dependencies);
    }
    // ignoring scss
    if (/\.scss$/.test(id)) return true;

    return [...new Set(packages)].some((pkg) => id === pkg || id.startsWith(`${pkg}/`));
  };
};

// 构建捆绑
export function writeBundles(bundle: RollupBuild, options: OutputOptions[]) {
  return Promise.all(options.map((option) => bundle.write(option)));
}
