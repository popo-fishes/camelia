/*
 * @Date: 2024-01-17 11:14:15
 * @Description: Modify here please
 */
import { fileURLToPath } from "url";
import path, { dirname, resolve } from "path";
import consola from "consola";
import glob from "fast-glob";
import { writeFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 工程目录的入口
const projRoot = resolve(__dirname, "..");

/** packages目录 */
const pkgsRoot = resolve(projRoot, "packages");

const createFbScssTheme = async () => {
  const componentScssFiles = await glob("**/*.scss", {
    cwd: pkgsRoot,
    absolute: true,
    onlyFiles: true
  });

  // 查询必须是组件的scss文件
  const components = componentScssFiles.filter((item) => {
    // 基础样式文件 和 组件本身的样式文件
    if (item.includes("_styles")) {
      return item.includes("_styles/base.scss");
    } else {
      return item.includes("index.scss");
    }
  });
  let scssTotalCode = "// 这是自动生成的文件，不需要改动\n";
  components.forEach((item) => {
    // 计算相对路径
    const relativePath = path.relative(__dirname, item);
    const newPath = relativePath.replace(/\\/g, "/");

    scssTotalCode = scssTotalCode + ` @use "${newPath}" as *;\n`;
  });

  // Write an overall entry scss
  const scssTotalPath = path.resolve(__dirname, "style", "index.scss");

  try {
    writeFileSync(scssTotalPath, scssTotalCode);
    consola.success("The file has been written!");
  } catch (err) {
    consola.error("Error:", err);
  }
};

createFbScssTheme();
