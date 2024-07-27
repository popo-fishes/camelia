/*
 * @Date: 2023-12-29 21:58:31
 * @Description: Modify here please
 */
import type { ProjectManifest } from "@pnpm/types";

export const getPackageManifest = (pkgPath: string) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  return require(pkgPath) as ProjectManifest;
};

export const getPackageDependencies = (pkgPath: string): Record<"dependencies" | "peerDependencies", string[]> => {
  const manifest = getPackageManifest(pkgPath);
  const { dependencies = {}, peerDependencies = {} } = manifest;

  return {
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies)
  };
};

export const excludeFiles = (files: string[]) => {
  const excludes = ["node_modules", "test", "mock", "gulpfile", "dist"];
  return files.filter((path) => !excludes.some((exclude) => path.includes(exclude)));
};
