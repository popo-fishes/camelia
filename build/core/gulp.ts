/*
 * @Date: 2023-12-29 21:25:48
 * @Description: Modify here please
 */
import { buildRoot } from "./constants";
import { run } from "./process";

import type { TaskFunction } from "gulp";

// task
export const withTaskName = <T extends TaskFunction>(name: string, fn: T) => Object.assign(fn, { displayName: name });

// Create task
export const runTask = (name: string) => withTaskName(`shellTask:${name}`, () => run(`pnpm run start ${name}`, buildRoot));
