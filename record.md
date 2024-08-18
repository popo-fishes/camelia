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

1. 开发组件规范

2. packages目录下的 所有文件夹 和 文件 都是中划线命名法，不要驼峰

3. 看见的所有文件夹前面带有 (_xx 或者带 “internal”名称) 代表是项目内部的东西，不属于暴露给用户的。

4. 你应该解决控制台开发环境的所有警告 || 错误信息！

```
