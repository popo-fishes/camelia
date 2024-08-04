/*
 * @Date: 2023-11-22 11:52:48
 * @Description: Modify here please
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "plugin:react-hooks/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2020
  },
  overrides: [
    {
      files: ["*.json", "*.json5", "*.jsonc"],
      parser: "jsonc-eslint-parser"
    },
    {
      files: ["**/*.md/*.js", "**/*.md/*.ts"],
      rules: {
        "no-console": "off",
        "import/no-unresolved": "off"
      }
    }
  ],
  rules: {
    // JavaScript/ESLint 推荐的规则
    "no-console": "off", // 不允许使用 console.log 等
    "no-unused-vars": "warn", // 不允许存在未使用的变量
    "no-undef": "off", // 不允许使用未定义的变量

    "no-mixed-spaces-and-tabs": "off",
    quotes: "off",
    "no-unsafe-optional-chaining": "off",
    "prefer-const": "off",
    // TypeScript/ESLint 推荐的规则
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-unused-vars": "warn", // 不允许存在未使用的 TypeScript 变量
    "@typescript-eslint/explicit-module-boundary-types": "off", // 允许不显式指定导出函数的返回类型
    "@typescript-eslint/no-explicit-any": "off", // 允许使用 any 类型
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-explicit-any": ["off"]
  },
  plugins: ["react-refresh"],
  ignorePatterns: ["node_modules/", "dist/"]
};
