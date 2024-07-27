---
title: arrayUtil
---

# 数组操作

## getTreePaths

通过叶子节点 id ，寻找包含该叶子节点的整条路径

#### 参数

1. `datas`(T[] | null) 数据源
2. `id`(string | number) 需要查询的ID
3. `optionKeys`{ // 配置项
<li> childrenKey: string; // 子节点对应在数组数据里面的字段, 默认为 children</li>
<li>parentKey: string // （需要查询的ID）对应在数组数据里面的字段, 默认为 id</li>
<p>}</p>

#### 返回

`Array`路径数组

#### 例子

```typescript
import { getTreePaths } from "fish-bubble-design/shared";

const data = [
  {
    name: "1",
    id: "1",
    children: [
      {
        name: "2",
        id: "2",
        children: [
          {
            name: "3",
            id: "3"
          }
        ]
      }
    ]
  },
  {
    name: "4",
    id: "4"
  }
];

const rows = getTreePaths(data, "2");
// => [row]
```

## getTreeByRow

通过id查找在树结构中的row

#### 参数

1. `datas`(T[] | null) 数据源
2. `id`(string | number) 需要查询的ID
3. `optionKeys`{ // 配置项
<li> childrenKey: string; // 子节点对应在数组数据里面的字段, 默认为 children</li>
<li>parentKey: string // （需要查询的ID）对应在数组数据里面的字段, 默认为 id</li>
<p>}</p>

#### 返回

(\*): 返回数组 array的匹配项元素

#### 例子

```typescript
import { getTreeByRow } from "fish-bubble-design/shared";

const data = [
  {
    name: "1",
    id: "1",
    children: [
      {
        name: "2",
        id: "2",
        children: [
          {
            name: "3",
            id: "3"
          }
        ]
      }
    ]
  },
  {
    name: "4",
    id: "4"
  }
];

const rows = getTreeByRow(data, "3");
// => row
```
