/*
 * @Date: 2024-07-28 21:01:55
 * @Description: Modify here please
 */
import { defineConfig } from "dumi";
import path from "path";

const rootPath = path.resolve(__dirname, "../"); // 获取项目根目录
export default defineConfig({
  outputPath: "docs-dist",
  favicons: ["/logo.ico"],

  alias: {
    "camelia/shared": path.join(rootPath, "packages/shared/index.ts"),
    camelia: path.join(rootPath, "packages/camelia/index.ts")
  },

  themeConfig: {
    name: "Camelia",
    logo: "/logo1.png",
    socialLinks: {
      github: "https://github.com/popo-fishes/camelia"
    },
    rtl: true,
    prefersColor: { default: "light", switch: false },
    hero: {
      actions: [{ text: "🚀🚀 开始吧 →", link: "/guide" }],

      features: [
        {
          image: "📃",
          imageType: "primary",
          row: 5,
          title: "文档",
          description:
            "我们全面覆盖了 Camelia 的各个方面，为开发者提供明确的方向指导和深入的设计理念，旨在启发您的洞见，让您的开发之路如马踏平川般顺畅。"
        },
        {
          image: "/images/zujian.png",
          imageType: "primary",
          row: 5,
          title: "组件",
          description: "我们的目标是以精简的代码实现功能，追求代码的简洁性和效率。"
        },
        {
          image: "🔧",
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
  },

  chainWebpack(memo, { env, webpack }) {
    memo.resolve.byDependency.set("commonjs", {});
  }
});
