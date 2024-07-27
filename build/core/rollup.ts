/*
 * @Date: 2023-12-29 21:29:17
 * @Description: Modify here please
 */
import { getPackageDependencies } from "../utils";
import { libraryPackage, PKG_PREFIX, UINAME } from ".";

import type { OutputOptions, RollupBuild } from "rollup";

// 工程packages目录下的文件
const directorys = ["components", "core", "hooks", "shared"];

export const getPackageSpacesMap = () => {
  const packageSpacesEnum: Record<string, string> = {};

  directorys.forEach((item) => {
    packageSpacesEnum[`${PKG_PREFIX}/${item}`] = `${UINAME}/es/${item}`;
  });

  return packageSpacesEnum;
};

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

// 构建声明文件时：转换生成文件的路径
export const writeTsTypesPath = (filePath: string): string => {
  const typesPath = `/types/${UINAME}/`;
  if (filePath.indexOf(typesPath) != -1) {
    const paths = filePath.split(typesPath);
    return `${paths[0]}/types/${paths[1]}`;
  } else {
    return filePath;
  }
};

// 构建声明文件时：转换内容里面的路径
export const writeTsTypesContent = (content: string, filePath: string): string => {
  // 改变fish-bubble-design/** 里面的路径指向问题
  if (filePath.indexOf(`/types/${UINAME}/`) !== -1) {
    return content.replace(/\.\.\/(components|hooks|shared|core)/g, "./$1");
  } else {
    // fish-bubble-design v2版本不需要了，注释掉，不需要进行别名转换！
    // const spacesMap = getPackageSpacesMap();
    // let code = "";
    // Object.keys(spacesMap).forEach((key) => {
    //   if (!code) code = content;
    //   {
    //     const regex = new RegExp(key, "g");
    //     code = code.replace(regex, spacesMap[key]);
    //   }
    // });
    // return code;

    return content;
  }
};
