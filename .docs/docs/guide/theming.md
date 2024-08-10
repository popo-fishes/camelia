---
title: 定制主题
order: 3
---

## 更换主题色

`camellia`设计规范和技术上支持灵活的样式定制，以满足业务和品牌上多样化的视觉需求，包括但不限于全局样式（主色、圆角、边框）和指定组件的视觉定制

### 通过 SCSS 变量

`camellia`使用 SCSS 编写而成。 你可以在 camellia/dist/common-var.scss 文件中查找 SCSS 变量。

#### 然后覆盖它

```typescript
/**
 *  如果你的项目也使用了 SCSS，可以直接修改 camellia 的样式变量。
 *  新建一个样式文件，例如 styles/common.scss
  */

@use 'camellia/dist/common-var.scss' with (
  // 这样主题色就被更改啦，
  $colors: (
    'primary': (
      'base': red,
    ),
  ),
);
// 然后在你的项目入口文件中，导入这个样式文件以替换 camellia 内置的 CSS
```

### 通过 CSS 变量

CSS 变量是一个非常有用的功能, 你可以从[`css自定义变量`](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
了解更多信息

这意味着你可以动态地改变组件内的个别变量，以便更好地自定义组件样式，而不需要修改 SCSS 文件重新编译一次。

就像这样：

```css
:root {
  --yp-color-primary: red;
}
```

如果你只想自定义一个特定的组件，只需为某些组件单独添加内联样式。

```html
<button style="--yp-button-bg-color: red">Add</button>
```

不过更加推荐你在类名下添加自定义 css 变量，而不是在全局的 `:root` 下

```css
.custom-class {
  --yp-button-bg-color: red;
}
```

如果您想要通过 js 控制 css 变量，可以这样做：

```ts
// document.documentElement 是全局变量时
const el = document.documentElement;
// const el = document.getElementById('xxx')

// 获取 css 变量
getComputedStyle(el).getPropertyValue(`--yp-color-primary`);

// 设置 css 变量
el.style.setProperty("--yp-color-primary", "red");
```
