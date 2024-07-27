/*
 * @Date: 2024-01-03 17:10:36
 * @Description: Modify here please
 */
import path from "path";
import consola from "consola";

import { copy } from "fs-extra";
import { readdirSync, statSync, unlinkSync, copyFileSync, writeFileSync } from "fs";
import { mkdir } from "fs/promises";

import { dest, parallel, series, src } from "gulp";
import gulpSass from "gulp-sass";
import dartSass from "sass";
import autoprefixer from "gulp-autoprefixer";
import cleanCSS from "gulp-clean-css";

import { epOutput, pkgsRoot } from "../build/core/constants";
import { withTaskName, run } from "../build/core";
import { buildConfig, Module } from "../build/utils";

// Directory of temporary style files generated
const distFolder = path.resolve(__dirname, "dist");

// The style file path of the component
const componentScssFiles: string[] = [];

// Exclude files
const excludeFiles = async () => {
  const walkDir = async (dir: string) => {
    // Return the file name or file object in the directory
    readdirSync(dir).forEach((file) => {
      const filePath = path.join(dir, file);
      // Is it a folder
      if (statSync(filePath).isDirectory()) {
        walkDir(filePath);
      } else {
        const newPath = filePath.replace(/\\/g, "/");

        let isDeleted = false;
        // 排除
        isDeleted = ["node_modules"].some((exclude) => newPath.includes(exclude));

        if (newPath.includes("/_styles/")) {
          // 排除
          const regex = /.*_styles\/(?!common\/|core\/).*\.css$/;
          // Not handled  _styles/**/*.css

          // Only handled _styles/*.css
          isDeleted = !newPath.match(regex);
        }

        if (isDeleted) {
          unlinkSync(filePath);
          consola.warn(`Deleted file ${filePath}`);
        }
      }
    });
  };
  await walkDir(distFolder);
};

// Copy the packaged CSS file to the file package under the official package
const copyCssDir = (cb) => {
  const copyTypes = (module: Module) => {
    const targetPath = path.resolve(buildConfig[module].output.path, "components");
    // Recursive replication
    return copy(distFolder, targetPath, { recursive: true });
  };

  Promise.all([copyTypes("esm"), copyTypes("cjs")])
    .then(() => {
      cb();
    })
    .catch((error) => {
      cb(error);
    });
};

/** create theme-chalk */
const buildThemeChalk = () => {
  const sass = gulpSass(dartSass);
  return (
    src(["**/*.scss", "!node_modules/**/*"], {
      cwd: path.resolve(pkgsRoot, "components")
    })
      .on("data", function (file) {
        // consola.log("Processing file:", file.path);
        componentScssFiles.push(file.path);
      })
      // not use sass.sync().on('error', sass.logError) to throw exception
      .pipe(sass.sync())

      // https://github.com/sindresorhus/gulp-autoprefixer
      .pipe(autoprefixer({ cascade: false }))
      // https://www.npmjs.com/package/gulp-clean-css
      // .pipe(
      //   cleanCSS({}, (details) => {
      //     consola.success(
      //       `${chalk.cyan(details.name)}: ${chalk.yellow(details.stats.originalSize / 1000)} KB -> ${chalk.green(details.stats.minifiedSize / 1000)} KB`
      //     );
      //   })
      // )
      // output
      .pipe(dest(distFolder))
  );
};

// Copy the original scss file to temporary dist
const copyOriginScssFiles = async () => {
  const copys = (sourcePath, fileName) => {
    try {
      const newPath = path.resolve(distFolder, fileName);
      copyFileSync(sourcePath, newPath);
      consola.success(`${sourcePath} was copied to ${newPath}`);
    } catch (err) {
      consola.error(err);
    }
  };
  componentScssFiles.forEach((item) => {
    const paths = item.split("\\components\\");
    copys(item, paths[1]);
  });
};

// Generate overall style file  scss ( Very important )
const createTotalScssTheme = async () => {
  // 查询必须是组件的scss文件
  const components = componentScssFiles.filter((item) => {
    // 基础样式文件 和 组件本身的样式文件
    if (item.includes("_styles")) {
      return item.includes("_styles\\base.scss");
    } else {
      return item.includes("index.scss");
    }
  });
  // consola.log(components);

  let scssTotalCode = "";
  components.forEach((item) => {
    // item =>  'D:\\fish-bubble-design\\packages\\components\\button\\style\\index.scss',
    const paths = item.split("\\components\\");
    const currentDir = path.resolve(epOutput, "dist");
    const targetFilePath = path.join(buildConfig.cjs.output.path, "components", paths[1]);

    // 计算相对路径
    const relativePath = path.relative(currentDir, targetFilePath);
    // consola.log(currentDir, targetFilePath, relativePath);

    const newPath = relativePath.replace(/\\/g, "/");

    scssTotalCode = scssTotalCode + `// ${path.join("components", paths[1])}\n @use "${newPath}" as *;\n`;
  });

  // Write an overall entry scss
  const scssTotalPath = path.resolve(epOutput, "dist", "index.scss");

  try {
    writeFileSync(scssTotalPath, scssTotalCode);
    consola.success("The file has been written!");
  } catch (err) {
    consola.error("Error:", err);
  }
};

// Generate overall style file  css ( Very important )
const createTotalCssTheme = async () => {
  const currentDir = path.resolve(epOutput, "dist", "index.scss");
  const sass = gulpSass(dartSass);
  return (
    src(currentDir)
      .pipe(sass.sync())
      // https://github.com/sindresorhus/gulp-autoprefixer
      .pipe(autoprefixer({ cascade: false }))
      // https://www.npmjs.com/package/gulp-clean-css
      .pipe(cleanCSS({}))
      // output
      .pipe(dest(path.resolve(epOutput, "dist")))
  );
};

/**
 * Generate a global variable file and place it in the dist entry,
 * so that custom themes can be implemented through SCSS variables
 */
const createCommonVarTheme = async () => {
  const commonVarFilePath = componentScssFiles.find((item) => item.includes("_styles\\common\\var.scss"));
  if (!commonVarFilePath) return;
  const paths = commonVarFilePath.split("\\components\\");
  const currentDir = path.resolve(epOutput, "dist");
  const targetFilePath = path.join(buildConfig.cjs.output.path, "components", paths[1]);
  // 计算相对路径
  const relativePath = path.relative(currentDir, targetFilePath);

  // consola.log(commonVarFilePath, relativePath);

  const newPath = relativePath.replace(/\\/g, "/");

  const scssVarCode = `@forward "${newPath}";\n`;

  const scssVarPath = path.resolve(epOutput, "dist", "common-var.scss");

  try {
    writeFileSync(scssVarPath, scssVarCode);
    consola.success("The file has been written");
  } catch (err) {
    consola.error("Error:", err);
  }
};

// !!! You should pay attention to this order
const build = series(
  withTaskName("clean", () => run("pnpm run -C ./build-theme clean")),

  withTaskName("createOutput", () => mkdir(path.resolve(epOutput, "dist"), { recursive: true })),
  // create theme-chalk
  parallel(withTaskName("buildThemeChalk", buildThemeChalk)),
  parallel(withTaskName("excludeFiles", excludeFiles)),
  parallel(withTaskName("copyOriginScssFiles", copyOriginScssFiles)),
  // Copy temporary style package to formal package
  parallel(withTaskName("copyCssDir", copyCssDir)),
  // Generate overall style file
  parallel(
    withTaskName("createTotalScssTheme", createTotalScssTheme),
    withTaskName("createTotalCssTheme", createTotalCssTheme),
    withTaskName("createCommonVarTheme", createCommonVarTheme)
  )
);

export default build;
