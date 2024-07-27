/*
 * @Date: 2024-01-16 19:00:26
 * @Description: Modify here please
 */
import { defineConfig } from "vitepress";
import { head } from "./config/head";
import { mdPlugin } from "./config/plugins";
export default defineConfig({
  title: "Fish Bubble",
  description: "A desktop component library based on Vue 3.0 prepared for developers",
  lang: "cn-ZH",
  lastUpdated: false,
  outDir: "./dist",
  head,
  themeConfig: {
    logo: "/fb-logo.png",
    siteTitle: "",
    outline: {
      level: [2, 3],
      label: "页面导航"
    },
    socialLinks: [{ icon: "github", link: "https://github.com/u-fish-bubble/fish-bubble-design" }],
    nav: [
      {
        text: "指南",
        link: "/guide/installation",
        activeMatch: "/guide/"
      },
      { text: "组件", link: "/components/button", activeMatch: "/components/" },
      { text: "扩展", link: "/functions/extend", activeMatch: "/functions/" }
    ],
    sidebar: {
      "/components/": [
        {
          text: "基础组件",
          items: [
            { text: "Button 按钮", link: "/components/button" },
            { text: "Icon 图标", link: "/components/icon" }
          ]
        },
        {
          text: "数据录入",
          items: [
            { text: "Select 选择器", link: "/components/select" },
            { text: "Input 输入框", link: "/components/input" },
            { text: "Checkbox 多选框", link: "/components/checkbox" },
            { text: "ImgCaptcha 图文验证码", link: "/components/imgCaptcha" }
          ]
        },
        {
          text: "数据展示",
          items: [
            { text: "Image 图片", link: "/components/image" },
            { text: "Tag 标签", link: "/components/tag" }
          ]
        },
        {
          text: "反馈",
          items: [
            { text: "Dialog 对话框", link: "/components/dialog" },
            { text: "Message 全局提示", link: "/components/message" },
            { text: "Prompt 确认框", link: "/components/prompt" },
            { text: "Popover 气泡卡片", link: "/components/popover" }
          ]
        }
      ],
      "/guide/": [
        { text: "Fish Bubble", link: "/guide/installation" },
        { text: "快速开始", link: "/guide/quickstart" },
        { text: "定制主题", link: "/guide/theming" },
        { text: "国际化", link: "/guide/i18n" },
        { text: "暗黑模式", link: "/guide/dark" }
      ],
      "/functions/": [
        { text: "扩展", link: "/functions/extend" },
        {
          text: "基础",
          items: [
            { text: "unrefElement", link: "/functions/unrefElement" },
            { text: "onClickOutside", link: "/functions/onClickOutside" },
            { text: "useDebounceFn", link: "/functions/useDebounceFn" },
            { text: "useThrottleFn", link: "/functions/useThrottleFn" },
            { text: "useSubmitFn", link: "/functions/useSubmitFn" }
          ]
        },
        {
          text: "浏览器",
          items: [
            { text: "useEventListener", link: "/functions/useEventListener" },
            { text: "useResizeObserver", link: "/functions/useResizeObserver" }
          ]
        },
        {
          text: "工具集",
          items: [
            { text: "is判断", link: "/functions/is" },
            { text: "字符串", link: "/functions/stringUtil" },
            { text: "数组", link: "/functions/arrayUtil" }
          ]
        }
      ]
    }
  },
  markdown: {
    headers: {
      level: [0, 0]
    },
    // light: #f9fafb, dark: --vp-code-block-bg
    theme: { light: "github-light", dark: "github-dark" },
    config: (md) => mdPlugin(md)
  }
});
