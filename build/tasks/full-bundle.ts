/*
 * @Date: 2023-12-30 14:04:23
 * @Description: Modify here please
 */
import path from "path";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import { rollup } from "rollup";
import commonjs from "@rollup/plugin-commonjs";

import babel from "@rollup/plugin-babel";

import esbuild, { minify as minifyPlugin } from "rollup-plugin-esbuild";
import { parallel } from "gulp";

import { epOutput, libraryRoot } from "../core/constants";

import { generateExternal, withTaskName, writeBundles, PKG_BRAND_NAME, getVersion } from "../core";

const version = getVersion();

const banner = `/*! ${PKG_BRAND_NAME} v${version} */\n`;

function formatBundleFilename(name: string, minify: boolean, ext: string) {
  return `${name}${minify ? ".min" : ""}.${ext}`;
}

async function buildFullEntry(minify: boolean) {
  const plugins = [
    nodeResolve({
      extensions: [".js", ".jsx", ".ts", ".tsx"]
    }),
    commonjs(),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      presets: [
        [
          "@babel/preset-react",
          {
            runtime: "automatic" // Use the new JSX conversion
          }
        ]
      ]
    }),
    // Not too much introduction: https://github.com/egoist/rollup-plugin-esbuild
    esbuild({
      exclude: [],
      sourceMap: minify,
      target: "es2018",
      define: {
        "process.env.NODE_ENV": JSON.stringify("production")
      },
      treeShaking: true,
      legalComments: "eof"
    })
  ];

  // shrink Bundle
  if (minify) {
    plugins.push(
      minifyPlugin({
        target: "es2018",
        sourceMap: true
      })
    );
  }

  const bundle = await rollup({
    input: path.resolve(libraryRoot, "index.ts"),
    plugins,
    external: await generateExternal({ full: true }),
    treeshake: true
  });

  await writeBundles(bundle, [
    {
      format: "umd",
      file: path.resolve(epOutput, "dist", formatBundleFilename("index.full", minify, "js")),
      exports: "named",
      name: PKG_BRAND_NAME,
      globals: {
        react: "React"
      },
      sourcemap: minify,
      banner
    },
    {
      format: "esm",
      file: path.resolve(epOutput, "dist", formatBundleFilename("index.full", minify, "mjs")),
      sourcemap: minify,
      banner
    }
  ]);
}
const buildFull = (minify: boolean) => async () => Promise.all([buildFullEntry(minify)]);

export const buildFullBundle = parallel(withTaskName("buildFullMinified", buildFull(true)), withTaskName("buildFull", buildFull(false)));
