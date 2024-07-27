/*
 * @Date: 2024-01-16 19:00:26
 * @Description: Modify here please
 */
import { resolve } from "path";

// 项目目录
export const projRoot = resolve(__dirname, "..", "..", "..");

// 项目名称
export const docsDirName = "docs";

// 文档库目录
export const docRoot = resolve(projRoot, docsDirName);

export const vpRoot = resolve(docRoot, ".vitepress");
