/*
 * @Date: 2023-12-18 13:55:45
 * @Description: Modify here please
 */

export * from "./constants";

/**
 * fork from {@link https://github.com/sindresorhus/escape-string-regexp}
 */
export const escapeStringRegexp = (string = "") => string.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
