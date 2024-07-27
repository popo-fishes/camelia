/*
 * @Date: 2024-01-16 19:01:18
 * @Description: Modify here please
 */
import { resolve } from "path";
import { defineConfig } from "vite";
import type { Alias } from "vite";

import { readFileSync } from "fs";
import vueJsx from "@vitejs/plugin-vue-jsx";
import VueMacros from "unplugin-vue-macros/vite";
import Components from "unplugin-vue-components/vite";

import { libraryPackage, projRoot } from "../build/core/constants";
const docRoot = resolve(projRoot, "docs");
const docPackage = resolve(docRoot, "package.json");

const alias: Alias[] = [
  {
    find: "~/",
    replacement: `${resolve(__dirname, "./.vitepress/vitepress")}/`
  },
  {
    find: /^fish-bubble-design(\/(es|lib))?$/,
    replacement: resolve(projRoot, "packages/fish-bubble-design/index.ts")
  },
  {
    find: "fish-bubble-design/shared",
    replacement: resolve(projRoot, "packages/shared/index.ts")
  }
];
// if (process.env.DOC_ENV !== "production") {
//   alias.push(
//     {
//       find: /^fish-bubble-design(\/(es|lib))?$/,
//       replacement: resolve(projRoot, "packages/fish-bubble-design/index.ts")
//     },
//     {
//       find: "fish-bubble-design/shared",
//       replacement: resolve(projRoot, "packages/shared/index.ts")
//     }
//   );
// }

export default defineConfig(async () => {
  const { dependencies: epDeps } = JSON.parse(readFileSync(libraryPackage, "utf8"));
  const { dependencies: docsDeps } = JSON.parse(readFileSync(docPackage, "utf8"));

  const optimizeDeps = [...new Set([...Object.keys(epDeps), ...Object.keys(docsDeps)])].filter(
    (dep) => !dep.startsWith("@types/") && !["fish-bubble-design"].includes(dep)
  );

  return {
    server: {
      host: true,
      open: false,
      https: false
    },
    resolve: {
      alias
    },
    plugins: [
      VueMacros({
        setupComponent: false,
        setupSFC: false,
        plugins: {
          vueJsx: vueJsx()
        }
      }),
      // https://github.com/antfu/unplugin-vue-components
      Components({
        dirs: [".vitepress/vitepress/components"],
        allowOverrides: true,
        // allow auto import and register components used in markdown
        include: [/\.vue$/, /\.vue\?vue/, /\.md$/]
      })
    ],
    optimizeDeps: {
      include: optimizeDeps
    }
  };
});
