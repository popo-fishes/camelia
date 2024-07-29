---
order: 6
group:
  path: /db
  title: 开发数据库相关代码
  order: 40
---

# MybatisDynamic 使用说明

## 1. 参考网址

[官方说明](https://mybatis.org/mybatis-dynamic-sql/docs/introduction.html)

## 2. Mybatis 自带函数

这些自带的函数一般被封装在`Dao`中，需要在 Service 中进行调用。

### 2.1 函数一览

这些函数没有自动生成，今后可能会自动生成，所以遇到下面的情况，就是自己单独写响应的函数

| 函数名                      | 参数                    | 说明                                                                   |
| --------------------------- | ----------------------- | ---------------------------------------------------------------------- |
| count                       | CountDSLCompleter       | 支持 where 条件                                                        |
| count                       | SelectStatementProvider | 支持 where 条件+指定字段 【见例子】                                    |
| delete                      | DeleteDSLCompleter      | 支持 where 条件的简化写法                                              |
| delete                      | DeleteStatementProvider | 支持 where 条件的复杂写法，【见例子】                                  |
| deleteByPrimaryKey          | 主键                    | 根据 ID 删除                                                           |
| insert                      | InsertStatementProvider | 灵活指定要添加的字段，【见例子】                                       |
| insert                      | ProColumn               | 传入对象，根据对象的属性全部更新                                       |
| insertSelective             | ProColumn               | 传入对象，只更新哪些非空的字段                                         |
| select                      | SelectDSLCompleter      | 只能指定 where 与 orderBy，不能指定要查询的字段                        |
| selectByPrimaryKey          | 主键                    | 根据 ID 查询一条记录                                                   |
| selectDistinct              | SelectDSLCompleter      | 过滤重复的数据                                                         |
| selectMany                  | SelectStatementProvider | 可以指定要查询的字段，在一个表有很多字段，只查询某几个字段，效率会很高 |
| selectOne                   | SelectDSLCompleter      | 按照条件查询一个，如果有多条记录，抛出错误                             |
| selectOne                   | SelectStatementProvider | 可以指定查询的字段，如果有多条记录，抛出错误                           |
| update                      | UpdateDSLCompleter      | 按照条件进行更新                                                       |
| update                      | UpdateStatementProvider | 按照条件进行更新的复杂写法                                             |
| updateAllColumns            | ProColumn , UpdateDSL   | 传入一个对象，更新所有字段，可以指定条件                               |
| updateSelectiveColumns      | ProColumn , UpdateDSL   | 传入一个对象，只更新部分字段，可以指定条件                             |
| updateByPrimaryKey          | ProColumn               | 传入一个对象，更新所有字段，PK 是 where 条件                           |
| updateByPrimaryKeySelective | ProColumn               | 传入一个对象，只更新部分字段，PK 是 where 条件                         |
| selectList                  | 无                      | 得到所有的 BasicColumn[]                                               |

### 2.2 函数解析

#### ① `DSLCompleter` 与 `StatementProvider`

`DSLCompleter` 与 `StatementProvider` 有什么区别? 例如`SelectOne`就支持两种不同的参数。

总体来说，`DSLCompleter`支持简化的写法，不支持`select`的字段，`StatementProvider` 可以设置要查询的字段。

下面是`SelectDSLCompleter`

```java
    default Optional<PersonWithAddress> selectByPrimaryKey(Integer id_) {
        return selectOne(c ->
            c.where(id, isEqualTo(id_))
        );
    }
```

下面是`SelectStatementProvider`

```java
        SelectStatementProvider selectStatement =
                select(proColumnId,name)
                        .from(proColumn)
                        .where(proColumnId,isEqualTo(1))
                        .build()
                        .render(RenderingStrategies.MYBATIS3);
        Optional<ProColumn> ren1 =proColumnDao.selectOne(selectStatement);
```

## 3. 单表操作详解

这里提供一些案例，能更方便的理解上面的函数。日常开发过程中 99%都不会用到。

### 3.1 Count

#### ① count(\*)

`CountDSLCompleter` ，不指定 select

```java
long count=0;
// 不指定select
count=proColumnDao.count(c->c);
// select count(*) from ec_pro_column
count=proColumnDao.count(CountDSLCompleter.allRows());
// select count(*) from ec_pro_column
// 不指定select，带有where
count=proColumnDao.count(c->c.where(proColumnId,isEqualTo(1)));
// select count(*) from ec_pro_column where pro_column_id = ?
```

#### ② count(pro_column_id)

`SelectStatementProvider`，指定 select

```java
// 指定select ,还可以带有where
SelectStatementProvider selectStatementCount=countColumn(proColumnId)
      .from(proColumn)
      .build()
      .render(RenderingStrategies.MYBATIS3);
count=proColumnDao.count(selectStatementCount);
// select count(pro_column_id) from ec_pro_column
```

### 3.2 Delete

有两种写法。

第一种使用`DeleteStatementProvider`

```java
    @Test
    public void testDeleteThreeConditions() {
        String fName = "Fred";
        String lName = "Flintstone";

        DeleteDSL<DeleteModel>.DeleteWhereBuilder builder = deleteFrom(person)
                .where(id, isEqualTo(3));

        builder.and(firstName, isEqualTo(fName).when(Objects::nonNull));
        builder.and(lastName, isEqualTo(lName).when(Objects::nonNull));

        DeleteStatementProvider deleteStatement = builder.build().render(RenderingStrategies.MYBATIS3);

        String expected = "delete from person"
                + " where id = #{parameters.p1}"
                + " and first_name = #{parameters.p2}"
                + " and last_name = #{parameters.p3}";

        assertThat(deleteStatement.getDeleteStatement()).isEqualTo(expected);
    }
```

第二种，在自动生成的`Mapper`基础上，使用`DeleteDSLCompleter`来简化删除语句的撰写，这种写法很常用。

```java
proColumnDao.delete(c->c.where(proColumnId,isEqualTo(12333)));
```

特殊用法：使用`DeleteDSLCompleter.allRows()`，删除所有记录

```java
int rows = mapper.delete(DeleteDSLCompleter.allRows());
```

### 3.3 Insert

这里只给出`InsertStatementProvider`例子，这种方法不常用，建议使用其他的方法。

```java
// insert 这种方法不常用，不建议使用
ProColumn proColumnObj=new ProColumn();
proColumnObj.setName("aaaa");
proColumnObj.setContent("content");
proColumnObj.setRemark("remark");
InsertStatementProvider<ProColumn> insertStatement= insert(proColumnObj)
        .into(proColumn)
        .map(name).toProperty("name")
        .build().render(RenderingStrategies.MYBATIS3);
int renInsert=proColumnDao.insert(insertStatement);
// insert into ec_pro_column (name) values (?)
System.out.println(renInsert);
```

这个方法的好处是，今后可以从任意对象中，通过`map`来映射到 Sql 语句中。

### 3.4 select

在查询的过程中可以指定字段或者查询全部

#### ① select \*

这时可以用简便写法，但是要查询所有的字段。

```java
List<ProColumn> list= proColumnDao.select(c->c.where(proColumnId,isEqualTo(1)));
// select pro_column_id, table_name, name, remark, gmt_create, gmt_modified, content from ec_pro_column where pro_column_id = ?
```

#### ② select field1

这里虽然使用了`where`与`orderBy` 但是没有传值，所以就 Sql 就没有响应的提现。 另外这里调用了`Dao`的`selectMany`

```java
SelectStatementProvider selectStatement1=  select(proColumnId,name)
        .from(proColumn)
        .where(proColumnId,isEqualTo(1))
        .orderBy()
        .build().render(RenderingStrategies.MYBATIS3);

List<ProColumn> list= proColumnDao.selectMany(selectStatement1);
// select pro_column_id, name from ec_pro_column where pro_column_id = ?
```

### 3.5 Distinct

#### ① distinct \*

自动生成代码中的 distinct

```java
List<ProColumn>   listDistinct= proColumnDao.selectDistinct(c->c.where(proColumnId,isEqualTo(1)));
//select distinct pro_column_id, table_name, name, remark, gmt_create, gmt_modified, content from ec_pro_column where pro_column_id = ?
```

#### ② distinct someFields

```java
SelectStatementProvider selectStatementDistinct=selectDistinct(proColumnId)
        .from(proColumn)
        .build()
        .render(RenderingStrategies.MYBATIS3);
listDistinct= proColumnDao.selectMany(selectStatementDistinct);
//select distinct pro_column_id from ec_pro_column
```

### 3.6 字段设置成 Null

现在按照对象更新的逻辑是，如果这个字段=Null，那么就不更新这个字段，所以这个就错误了。

这时候，只能手工更新，把那些字段设置成 Null。

例如下面的代码，先设置成`set(className).equalToNull()`

```java
    @Override
    @Transactional
    public int updateByPrimaryKeySelective(Spec record) {
        // if classId=null  will set classId and className =null
        if(record.getClassId()==null){
            specDao.update(c->c.set(classId).equalToNull()
                    .set(className).equalToNull()
                    .where(specId,isEqualTo(record.getSpecId())));
        }
        return super.updateByPrimaryKeySelective(record);
    }
```

### 3.7 雪花主键

使用：`IdUtil.getSnowId()`

```java
record.setMemberId(IdUtil.getSnowId());
```

### 3.8 使用缓存

详细见 redis 相关文档。

## 4、多表操作

尽量不操作多表，如果要操作多表，需要判断是否要生成响应的 Bean 对象，还是返回一个 Map 就可以了。

### 4.1 直接写 Sql

调用`SelectMapper`的`select`方法，直接将 Sql 语句写好，传入就可以了。

注意点，就是要把表的名称给写对了。

```java
    // 第一种写法
    String sql="select A.*,B.name from ec_store A ,ec_store_class B where A.store_class_id=B.store_class_id";
    List<Map> renMap=  selectMapper.select(sql);
    //select A.*,B.name from ec_store A ,ec_store_class B where A.store_class_id=B.store_class_id
    System.out.println(renMap.size());
```

### 4.2 用 Mybatis 方法

> 官网的例子

```java
SelectStatementProvider selectStatement = select(orderMaster.orderId, orderDate, orderLine.lineNumber, itemMaster.description, orderLine.quantity)
            .from(orderMaster, "om")
            .join(orderLine, "ol").on(orderMaster.orderId, equalTo(orderLine.orderId))
            .join(itemMaster, "im").on(orderLine.itemId, equalTo(itemMaster.itemId))
            .where(orderMaster.orderId, isEqualTo(2))
            .build()
            .render(RenderingStrategies.MYBATIS3);
```

> 实际的例子

```java
// 第二种写法
BasicColumn[] selectFields=ArrayUtils.add(storeDao.selectList,storeClass.name);
SelectStatementProvider selectStatement= select(selectFields)
        .from(store)
        .join(storeClass).on(store.storeClassId,equalTo(storeClass.storeClassId))
        //.where(store.storeId,isEqualTo(1))
        .build()
        .render(RenderingStrategies.MYBATIS3);

List<Map> renMap2=  selectMapper.selectMany(selectStatement);
// select ec_store.store_id, ... , ec_store_class.name from ec_store join ec_store_class on ec_store.store_class_id = ec_store_class.store_class_id where ec_store.store_id = ?

System.out.println(renMap2.size());
```

这里需要导入几个类，这样就可以直接使用`变量名`来引用对象了。

```java
import static com.wukong.mall.common.store.mapper.base.StoreDynamicSqlSupport.*;
import static com.wukong.mall.common.store.mapper.base.StoreClassDynamicSqlSupport.*;
```

### 4.3 Map 转对象

大部分情况只用将 Map 返回给前端就可以了，但是如果要参加复杂的计算，为了程序可读性，这时候需要 Map 转对象。

现在网上流行`MapStruct`，可以用这个。具体使用方法可以看[这篇文档](https://lux-sun.blog.csdn.net/article/details/113946112)

## 5. 常用技巧

### 5.1 分页

在要查询的代码前加入下面的代码。

```java
PageHelper.startPage(pageNum, pageSize);
```

### 5.2 公共 Where

定义一个通用的查询

```java
private WhereApplier commonWhere =  d -> d.where(id, isEqualTo(1)).or(occupation, isNull());
```

具体使用

```java
PersonMapper mapper = session.getMapper(PersonMapper.class);

int rows = mapper.update(c ->
    c.set(occupation).equalToStringConstant("worker")
    .applyWhere(commonWhere));
```

另外一个例子

```java
WhereApplier commonWhere=w->w.where(storeId,isEqualTo(1));
//第一种用法
SelectStatementProvider selectStatement1= select(selectFields)
        .from(store)
        .where(memberName,isLike("d"))
        .applyWhere(commonWhere)
        .build()
        .render(RenderingStrategies.MYBATIS3);
//第二种用法
storeDao.select(c->c.where(storeId,isEqualTo(1)).applyWhere(commonWhere));
```

### 5.3 公共 Order

可以设置一个`SortSpecification[]`

```java
List<SortSpecification> renList = new ArrayList<>(3);
renList.add(storeId);
renList.add(storeName.descending());
List<Store>  ren=storeDao.select(c->c.orderBy(renList));
// select store_id, store_name,.... from ec_store order by store_id, store_name DESC
System.out.println(ren.size());
```

`storeName.descending()` 指定排序方法

### 5.4 公共 Select

定义一个`BasicColumn[] columns`就可以了。

## 6. Where 配置

里面有些函数，可以看[官方的这个说明](https://mybatis.org/mybatis-dynamic-sql/docs/conditions.html)

### 6.1 Values 转换

```java
List<Animal> search(String searchName) {
        SelectStatementProvider selectStatement=select(id,animalName,bodyWeight,brainWeight)
        .from(animalData)
        .where(animalName,isLike(searchName).map(s->"%"+s+"%"))
        .orderBy(id)
        .build()
        .render(RenderingStrategies.MYBATIS3);
        ...
}
```

也可以使用一个函数

```java
List<Animal> search(String searchName){
        SelectStatementProvider selectStatement=select(id,animalName,bodyWeight,brainWeight)
        .from(animalData)
        .where(animalName,isLike(searchName).map(this::appendWildCards))
        .orderBy(id)
        .build()
        .render(RenderingStrategies.MYBATIS3);
}

String appendWildCards(String in) {
    return "%" + in + "%";
}
```

### 6.2 过滤 null

如果 where 条件中有空的值，可以通过`filter`过滤掉。

下面分别用了两种不同的实现方法。

```java
Integer id=null;
List<Store>  ren=storeDao.select(c->c
        .where()
        .and(storeId,isEqualTo(id).filter(Objects::nonNull))
);

SelectStatementProvider selectStatement= select(storeId)
        .from(store)
        .where(store.storeId,isEqualTo(id).filter(Objects::nonNull))
        .and(storeName,isLike("%"))
        .build()
        .render(RenderingStrategies.MYBATIS3);

storeDao.selectMany(selectStatement);
```

## 7. 高级技巧

这里给出了 Mybatis 的使用方法，但是如果是特别复杂的 Sql 语句，并且没有那么多的条件查询，可以直接写 Sql 语句就可以了。

### 7.1 Jion 与 Uion

`Jions`

```java
    SelectStatementProvider selectStatement = select(orderMaster.orderId, orderDate, orderLine.lineNumber, itemMaster.description, orderLine.quantity)
            .from(orderMaster, "om")
            .join(orderLine, "ol").on(orderMaster.orderId, equalTo(orderLine.orderId))
            .join(itemMaster, "im").on(orderLine.itemId, equalTo(itemMaster.itemId))
            .where(orderMaster.orderId, isEqualTo(2))
            .build()
            .render(RenderingStrategies.MYBATIS3);
```

`uion`

```java
    SelectStatementProvider selectStatement = select(id, animalName, bodyWeight, brainWeight)
            .from(animalData)
            .union()
            .selectDistinct(id, animalName, bodyWeight, brainWeight)
            .from(animalData)
            .orderBy(id)
            .build()
            .render(RenderingStrategies.MYBATIS3);
```

### 7.2 子查询

#### ① from

一定要指定别名`A`，这是 Sql 语法规定的。

```java
SelectStatementProvider selectStatement= select(storeClass.storeClassId,storeClass.name)
        .from(
            select(storeClass.storeClassId,storeClass.name).from(storeClass),"A"
        ).where(storeClass.name,isLike("%"))
        .build()
        .render(RenderingStrategies.MYBATIS3);
List<Map> renMap=  selectMapper.selectMany(selectStatement);
// select store_class_id, name from (select store_class_id, name from ec_store_class) A where name like ?
```

#### ② where

支持下面的函数

```java
exists
notExists
isEqualTo
isNotEqualTo
isIn
isNotIn
isGreaterThan
isGreaterThanOrEqualTo
isLessThan
isLessThanOrEqualTo
```

例如：

```java
SelectStatementProvider selectStatement2= select(storeId,storeName)
        .from(store)
        .where(storeId,isIn(select(storeId).from(storeClass)))
        .build()
        .render(RenderingStrategies.MYBATIS3);
List<Map> renMap2=  selectMapper.selectMany(selectStatement2);
// select store_id, store_name from ec_store where store_id in (select store_id from ec_store_class)
```

### 7.3 Insert 子查询

将一个表的内容添加到另外一个表中，下面官网给出的例子代码

```java
InsertSelectStatementProvider insertSelectStatement = insertInto(animalDataCopy)
        .withColumnList(id, animalName, bodyWeight, brainWeight)
        .withSelectStatement(
            select(id, animalName, bodyWeight, brainWeight)
            .from(animalData)
            .where(id, isLessThan(22))
        )
        .build()
        .render(RenderingStrategies.MYBATIS3);
```

> 实际的一个 Demo

```java
InsertSelectStatementProvider insertSelectStatement = insertInto(storeClass)
        .withColumnList(storeClass.name,storeClass.bail,storeClass.sort)
        .withSelectStatement(
                select(storeClass.name,storeClass.bail,storeClass.sort).from(storeClass).where(storeClass.storeClassId,isEqualTo(1))
        ).build()
        .render(RenderingStrategies.MYBATIS3);

int ren = selectMapper.insertSelect(insertSelectStatement);
// insert into ec_store_class (name, bail, sort) select name, bail, sort from ec_store_class where store_class_id = ?
System.out.println(ren);
```

### 7.4 别名

这里用到了两个别名，分别是`as`与`sortColumn`

```java
SelectStatementProvider selectStatement = select(substring(gender, 1, 1).as("ShortGender"), avg(age).as("AverageAge"))
            .from(person, "a")
            .groupBy(substring(gender, 1, 1))
            .orderBy(sortColumn("ShortGender").descending())
            .build()
            .render(RenderingStrategies.MYBATIS3);
```

### 7.5 Sql 函数
