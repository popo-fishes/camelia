/*
 * @Date: 2023-12-29 11:53:20
 * @Description: Modify here please
 */
import path from "path";
import consola from "consola";
import chalk from "chalk";

import { copyFile, mkdir } from "fs/promises";
import { readFileSync, writeFile } from "fs";
import { copy } from "fs-extra";
import { parallel, series } from "gulp";
import type { TaskFunction } from "gulp";

import { withTaskName, run, runTask } from "./core";
import { buildOutput, epOutput, libraryPackage, projRoot } from "./core/constants";
import { buildConfig } from "./utils";
import type { Module } from "./utils";
import glob from "fast-glob";

export * from "./tasks";

const copyFiles = () =>
  Promise.all([
    copyFile(libraryPackage, path.join(epOutput, "package.json")),
    copyFile(path.resolve(projRoot, "README.md"), path.resolve(epOutput, "README.md")),
    copyFile(path.resolve(projRoot, "global.d.ts"), path.resolve(epOutput, "global.d.ts"))
  ]);

const copyTypesDefinitions: TaskFunction = (cb) => {
  const typesPath = path.resolve(buildOutput, "types");
  const copyTypes = (module: Module) =>
    withTaskName(`copyTypes:${module}`, () => {
      const targetPath = buildConfig[module].output.path;
      // 递归复制
      return copy(typesPath, targetPath, { recursive: true });
    });
  return parallel(copyTypes("esm"), copyTypes("cjs"))(cb);
};

// Create component css.js style entry file
const createCssJsFile = (cb) => {
  const esComponents = glob("**/*.{mjs,js}", {
    cwd: path.resolve(epOutput, "es", "components"),
    absolute: true,
    onlyFiles: true
  });
  const libComponents = glob("**/*.{mjs,js}", {
    cwd: path.resolve(epOutput, "lib", "components"),
    absolute: true,
    onlyFiles: true
  });

  Promise.all([libComponents, esComponents])
    .then((data) => {
      const styleFileData = [...data[0], ...data[1]].filter((item) => {
        return item.includes("style/index.js") || item.includes("style/index.mjs");
      });
      // consola.log(styleFileData)
      let num = 0;
      styleFileData.forEach((item) => {
        // 文件后缀
        const suffix = item.endsWith(".mjs") ? ".mjs" : ".js";
        // 内容
        let code = readFileSync(item, "utf-8");
        // 替换scss为css
        const regex = new RegExp(".scss", "g");
        code = code.replace(regex, ".css");

        // 替换引入其它组件时的路径，如import "../../input/style/index.mjs"; 改变为 import "../../input/style/css.mjs";
        const regex2 = new RegExp(`style/index${suffix}`, "g");
        code = code.replace(regex2, `style/css${suffix}`);

        const styleDir = item.replace(/\/index\.mjs$|\/index\.js$/g, "");
        // 要写入的文件路径
        let filePath = path.join(styleDir, "css.js");
        if (item.endsWith(".mjs")) {
          filePath = path.join(styleDir, "css.mjs");
        }
        writeFile(filePath, code, (error) => {
          if (error) {
            cb(error);
            consola.error("An error occurred while writing the file:", error);
          }
          num = num + 1;
          if (num == styleFileData.length) {
            cb();
          }
          consola.success(`Created successfully: ${filePath}`);
        });
      });
    })
    .catch((error) => {
      cb(error);
    });
};

export default series(
  withTaskName("clean", () => run("pnpm run -C ./build clean")),
  withTaskName("createOutput", () => mkdir(epOutput, { recursive: true })),

  parallel(
    runTask("buildModules"),
    runTask("buildFullBundle"),
    withTaskName("buildThemeChalk", () => run("pnpm run -C ./build-theme start"))
  ),
  parallel(withTaskName("copyTypesDefinitions", copyTypesDefinitions)),
  parallel(withTaskName("createGlobalDts", () => run("pnpm -w run create-global-dts"))),
  parallel(withTaskName("copyFiles", copyFiles)),
  parallel(withTaskName("createCssJsFile", createCssJsFile)),
  parallel(async () => {
    for (let i = 0, len = 3; i < len; i++) {
      consola.log(chalk.cyan(`.....`));
    }
    consola.success(chalk.green("---------------Packaging completed--------------"));
  })
);
