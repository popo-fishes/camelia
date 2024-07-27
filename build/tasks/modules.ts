/*
 * @Date: 2023-12-29 21:26:54
 * @Description: Modify here please
 */
import { resolve } from "path";
import glob from "fast-glob";
import type { OutputOptions } from "rollup";
import { rollup } from "rollup";

import dts from "vite-plugin-dts";
import pluginVue from "@vitejs/plugin-vue";
import pluginVueJsx from "@vitejs/plugin-vue-jsx";
import VueMacros from "unplugin-vue-macros/rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import esbuild from "rollup-plugin-esbuild";
import { terser } from "rollup-plugin-terser";

import { excludeFiles, buildConfigEntries } from "../utils";
import { generateExternal, writeBundles, writeTsTypesPath, writeTsTypesContent } from "../core";
import { buildOutput, libraryRoot, pkgsRoot, projRoot } from "../core/constants";

export const buildModules = async () => {
  const input = excludeFiles(
    await glob("**/*.{js,ts,vue}", {
      cwd: pkgsRoot,
      absolute: true,
      onlyFiles: true
    })
  );
  const bundle = await rollup({
    input,
    plugins: [
      VueMacros({
        setupComponent: false,
        setupSFC: false,
        plugins: {
          vue: pluginVue({
            isProduction: true
          }),
          vueJsx: pluginVueJsx()
        }
      }),
      // a summary plugin using node parsing algorithm to locate modules, used for nodes_ Using third-party modules in modules
      nodeResolve({
        // specify the extension of the file that the plugin will operate on
        extensions: [".mjs", ".js", ".json", ".ts"]
      }),
      // https://github.com/rollup/rollup-plugin-commonjs
      commonjs(),
      esbuild({
        // map compressed or converted code back to the original source code
        sourceMap: true,
        target: "es2018",
        // add additional loaders
        loaders: {
          ".vue": "ts"
        }
      }),
      terser({
        // compress: {
        //   drop_console: true
        // },
        mangle: false, // Disable variable name obfuscation
        output: {
          beautify: true, // Beautify output
          comments: false // Delete all comments
        }
      }),
      dts({
        entryRoot: pkgsRoot,
        outDir: resolve(buildOutput, "types"),
        tsconfigPath: resolve(projRoot, "tsconfig.json"),
        cleanVueFileName: true,
        // Now there is no need for alias conversion, we will all use relative paths
        // aliasesExclude: Object.keys(getPackageSpacesMap())
        beforeWriteFile: (filePath, content) => {
          // transform
          const paths = writeTsTypesPath(filePath);
          const code = writeTsTypesContent(content, filePath);
          return {
            filePath: paths,
            content: code
          };
        }
      })
    ],
    external: await generateExternal({ full: false }),
    // setting this option to false will generate larger packages, but it may improve build performance
    treeshake: false
  });
  await writeBundles(
    bundle,
    buildConfigEntries.map(([module, config]): OutputOptions => {
      return {
        // Specify the format of the generated package
        format: config.format,
        // The directory for all generated blocks. If multiple blocks are generated, this option is required
        dir: config.output.path,
        // Export Mode
        exports: module === "cjs" ? "named" : undefined,
        // very critical, This mode does not create as few blocks as possible,
        //  but instead uses the original module name as the file name to create separate blocks for all modules
        preserveModules: true,
        // The directory path of the input module should be stripped from the output.dir path
        preserveModulesRoot: libraryRoot,
        sourcemap: true,
        // very important
        entryFileNames: (chunkInfo) => {
          const isFileVue = chunkInfo.name?.endsWith(".vue");
          if (isFileVue && chunkInfo.name) {
            const paths = chunkInfo.name.split("/");
            const lastFileName = paths.pop() as string;
            const name = lastFileName.split(".")[0];
            return `${paths.join("/")}/${name}.${config.ext}`;
          }
          return `[name].${config.ext}`;
        }
      };
    })
  );
};
