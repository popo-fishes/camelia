---
order: 3
group:
  path: /db
  title: 开发数据库相关代码
  order: 40
---

# 单表操作

为了方便使用，在 `Mybatis`自动生成的代码 基础上，把最常用的给进行了二次封装，主要包含：增删改查这 4 个方面。基本上满足 80%常见的单表与多表查询操作。

自动生成的代码，只包含了最基本的操作，但是实际情况会很复杂，下面描述了常见的代码操作。

- 70%的单表作场景，只要看【1. 二次封装函数】小结就行
- 99%的单表操作场景，只要看【2. Mybatis 自带函数】小结就行
- 【3.单表特殊操作】是对描述了 Mybatis 的一些使用案例

## 1. BasicService

### 1.1 Insert

| 函数名                          | 分类         | 说明                                                     |
| ------------------------------- | ------------ | -------------------------------------------------------- |
| insertSelectiveReturnId         | 添加         | 添加记录，成功了返回新增的 ID                            |
| insertOrUpdateSelectiveReturnId | 添加 or 更新 | 根据 ID 是否为空，进行添加或更新操作,成功了返回新增的 ID |
| updateByPrimaryKeySelective     | 更新         | 更具 ID 更新记录，返回 1 表示更新成功                    |

#### insertSelectiveReturnId

```java
Student student=new Student();
student.setStudentName("insert");
Long newId= studentService.insertSelectiveReturnId(student);
```

#### insertOrUpdateSelectiveReturnId

```java
Student student=new Student();
student.setStudentName("insertOrUpdate");
Long newId= studentService.insertOrUpdateSelectiveReturnId(student);
```

### 1.2 update

| 函数名                      | 分类 | 说明                                  |
| --------------------------- | ---- | ------------------------------------- |
| updateByPrimaryKeySelective | 更新 | 更具 ID 更新记录，返回 1 表示更新成功 |
| updateByWhereSelective      | 更新 | 更具 where 更新记录                   |

这里为什么没有批量更新呢？ 因为当时想批量更新是比较复杂的操作，需要自己撰写。

#### updateByPrimaryKeySelective

```java
Student updateStudent=new Student();
updateStudent.setStudentName("newName");
updateStudent.setStudentId(lastStudentId);
int ren=studentService.updateByPrimaryKeySelective(updateStudent);
```

#### updateByWhereSelective

```java
Student student=new Student();
student.setStudentName("new");
student.setStudentSex(1);

Map<String,String> wheres = new HashMap<>();
wheres.put("studentId",String.valueOf(lastStudentId));
int ren=studentService.updateByWhereSelective(student,studentService.getWhereApplier(wheres));
```

#### 手工处理

如果想批量更新，只能手工指定撰写内容了

```java
int ren =studentDao.update(c->c
        .set(studentSex).equalTo(1)
        .where(studentName,isLike("%name%"))
);
```

### 1.3 Select One

| 函数名             | 分类         | 说明                           |
| ------------------ | ------------ | ------------------------------ |
| selectByPrimaryKey | 查询单条记录 | 返回 Optional                  |
| selectById         | 查询单条记录 | 返回对象，如果没有找到抛出错误 |

#### selectByPrimaryKey

```java
Optional<Student> optionalStudent= studentService.selectByPrimaryKey(lastStudentId);
```

#### selectById

```java
Student student= studentService.selectById(lastStudentId);
```

### 1.4 Select Many

| 函数名                         | 指定字段 | 指定 where | 指定 order | 分页 | 备注                            |
| ------------------------------ | -------- | ---------- | ---------- | ---- | ------------------------------- |
| selectAll                      | ✕        | ✕          | ✕          | ✕    | 查询所有记录                    |
| selectAllByPage                | ✕        | ✕          | ✕          | ✓    | 查询所有记录，可分页            |
| selectByWhere                  | ✕        | ✓          | ✓          | ✕    | 根据条件查询记录                |
| selectByWhereByPage            | ✕        | ✓          | ✓          | ✓    | 根据条件查询记录，可分页        |
| selectListMap                  | ✓        | ✓          | ✓          | ✕    | 返回 List Map                   |
| selectListMapByPage            | ✓        | ✓          | ✓          | ✓    | 返回 List Map，可分页           |
| selectByAntSearchByPage        | ✕        | ✓          | ✓          | ✓    | 可解析 AntDesign 的参数         |
| selectByAntSearchByPageListMap | ✓        | ✓          | ✓          | ✓    | 可解析 AntDesign 的参数，可分页 |
| selectWithDistinct             | ✓        | ✓          | ✓          | ✕    | 指定字段去重查询                |

_应用场景：初步看`selectListMapByPage`与`selectByAntSearchByPageListMap` 功能最强大，可以随意指定，但是由于返回的是 Map，如果没有在后台进行计算操作，用这个最方便，但是如果要进行一些复杂的操作，还是转换成 Java 对象，使用起来更方便_

#### selectAll

```java
List<Student> students= studentService.selectAll();
```

#### selectAllByPage

实际情况下，会根据配置，选择返回`ListResponseAntd`与`ListResponse`具体实现的类。未来的程序中，都会返回`ListResponse`

```java
AbstractListResponse<Student> studentList=studentService.selectAllByPage(1,5);
```

#### selectByWhere

将条件拼装到 Map<String,String>，然后进行查询，第二个参数是 order，这里没有写。

```java
Map<String,String> wheres = new HashMap<>();
wheres.put("studentId",String.valueOf(lastStudentId));
WhereApplier whereApplier=studentService.getWhereApplier(wheres);
List<Student> students= studentService.selectByWhere(whereApplier,null);
```

#### selectByWhereByPage

```java
Map<String,String> wheres = new HashMap<>();
wheres.put("studentId",String.valueOf(lastStudentId));
WhereApplier whereApplier=studentService.getWhereApplier(wheres);
AbstractListResponse<Student> studentList=studentService.selectByWhereByPage(whereApplier,null,1,5);
```

#### selectListMap

```java
String columnsStr="studentId,studentName";
BasicColumn[]  selectColumns= studentService.getSelect(columnsStr);
List<Map<String, Object>> studentList= studentService.selectListMap(selectColumns,null,null);
```

#### selectListMapByPage

查询出部分字段

```java
String columnsStr="studentId,studentName";
BasicColumn[]  selectColumns= studentService.getSelect(columnsStr);
AbstractListResponse<Map<String, Object>> studentList
        = studentService.selectListMapByPage(selectColumns
        ,null
        ,null
        ,1
        ,5
  );
```

#### selectByAntSearchByPage

为了简化从前端传递过来的参数，这里设计了一个类`AntSearchListParams`

```java
@Data
public class AntSearchListParams {
    private Map<String,String> wheres;
    private String order;
    private String select;
    private Integer current=1;
    private Integer pageSize=20;
}
```

这个类可以从前端`@RequestBody`传递过来

```java
@PostMapping("/getStoreBindClassList")
@AntdResult
public AbstractListResponse getStoreBindClassList(@RequestBody AntSearchListParams params){
	return storeBindClassService.selectByAntSearchByPage(params);
}
```

#### selectByAntSearchByPageListMap

这个类可以从前端`@RequestBody`传递过来

```java
@PostMapping("/getStoreBindClassList")
@AntdResult
public AbstractListResponse getStoreBindClassList(@RequestBody AntSearchListParams params){
	return storeBindClassService.selectByAntSearchByPageListMap(params);
}
```

#### selectWithDistinct

后两个参数是`where`与`order`，如果是 null，就表示全部。

```java
String columnsStr="studentName";
BasicColumn[]  selectColumns= studentService.getSelect(columnsStr);
List<Map<String, Object>> newStudentList= studentService.selectWithDistinct(selectColumns,null,null);
```

### 1.5 Delete

| 函数名             | 分类 | 说明                          |
| ------------------ | ---- | ----------------------------- |
| deleteByPrimaryKey | 删除 | 按照 ID 删除记录              |
| delete             | 删除 | 根据传入的 where 条件进行操作 |

#### deleteByPrimaryKey

返回的结果表示删除的记录数。

```java
int ren =studentService.deleteByPrimaryKey(lastStudentId);
```

#### delete

下面的`studentId_greater` 表示删除大于`studentId`的记录

```java
Map<String,String> wheres = new HashMap<>();
wheres.put("studentId_greater",String.valueOf(id));
WhereApplier whereApplier=studentService.getWhereApplier(wheres);
long ren =studentService.delete(whereApplier);
```

### 1.6 count

| 函数名 | 分类 | 说明                      |
| ------ | ---- | ------------------------- |
| count  | 求和 | 根据 where 条件得到记录数 |

#### count

参数为空，就没有 where 条件。

```java
Map<String,String> wheres = new HashMap<>();
wheres.put("studentId",String.valueOf(lastStudentId));
WhereApplier whereApplier=studentService.getWhereApplier(wheres);
long oneCount=studentService.count(whereApplier);
```

### 1.7 工具函数

| 函数名          | 分类     | 说明                                                    |
| --------------- | -------- | ------------------------------------------------------- |
| getSelect       | 辅助函数 | 根据前台传入的字符串，得到一个 BasicColumn[]数组        |
| getWhereApplier | 辅助函数 | 根据前台传入的 Map，得到一个可以拼装的 WhereApplier     |
| getOrder        | 辅助函数 | 根据前台传入的字符串，得到一个 SortSpecification[] 数组 |

#### getSelect

```java
String columnsStr="studentId,studentName";
BasicColumn[]  selectColumns= studentService.getSelect(columnsStr);
//使用场景
List<Map<String, Object>> studentList= studentService.selectListMap(selectColumns,null,null);
```

#### getWhereApplier

由于从前端传入的参数，都基本上是字符串，所以就先放入到一个`Map<String,String>`中。

```java
Map<String,String> wheres = new HashMap<>();
wheres.put("studentId",String.valueOf(lastStudentId));
WhereApplier whereApplier=studentService.getWhereApplier(wheres);
//使用场景
List<Student> studentList=studentService.selectByWhere(whereApplier,null);
```

#### getOrder

从前端传入一个`order`的字符串，就可以拼接出一个 Order 语句了。

```java
String orderStr="studentId desc,studentName";
SortSpecification[]  sortSpecifications= studentService.getOrder(orderStr);
//使用场景
List<Student> studentList=studentService.selectByWhere(null,sortSpecifications);
```

## 2. Mapper

[详细内容可以看](/development/db/database-my-batis-dynamic)。这些函数没有自动生成，今后可能会自动生成，所以遇到下面的情况，就是自己单独写响应的函数

### 2.1 insert

这个是属性

| 函数名                                                          | 说明                 |
| --------------------------------------------------------------- | -------------------- |
| int insert(InsertStatementProvider\<Student\> insertStatement); | 不好用               |
| int insert(Student row)                                         | 如果字段是空，就覆盖 |
| int insertSelective(Student row)                                | 只添加非空的         |

`int insert(InsertStatementProvider\<Student\> insertStatement);` 使用起来非常麻烦，需要自己添加的内容太多，不建议使用。

```java
Student recorder=new Student();
recorder.setStudentName("new");

InsertStatementProvider<Student> insertStatement=insert(recorder)
        .into(student)
        .map(studentName).toProperty("studentName")
        .map(studentSex).toPropertyWhenPresent("studentSex",recorder::getStudentSex)
        .build()
        .render(RenderingStrategies.MYBATIS3);
int ren= studentMapper.insert(insertStatement);
```

### 2.2 update

| 函数名                                                                                            | 说明                                                   |
| ------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| int update(UpdateDSLCompleter completer)                                                          | 需要手工写                                             |
| static UpdateDSL\<UpdateModel\> updateAllColumns(Student row, UpdateDSL\<UpdateModel\> dsl)       | 可以按照对象中设置的数值，更新多条，字段 null 会覆盖   |
| static UpdateDSL\<UpdateModel\> updateSelectiveColumns(Student row, UpdateDSL\<UpdateModel\> dsl) | 可以按照对象中设置的数值，更新多条，字段 null 不会覆盖 |
| int updateByPrimaryKey(Student row)                                                               | 根据 id 更新数据，字段 null 会覆盖                     |
| int updateByPrimaryKeySelective(Student row)                                                      | 根据 id 更新数据，字段 null 不会覆盖                   |

#### update

```java
int ren =studentMapper.update(c->c
        .set(studentSex).equalTo(1)
        .where(studentName,isLike("%name%"))
);
```

#### updateSelectiveColumns

```java
Student row=new Student();
row.setStudentSex(2);
int ren = studentMapper.update(c->
        StudentMapper
                .updateSelectiveColumns(row,c)
                .where(studentName,isLike("%name%"))
);
```

### 2.3 selectOne

| 函数名                                                                  | 说明 |
| ----------------------------------------------------------------------- | ---- |
| Optional\<Student\> selectOne(SelectStatementProvider selectStatement); |      |
| default Optional\<Student\> selectOne(SelectDSLCompleter completer)     |      |
| default Optional\<Student\> selectByPrimaryKey(Long studentId\_)        |      |

### 2.4 selectMany

| 函数名                                                              | 说明 |
| ------------------------------------------------------------------- | ---- |
| List\<Student\> selectMany(SelectStatementProvider selectStatement) |      |
| List\<Student\> select(SelectDSLCompleter completer)                |      |

### 2.5 distinct

| 函数名                                                               | 说明 |
| -------------------------------------------------------------------- | ---- |
| default List\<Student\> selectDistinct(SelectDSLCompleter completer) |      |

### 2.6 delete

| 函数名                                           | 说明 |
| ------------------------------------------------ | ---- |
| default int delete(DeleteDSLCompleter completer) |      |
| default int deleteByPrimaryKey(Long studentId\_) |      |

### 2.6 count

| 函数名                                          | 说明 |
| ----------------------------------------------- | ---- |
| default long count(CountDSLCompleter completer) |      |

### 2.7 其他工具

| 函数名     | 参数 | 说明                     |
| ---------- | ---- | ------------------------ |
| selectList | 无   | 得到所有的 BasicColumn[] |

## 3. WhereBuilder

这是一个核心类，用来解析 Sql 语句，用户一般不使用。只有 4 个函数。 另外这个类已经做了 junit 单元测试。

### 3.1 getWhereApplier

按照下面的例子，可以把获取的 where 添加到一个查询语句中

```java
String tableName="wk_student";
Map<String,String> whereMap=new HashMap<>();
whereMap.put("studentId","1111");
WhereApplier whereApplier
        = whereBuilder.getWhereApplier(tableName,whereMap);
Assertions.assertNotNull(whereApplier);

Optional<WhereClauseProvider> whereClause = WhereDSL.where()
        .applyWhere(whereApplier)
        .build()
        .render(RenderingStrategies.MYBATIS3);


String expected = "where student_id = #{parameters.p1,jdbcType=BIGINT}" ;
String actuality= getWhereSql(whereClause);
Assertions.assertEquals(actuality,expected);
```

### 3.2 getWhereDSL

```java
String tableName="wk_student";
Map<String,String> whereMap=new HashMap<>();
whereMap.put("studentId","1111");

WhereDSL whereDSL
        = whereBuilder.getWhereDSL(tableName,whereMap);

String expected = "where student_id = #{parameters.p1,jdbcType=BIGINT}" ;
String actuality= getWhereSql(whereDSL.build().render(RenderingStrategies.MYBATIS3));
Assertions.assertEquals(actuality,expected);
```

### 3.3 getOrder

```java
SortSpecification[] orderByColumns=whereBuilder.getOrder(
        "wk_student",
          "student_name desc,studentId"
);

SelectStatementProvider selectStatement = select(studentId,studentName)
        .from(student)
        .orderBy(orderByColumns)
        .build()
        .render(RenderingStrategies.MYBATIS3);
String expected = "select student_id, student_name " +
        "from wk_student " +
        "order by student_name DESC, student_id";
String actuality=selectStatement.getSelectStatement();
Assertions.assertEquals(actuality,expected);
```

### 3.4 getSelect

```java
BasicColumn[] selectColumn=
 whereBuilder.getSelect("student_id,studentName",studentDao.selectList);

SelectStatementProvider selectStatement = select(selectColumn)
        .from(student)
        .build()
        .render(RenderingStrategies.MYBATIS3);
String expected = "select student_id, student_name " +
        "from wk_student";
String actuality=selectStatement.getSelectStatement();
Assertions.assertEquals(actuality,expected);
```
