---
order: 5
group:
  path: /db
  title: 开发数据库相关代码
  order: 40
---

# 前台传入参数解析

- 前台向后台传递参数的方式有两种

  - `GET`方式，在`URL`中传输，例如：`where_studentId=123&where_studentName_like=%tom%&orderBy=studentName,studentSex desc`
  - `POST`方式，将内容封装到`Json`中，只要符合`AntSearchListParams`格式，后面可以通过模板处理。

- 如果是单表操作，那么框架会自动生成 Service，大多时候，只用写 Sql 语句就可以了。
- 如果是多表操作，那么需要自己在自动生成 Service 代码中，定义新查询的函数，然后让 controller 调用就行。

## 1、传入方式

### 1.1 `GET`方式

> **前台传递参数说明**

例如：where_studentId=123&where_studentName_like=%tom%&orderBy=studentName,studentSex desc

- where 分为三段
  - 第一段：必须用 where 开头
  - 第二段：字段名，中间用驼峰形式的属性名，区分大小写，系统自动转成字段名。
  - 第三段：对比条件，如果为空表示=
- 排序
  - 用 orderBy 开头
  - 用驼峰的形式写字段名，并且会按照字符串的形式传入后台。

> controller 接受

调用 RequestAnalysis，自动解析出 request 中的查询条件

调用 whereBuilder，进行 sql 语句的拼装。

```java
    @RequestMapping("/hello")
    public List<StudentInfo> hello() {
        HttpServletRequest request=  RequestContextHolderUtil.getRequest();
        SqlMaps sqlMaps= RequestAnalysis.analysis(request);
        WhereObject sqlObject=whereBuilder.build("wk_student_info",sqlMaps);
        List<StudentInfo>  list =dynamicSqlService.selectByWhere(sqlObject.getWhereDSL(),sqlObject.getOrder());
        return list;
    }
```

> 支持的查询

| 标记     | sql         | 说明                |
| -------- | ----------- | ------------------- |
| equal    | =           |                     |
| nequal   | <>          |                     |
| greater  | >           |                     |
| egreater | >=          |                     |
| less     | <           |                     |
| eless    | <=          |                     |
| in       | in          | 按照,进行分割       |
| nin      | not in      | 按照,进行分割       |
| between  | between     | 按照,进行分割       |
| nbetween | not between | 按照,进行分割       |
| like     | liken       | 需要自己添加%       |
| nlike    | not like    | 需要自己添加%       |
| isnull   | is null     | 忽略 value,不能为空 |
| nisnull  | is not null | 忽略 value,不能为空 |

### 1.2 `POST`方式

直接从参数中获取`AntSearchListParams`传入到 Service 中。

```java
@PostMapping("/getStoreBindClassList")
@AntdResult
public AbstractListResponse getStoreBindClassList(@RequestBody AntSearchListParams params){
	return storeBindClassService.selectByAntSearchByPageListMap(params);
}
```
