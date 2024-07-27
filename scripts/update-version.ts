/*
 * @Date: 2024-01-01 15:25:59
 * @Description: Modify here please
 */
import consola from "consola";
import chalk from "chalk";
import { resolve } from "path";
import { readFileSync, writeFile } from "fs";

import { epOutput, getVersion } from "../build/core";

async function main() {
  const v = getVersion();

  consola.log(chalk.cyan(".....Start updating version"));
  consola.log(chalk.cyan(`.....VERSION: ${v}`));

  try {
    const paths = resolve(epOutput, "package.json");
    // 读取package.json文件内容
    const code = readFileSync(paths, "utf-8");
    const packageJson = JSON.parse(code);

    // 修改版本号
    packageJson.version = v;

    consola.log(chalk.cyan(`.....Updating package.json for fish-bubble-design`));

    const modifyCode = JSON.stringify(packageJson, null, 2);
    writeFile(paths, modifyCode, (error) => {
      if (error) {
        consola.error("写文件时出现错误：", error);
      }

      for (let i = 0, len = 3; i < len; i++) {
        consola.log(chalk.cyan(`.....`));
      }
      consola.success(chalk.cyan(`...fish-bubble-design, Build completed`));
    });
  } catch (err: any) {
    consola.error(err);
  }
}

main();
