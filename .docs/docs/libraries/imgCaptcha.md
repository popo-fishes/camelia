---
order: 3
group:
  title: 数据录入
  order: 2
---

<style>
  .ImgCaptchawrap {
    position: relative;
    margin-bottom: 15px;
  }
  .ImgCaptchacode {
    position: absolute;
    right: 12px;
    top: 5px;
  }
</style>

# ImgCaptcha 图文验证码

常用于表单需要输入验证码，在做下一步事情。

## 基础用法

生成一个图文验证器。点击图文可以切换

```jsx
import React, { useState } from "react";
import { ImgCaptcha } from "camelia";

export default () => {
  return (
    <div>
      <ImgCaptcha />
      <p>你还可以传递size控制长度</p>
      <ImgCaptcha width={130} size={6} />
      <p>你还可以传递type类型: blend: 数字字母混合 number:纯数字 letter:纯字母</p>
      <div style={{ display: "flex" }}>
        <ImgCaptcha width={100} size={5} type="letter" style={{ marginRight: "20px" }} />
        <ImgCaptcha width={100} size={5} type="blend" />
      </div>
    </div>
  );
};
```

## 配合输入框使用

你可以使用 validate 方法来获取校验结果

```jsx
import React, { useState, useRef } from "react";
import { Input, ImgCaptcha, Button, message } from "camelia";

export default () => {
  // 表单
  const [formData, setformData] = useState({ codeImg: "" });

  // 图文验证码ref
  const imgCaptchaRef = useRef(null);

  /** 输入图文验证码 */
  const onChangeCodeImg = (value) => {
    /** 只能输入数字 */
    const newText = value.replace(/[^\d]+/, "");
    setformData({
      codeImg: newText
    });
  };

  const onSubmit = () => {
    if (!!imgCaptchaRef.current && !imgCaptchaRef.current.validate(formData.codeImg)) {
      message.warning("请输入正确的图形验证码");
      return;
    } else {
      message.success("输入正确");
    }
  };

  return (
    <>
      <div className="ImgCaptchawrap">
        <Input
          size="large"
          onChange={onChangeCodeImg}
          value={formData.codeImg}
          placeholder="请输入图形验证码"
          maxlength={4}
        />
        <ImgCaptcha ref={imgCaptchaRef} size={4} className="ImgCaptchacode" />
      </div>
      <div>
        <Button type="primary" onClick={onSubmit}>
          验证
        </Button>
      </div>
    </>
  );
};
```

## API

### Props

| 属性名    | 说明             | 类型                      | 默认值 |
| --------- | ---------------- | ------------------------- | ------ |
| size      | 验证码的长度     | number                    | 4      |
| width     | 宽度             | number                    | 95     |
| height    | 高度             | number                    | 38     |
| type      | 类型             | `blend` `number` `letter` | number |
| className | 语义化结构 class | string                    | —      |

### Methods

| 名称     | 说明         | 类型     |
| -------- | ------------ | -------- |
| validate | 获取校验结果 | Function |
