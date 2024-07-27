/*
 * @Date: 2024-01-17 17:46:50
 * @Description: Modify here please
 */
import fs from "fs";
import path from "path";
import { vpRoot } from "./paths";

import type { HeadConfig } from "vitepress";

export const head: HeadConfig[] = [
  [
    "link",
    {
      rel: "icon",
      href: "/fb-logo.ico",
      type: "image/svg+xm"
    }
  ],
  ["script", {}, fs.readFileSync(path.resolve(vpRoot, "scripts", "dom.js"), "utf-8")]
];
