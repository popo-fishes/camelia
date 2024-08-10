---
order: 3
title: Array
group:
  title: 工具集
  order: 2
---

# 数组操作

## getTreePaths

通过叶子节点 id ，寻找包含该叶子节点的整条路径

#### 参数

1. `datas`(T[] | null) 数据源
2. `id`(string | number) 需要查询的 ID
3. `optionKeys`(obj)

```yml {3,6-9,12,13}
optionKeys:
  - childrenKey: 子节点对应在数组数据里面的字段, 默认为 children
    type: string
  - parentKey: （需要查询的ID）对应在数组数据里面的字段, 默认为 id
    type: string
```

#### 返回

`Array`路径数组

#### 例子

```typescript
import { getTreePaths } from "camelia/shared";

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

通过 id 查找在树结构中的 row

#### 参数

1. `datas`(T[] | null) 数据源
2. `id`(string | number) 需要查询的 ID
3. `optionKeys`(obj)

```yml {3,6-9,12,13}
optionKeys:
  - childrenKey: 子节点对应在数组数据里面的字段, 默认为 children
    type: string
  - parentKey: （需要查询的ID）对应在数组数据里面的字段, 默认为 id
    type: string
```

#### 返回

(\*): 返回数组 array 的匹配项元素

#### 例子

```typescript
import { getTreeByRow } from "camelia/shared";

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
