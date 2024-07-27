/* eslint-disable no-console */
/*
 * @Date: 2023-12-31 13:34:29
 * @Description: Modify here please
 */

import { UINAME } from "../build/core/constants";
import { readFileSync, writeFile } from "fs";

try {
  const code = readFileSync("./typings/components.d.ts", "utf-8");

  const match = code.match(/^declare module "@vue\/runtime-core" {[\s\S]*?^}$/m);

  const tip = "\n // 这是自动生成的文件，你不需要更改下面的内容~~~~ \n";

  let globalTsCode = tip + (match ? match[0] : code);

  const regex = new RegExp(`../packages/${UINAME}`, "g");

  globalTsCode = globalTsCode.replace(regex, UINAME);

  globalTsCode += "\n export {};";

  writeFile("./global.d.ts", globalTsCode, (error) => {
    if (error) {
      console.error("写文件时出现错误：", error);
    }
  });
} catch (err) {
  console.error(err);
}
