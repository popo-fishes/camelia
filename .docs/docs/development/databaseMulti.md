---
order: 4
group:
  path: /db
  title: 开发数据库相关代码
  order: 40
---

# 多表查询

_`MultiSqlBuilder`实现了多表查询的功能，`MultiSqlBuilderTest`是相关的测试用例，看这些测试代码，就明白怎么用了。_

> 设计约定：考虑到执行效率与便于维护性

- 尽量单表查询，不要关联 3 张以上的表，如果要关联很多表，请提交技术总监审核。
- 数据量超过 500 以上的表，用以显示的，尽量用分页。
- 数据库表的字段，不能用大写，可以用分割符合分割不同意思的单词。
- 没有联合主键，主键用单独的字段表示。
- 尽量不用外键做约束，针对高并发的存储，这个很消耗时间。

## 1、 `Sql`语句形式

多表查询如果是`Sql`语句固定的，那就好办，直接写一条`Sql`语句到程序中就可以了，然后把结果转成前端`AntDesgin`所需的格式。但是：

- 有时候会改变`where`条件，最多的场景是追加过滤条件。通俗将是追加`and`条件。
- 有时候会改变`order`内容，可以是追加的（优先级比较高），也可以是将原先以有的替换掉。
- 传递过来的参数，最好用`AntDesgin`前端比较喜欢的形式传递。
- 要防止`Sql`注入。

### 1.1 例子说明

**首先写一个基础的 Sql 语句**

```java
/**
 * 查询成绩表
 * @param params ant格式的查询条件
 * @return AbstractListResponse
 */
public AbstractListResponse<Map<String,Object>> selectByAntSearchByPageBySql(AntSearchListParams params){
    String sql="select A.*,B.course_name,C.student_name,C.student_age,C.student_sex  " +
            "from wk_student_scores A " +
            "     ,wk_course B " +
            "     ,wk_student C " +
            "where A.student_id=C.student_id " +
            "    and A.course_id=B.course_id " +
            "    ORDER BY A.gmt_create desc"
            ;
    return multiSqlBuilder.selectByAntSearchByPage(sql,params);
}
```

**其次通过传递参数，来改变 Sql 语句**

```json
{
  "select": "",
  "wheres": {
    "studentName_like": "tom",
    "gmtModified_greater": "2001-05-05 10:15:25",
    "studentId_between": "1,300"
  },
  "current": 1,
  "pageSize": 20,
  "order": "studentName,studentSex desc"
}
```

> 参数说明：
>
> - 使用驼峰形式表示字段，这与前端的 js 规范是一致的。
> - where 条件后的下划线比是操作符，详细可以[参考这里](/development/db/database-front)。
> - 这里没有指定表明，默认是 Sql 语句中的 From 的第一个表，没有这个字段，采取查询另外一张表。有一个默认的顺序。当然也可以指定表，看下章节内容。

**返回`AntDesgin`表格可以[接受的格式](/development/controller/controller-return#12-antdesign-格式)，`AbstractListResponse`**

### 1.2 参数指定表名

如果不指定表名，会按照`from wk_student_scores A ,wk_course B ,wk_student C`顺序来匹配字段。

```json
{
  "select": "",
  "wheres": {
    "studentName_like": "tom",
    "c.gmtModified_greater": "2001-05-05 10:15:25",
    "a.studentId_between": "1,300"
  },
  "current": 1,
  "pageSize": 20,
  "order": "studentName,studentSex desc"
}
```

### 1.3 不分页

参数还是一样，就是传递进去的分页参数无效。

```java
public List<Map<String, Object>> selectByAntSearchAllBySql(AntSearchListParams params){
    String sql="select A.*,B.course_name,C.student_name,C.student_age,C.student_sex  " +
            "from wk_student_scores A " +
            "     ,wk_course B " +
            "     ,wk_student C " +
            "where A.student_id=C.student_id " +
            "    and A.course_id=B.course_id " +
            "    ORDER BY A.gmt_create desc"
            ;
    return multiSqlBuilder.selectByAntSearchByAll(sql,params,false);
}
```

### 1.4 使用建议

这里面有几个撰写 `Sql `语句的约束：

- 建议多个表，用不同的别名来区分。
- `Select` 要查询的字段，尽量不要重复，这点需要手工处理。
- `order by `有一个默认的查询，新添加排序，可以选择排在默认排序前面，也可以替换原有的排序。

后续可能要完善的

- 不支持子查询，没做个测试，如果有子查询的需求，可以完善功能。
- 由于`ec_` 表可能会变化，应该做成动态的，为了代码的可读性，就没有做替换，今后可以做替换。
- 不支持 Sql 语句中的复杂查询，如果要做这些复制查询，就直接使用`Mybatis`功能。
- 这里特殊说明框架定义参数传递机制，以及动态 `Sql` 语句拼接。

## 2、`MybatisDynamic`形式

这里只说明`MybatisDynamic`中 80%的场景用到的地方，关于特殊用法，看其他细节。

有一些前提条件：

- 表尽量使用别名
- 要显示的字段尽量不要重复，不要使用别名，因为没有测试过
- 尽量不要使用 Sql 中的函数。

### 2.1 `MybatisDynamic`写法举例

`MybatisDynamic`写的代码，如果习惯了也很好，感觉不错。主要的好处如下：

- 不用关心实际数据中的名称
- 就是在 idea 工具中，可以实现代码提示
- 可以进行一些简单的动态拼接

```java
SelectStatementProvider selectStatement = select(
        studentScores.allColumns()
        ,course.courseName
        ,student.studentName
        ,student.studentAge
        ,student.studentSex
).from(studentScores)
        .join(course).on(studentScores.courseId,equalTo(course.courseId))
        .join(student).on(student.studentId,equalTo(studentScores.studentId))
.orderBy(studentScores.gmtModified.descending())
.build().render(RenderingStrategies.MYBATIS3);
```

输出的`Sql`语句如下：

```sql
select wk_student_scores.*, wk_course.course_name, wk_student.student_name, wk_student.student_age, wk_student.student_sex
from wk_student_scores
join wk_course on wk_student_scores.course_id = wk_course.course_id
join wk_student on wk_student.student_id = wk_student_scores.student_id
order by gmt_modified DESC
```

也可以手工根据条件撰写 where 语句，如果变化情况那么复杂的话

`.where(student.studentId,isGreaterThan(studentId_).filter(Objects::nonNull))` ，如果传入的参数为空，就不添加这个 where 条件。

```java
SelectStatementProvider selectStatement = select(
        studentScores.allColumns()
        ,course.courseName
        ,student.studentName
        ,student.studentAge
        ,student.studentSex
).from(studentScores)
        .join(course).on(studentScores.courseId,equalTo(course.courseId))
        .join(student).on(student.studentId,equalTo(studentScores.studentId))
 .where(student.studentId,isGreaterThan(studentId_).filter(Objects::nonNull))
.orderBy(studentScores.gmtModified.descending())
.build().render(RenderingStrategies.MYBATIS3);
return selectStatement.getSelectStatement();
```

### 2.2 与前端关联

通过前端传递过来的参数，虽然有局限性，但是满足了 80%的场景。

- 如何动态添加 where
- 如何动态添加 orderBy

具体步骤如下

#### 2.2.1 撰写 Service

- 首先创建一个`QueryExpressionDSL<SelectModel>.JoinSpecificationFinisher selectDSL`，基本的 Sql 查询条件。
- 然后撰写初始的 where 条件`WhereDSL.StandaloneWhereFinisher defaultWhereDSL`，可以为空。
- 然后撰写初始的排序条件，`Collection<SortSpecification> defaultOrderByColumns`。
- 最后调用`multiMybatisBuilder`的函数`selectByAntSearchByAll`或者`selectByAntSearchByPage`，一个是分页，一个是不分页。

```java
public List<Map<String, Object>> selectByAntSearchAllByMybatis(AntSearchListParams params) {
    //撰写selectDSL
    QueryExpressionDSL<SelectModel>.JoinSpecificationFinisher selectDSL = select(
            studentScores.allColumns()
            , course.courseName
            , student.studentName
            , student.studentAge
            , student.studentSex
    ).from(studentScores, "a")
            .join(course, "b").on(studentScores.courseId, equalTo(course.courseId))
            .join(student, "c").on(student.studentId, equalTo(studentScores.studentId))
            ;

    //撰写初始的where条件
    Long studentId_ = 1L;
    WhereDSL.StandaloneWhereFinisher defaultWhereDSL= SqlBuilder.where().and(studentScores.studentId, isGreaterThan(studentId_));

    //撰写初始的排序条件,这里注意别出现错误，要排序的内容，一定要在select中
    Collection<SortSpecification> defaultOrderByColumns = new ArrayList<>();
    defaultOrderByColumns.add(studentScores.gmtModified.descending());

    return multiMybatisBuilder.selectByAntSearchByAll(selectDSL,defaultWhereDSL,defaultOrderByColumns,params);
}
```

#### 2.2.2 撰写 controller

如何接受参数，分两种。在多表可能大部分都是 postJson 格式。

##### URL

`例如：where_studentId=123&where_studentName_like=%tom%&orderBy=studentName,studentSex desc`

调用 RequestAnalysis，自动解析出 request 中的查询条件

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

##### PostJson

直接在前端就把检索条件拼接好了，后台就不用转换了

```java
@PostMapping("/selectListForAdmin")
@AntdResult
public AbstractListResponse selectListForAdmin(@RequestBody AntSearchListParams params) {
    return goodsCommonService.selectListForAdmin(params);
}
```

## 3、更复杂形式

建议看[MybatisDynamic 使用说明](/development/db/database-my-batis-dynamic)
