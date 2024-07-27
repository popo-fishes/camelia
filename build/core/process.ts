/*
 * @Date: 2023-12-29 21:01:01
 * @Description: Modify here please
 */
import { spawn } from "child_process";
import chalk from "chalk";
import consola from "consola";
import { projRoot } from "./constants";

export const run = async (command: string, cwd: string = projRoot) =>
  new Promise<void>((resolve, reject) => {
    const [cmd, ...args] = command.split(" ");
    consola.info(`run: ${chalk.green(`${cmd} ${args.join(" ")}`)}`);
    // http://www.nodejs.com.cn/api/child_process.html#child_processspawncommand-args-options
    const app = spawn(cmd, args, {
      cwd, // The current working directory of the child process
      stdio: "inherit", // Standard input-output configuration for child processes
      shell: process.platform === "win32"
    });

    // !!!exit
    const onProcessExit = () => app.kill("SIGHUP");

    app.on("close", (code) => {
      process.removeListener("exit", onProcessExit);

      if (code === 0) resolve();
      else reject(new Error(`Command failed. \n Command: ${command} \n Code: ${code}`));
    });
    process.on("exit", onProcessExit);
  });
