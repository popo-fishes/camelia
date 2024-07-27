/*
 * @Date: 2023-11-22 11:52:48
 * @Description: Modify here please
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/vue3-essential", "plugin:jsonc/recommended-with-jsonc", "plugin:markdown/recommended", "@vue/typescript/recommended"],
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
    "no-console": "error", // 不允许使用 console.log 等
    "no-unused-vars": "warn", // 不允许存在未使用的变量
    "no-undef": "off", // 不允许使用未定义的变量

    // Vue/ESLint 推荐的规则
    // "vue/html-indent": ["error", 2], // HTML 缩进为 2 个空格
    "vue/attribute-hyphenation": "error", // 属性名使用连字符形式
    "vue/html-self-closing": "off", // 关闭自闭合标签要求，根据个人或团队喜好配置
    "vue/no-v-html": "off", // 允许使用 v-html 指令
    "vue/no-unused-components": "warn", // 不允许存在未使用的组件
    // 关闭名称校验
    "vue/multi-word-component-names": "off",
    "no-mixed-spaces-and-tabs": "off",
    quotes: "off",
    // TypeScript/ESLint 推荐的规则
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-unused-vars": "warn", // 不允许存在未使用的 TypeScript 变量
    "@typescript-eslint/explicit-module-boundary-types": "off", // 允许不显式指定导出函数的返回类型
    "@typescript-eslint/no-explicit-any": "off" // 允许使用 any 类型
  },
  plugins: ["vue"],
  ignorePatterns: ["node_modules/", "dist/", "vite-plugin"]
};
