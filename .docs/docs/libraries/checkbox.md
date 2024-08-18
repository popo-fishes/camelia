---
order: 2
group:
  title: 数据录入
  order: 2
---

# Checkbox 多选框

在一组备选项中进行多选。

## 基础用法

简单的 checkbox, 设置 disabled 属性可以禁用。

```jsx
import React, { useState } from "react";
import { Checkbox } from "camelia";

export default () => {
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  return (
    <div>
      <Checkbox checked={checked} onChange={(v) => setChecked(v)}>
        Checkbox
      </Checkbox>
      <Checkbox checked={checked2} disabled>
        Checkbox2
      </Checkbox>
    </div>
  );
};
```

## 多选框组

多个勾选框绑定到同一个数组的情景，通过是否勾选来表示这一组选项中选中的项

```jsx
import React, { useState } from "react";
import { Checkbox } from "camelia";

export default () => {
  const [checkList, setCheckList] = useState([]);

  const [checkList2, setCheckList2] = useState(["Pear"]);

  const plainOptions = ["Apple", "Pear", "Orange"];

  const options = [
    { label: "Apple 1", value: "Apple" },
    { label: "Pear 2", value: "Pear" },
    { label: "Orange 3", value: "Orange", disabled: true }
  ];

  return (
    <>
      <div className="mb-4">
        <Checkbox.Group options={plainOptions} value={checkList} onChange={(v) => setCheckList(v)} />
      </div>
      <div className="mb-4">
        <Checkbox.Group options={options} value={checkList2} onChange={(v) => setCheckList2(v)} />
      </div>
    </>
  );
};
```

## 全选

indeterminate 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果

```jsx
import React, { useState } from "react";
import { Checkbox } from "camelia";

export default () => {
  const [checkedvalue, setcheckedvalue] = useState([]);

  const plainOptions = ["Apple", "Pear", "Orange"];

  const isIndeterminate = checkedvalue.length > 0 && checkedvalue.length < plainOptions.length;

  const checkAll = plainOptions.length === checkedvalue.length;

  const handleCheckAllChange = (val) => {
    setcheckedvalue(val ? plainOptions : []);
  };

  const handleCheckedCitiesChange = (value) => {
    setcheckedvalue(value);
  };

  return (
    <div>
      <Checkbox checked={checkAll} indeterminate={isIndeterminate} onChange={handleCheckAllChange}>
        Check all
      </Checkbox>
      <Checkbox.Group options={plainOptions} onChange={handleCheckedCitiesChange} value={checkedvalue} />
    </div>
  );
};
```

## 受控的 Checkbox

联动 checkbox。

```jsx
import React, { useState } from "react";
import { Button, Checkbox } from "camelia";
const App = () => {
  const [checked, setChecked] = useState(true);
  const [disabled, setDisabled] = useState(false);
  const toggleChecked = () => {
    setChecked(!checked);
  };
  const toggleDisable = () => {
    setDisabled(!disabled);
  };
  const onChange = (v) => {
    setChecked(v);
  };
  const label = `${checked ? "Checked" : "Unchecked"}-${disabled ? "Disabled" : "Enabled"}`;
  return (
    <>
      <div
        style={{
          marginBottom: "20px"
        }}
      >
        <Checkbox checked={checked} disabled={disabled} onChange={onChange}>
          {label}
        </Checkbox>
      </div>
      <div>
        <Button type="primary" size="small" onClick={toggleChecked}>
          {!checked ? "Check" : "Uncheck"}
        </Button>
        <Button
          style={{
            margin: "0 10px"
          }}
          type="primary"
          size="small"
          onClick={toggleDisable}
        >
          {!disabled ? "Disable" : "Enable"}
        </Button>
      </div>
    </>
  );
};
export default App;
```

## API

### Checkbox props

| 属性名        | 说明                           | 类型                 | 默认值 |
| ------------- | ------------------------------ | -------------------- | ------ |
| checked       | 指定当前是否选中               | boolean              | —      |
| children      | 内容                           | React.ReactNode      | —      |
| name          | 原生 name 属性                 | string               | —      |
| indeterminate | 设置不确定状态，仅负责样式控制 | boolean              | false  |
| disabled      | 是否禁用                       | boolean              | false  |
| wave          | 是否需要点击波浪效果           | boolean              | true   |
| onChange      | 变化时的回调函数               | (v: boolean) => void | true   |

### Checkbox.Group

| 属性名   | 说明             | 类型                             | 默认值 |
| -------- | ---------------- | -------------------------------- | ------ |
| value    | 指定选中的选项   | (string \| number)[]             | —      |
| options  | 指定可选项       | string[] \| number[] \| Option[] | []     |
| disabled | 是否禁用         | boolean                          | false  |
| onChange | 变化时的回调函数 | (v: []) => void                  | true   |

### Option

```ts
interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}
```
