/*
 * @Date: 2024-07-28 21:01:55
 * @Description: Modify here please
 */
import { defineConfig } from 'dumi';

export default defineConfig({
  outputPath: 'docs-dist',
  favicons: ['/images/logo.svg'],

  themeConfig: {
    name: 'Fish Remix',
    logo: '/images/logo.svg',

    hero: {
      actions: [{ text: '🚀🚀 开始吧 →', link: '/daily' }],

      features: [
        {
          image: '🎉',
          imageType: 'primary',
          row: 3,
          title: '文档',
          description:
            '我们全面覆盖了 fish-remix 的各个方面，为开发者提供明确的方向指导和深入的设计理念，旨在启发您的洞见，让您的开发之路如马踏平川般顺畅。',
        },
        {
          image: '🛩',
          imageType: 'primary',
          row: 3,
          title: '组件',
          description:
            '我们的目标是以精简的代码实现功能，追求代码的简洁性和效率。',
        },
        {
          image: '🏠',
          imageType: 'primary',
          row: 3,
          title: '工具库',
          description:
            '众多的精致小工具，宛如开发过程中的得力助手，随召随到，让您掌握神奇的飞镖，精准命中百步之外的目标。',
        },
        {
          image: '🏆',
          imageType: 'primary',
          row: 3,
          title: '布局',
          description:
            '我们汇集了大量常用页面和布局，旨在减轻开发者的重复负担，让您得以专心于逻辑的构建，以更少的努力实现更大的成效。',
        },
      ],
    },

    nav: [
      {
        title: '常用技巧',
        link: '/daily',
      },
      {
        title: '开发相关',
        link: '/development',
      },
      {
        title: '组件库',
        link: '/libraries',
      },
    ],
  },
});
