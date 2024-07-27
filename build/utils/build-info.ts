/*
 * @Date: 2023-12-30 00:12:04
 * @Description: Modify here please
 */
import path from "path";
import { epOutput } from "../core/constants";

import type { ModuleFormat } from "rollup";

export const modules = ["esm", "cjs"] as const;

export type Module = (typeof modules)[number];

export interface BuildInfo {
  module: "ESNext" | "CommonJS";
  format: ModuleFormat;
  ext: "mjs" | "cjs" | "js";
  output: {
    name: string;
    path: string;
  };
}

export const buildConfig: Record<Module, BuildInfo> = {
  esm: {
    module: "ESNext",
    format: "esm",
    ext: "mjs",
    output: {
      name: "es",
      path: path.resolve(epOutput, "es")
    }
  },
  cjs: {
    module: "CommonJS",
    format: "cjs",
    ext: "js",
    output: {
      name: "lib",
      path: path.resolve(epOutput, "lib")
    }
  }
};
export const buildConfigEntries = Object.entries(buildConfig) as BuildConfigEntries;

export type BuildConfig = typeof buildConfig;
export type BuildConfigEntries = [Module, BuildInfo][];
