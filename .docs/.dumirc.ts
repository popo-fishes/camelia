/*
 * @Date: 2024-07-28 21:01:55
 * @Description: Modify here please
 */
import { defineConfig } from "dumi";
import path from "path";
export default defineConfig({
  outputPath: "docs-dist",
  favicons: ["/fb-logo.ico"],
  alias: {
    "fish-remix": path.join("../", "packages/fish-remix/index.ts"),
    "fish-remix-shared": path.join("../", "packages/shared/index.ts")
  },

  themeConfig: {
    name: "Fish Remix",
    logo: "/images/logo.svg",
    socialLinks: {
      github: "https://github.com/u-fish-bubble/fish-remix"
    },
    hero: {
      actions: [{ text: "🚀🚀 开始吧 →", link: "/guide" }],

      features: [
        {
          image: "🎉",
          imageType: "primary",
          row: 5,
          title: "文档",
          description:
            "我们全面覆盖了 fish-remix 的各个方面，为开发者提供明确的方向指导和深入的设计理念，旨在启发您的洞见，让您的开发之路如马踏平川般顺畅。"
        },
        {
          image: "🛩",
          imageType: "primary",
          row: 5,
          title: "组件",
          description: "我们的目标是以精简的代码实现功能，追求代码的简洁性和效率。"
        },
        {
          image: "🏠",
          imageType: "primary",
          row: 5,
          title: "工具库",
          description:
            "众多的精致小工具，宛如开发过程中的得力助手，随召随到，让您掌握神奇的飞镖，精准命中百步之外的目标。"
        }
      ]
    },

    nav: [
      {
        title: "指南",
        link: "/guide"
      },
      {
        title: "组件",
        link: "/libraries"
      },
      {
        title: "扩展",
        link: "/extend"
      }
    ]
  }
});
