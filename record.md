<!--
 * @Date: 2024-01-02 09:35:20
 * @Description: Modify here please
-->

```shell
  发布之前需要 查看当前使用的 NPM 源地址 才能发布成功，不能发布到非官方源上

  npm config get registry： 如果显示结果为 https://registry.npmjs.org/，则表示当前已经使用了官方源

  切换官方源
  npm config set registry https://registry.npmjs.org/

  切换淘宝源：
  npm config set registry https://registry.npmmirror.com
```

### 注意点

```shell
1. 防止构建出问题，下面包的版本最好锁死
/**
   "vue": "3.4.0",
   "unplugin-vue-macros": "2.7.7",
   "@vitejs/plugin-vue": "5.0.1",
   "@vitejs/plugin-vue-jsx": "3.1.0",
 */

2. 开发组件规范
...

3. 你应该解决控制台开发环境的所有警告 || 错误信息！

```
