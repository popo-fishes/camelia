---
title: 自定义函数库
order: 2
---

# 自定义函数库

## 1. 字符串

在`WkStringUtils`类中定义了一些常见字符串操作的静态函数

| 函数名                                          | 说明                                                                                                                                                                   |
| ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| caseLowerCamel(String name)                     | 转驼峰-第一个字母小写                                                                                                                                                  |
| caseUpperCamel(String name)                     | 转驼峰-第一个字母大写                                                                                                                                                  |
| camelToLowerSql(String name)                    | 驼峰转成下划线                                                                                                                                                         |
| isEmpty(final CharSequence cs)                  | 是否为空                                                                                                                                                               |
| idIsEmpty(final Object id)                      | 检查编号是否为空，编号可能是 Integer 或者 String                                                                                                                       |
| isBlank(final CharSequence cs)                  | 是否是空格                                                                                                                                                             |
| capitalize(final String str)                    | 第一个字母大写                                                                                                                                                         |
| uncapitalize(final String str)                  | 第一个字母小写                                                                                                                                                         |
| join                                            | 合并字符串.<br/>StringUtils.join(["a", "b", "c"], ';') = "a;b;c"<br/>StringUtils.join(["a", "b", "c"], null) = "abc"                                                   |
| unqualify(String qualifiedName)                 | 获取类似类名或者文件后缀<br/>StringUtils.unqualify("cn.wolfcode.java") = java                                                                                          |
| unqualify(String qualifiedName, char separator) | 得到文件名<br/>StringUtils \*.unqualify("cn/wolfcode/Hello.java", File.separatorChar)=Hello.java                                                                       |
| getFilename(@Nullable String path)              | 获取文件名,就不需要再使用 FilenameUtils                                                                                                                                |
| getFilenameExtension(@Nullable String path)     | 获取文件后缀名                                                                                                                                                         |
| applyRelativePath                               | 找到给定的文件，和另一个相对路径的文件，返回第二个文件的全路径。<br/>d:/java/wolfcode/../other/Some.java                                                               |
| cleanPath                                       | 会将..或. 变成合理的路径，这个方法配合 applyRelativePath 就可以计算一些简单的相对路径了<br/>cleanPath("d:/java/wolfcode/../other/Some.java") = d:/java/other/Some.java |
| abbreviate                                      | 添加省略符<br/>StringUtils.abbreviate("abcdefg", 6) = "abc..."                                                                                                         |
| chomp                                           | 去掉换行符                                                                                                                                                             |
| startsWith                                      | 是否以某个字符串开始                                                                                                                                                   |
| endsWith                                        | 是否以某个字符串结束                                                                                                                                                   |
| leftPad                                         | 左侧添加空格<br/>StringUtils.leftPad("bat", 5) = " bat"                                                                                                                |
| rightPad                                        | 右侧添加空格                                                                                                                                                           |
| getOrderBy                                      | 返回一个 order by 的字符串。"studentId,wx desc"="student_id,wx desc"                                                                                                   |

## 2. 集合工具类

`WkCollectionsUtils`

| 函数名              | 说明              |
| ------------------- | ----------------- |
| isEmptyMap(Map map) | 判断 map 是否为空 |

## 3. Sql 相关

`SqlParser` Sql 语句解析

| 函数名              | 说明                    |
| ------------------- | ----------------------- |
| SqlParser           | 初始化                  |
| getUpdateTableName  | 得到要更新的 Table 名称 |
| getUpdateColumnList | 得到要更新的 ColumnList |

这个类进行可以补充一下

`SqlSafeUtil`

| 函数名             | 说明           |
| ------------------ | -------------- |
| isSqlInjectionSafe | 是否安全的 SQL |

## 4. Spring 工具类

## 5. Request 工具类

系统也做了封装`RequestContextHolderUtil`，可以得到更多的数据

| 函数                                            | 说明                                           |
| ----------------------------------------------- | ---------------------------------------------- |
| HttpServletRequest getRequest()                 | 得到 Request 对象                              |
| HttpServletResponse getResponse()               | 得到 Response 对象                             |
| HttpSession getSession()                        | 得到 Session 对象                              |
| ServletRequestAttributes getRequestAttributes() | 得到 RequestAttributes 对象                    |
| ServletContext getServletContext()              | 得到 ServletContext 对象                       |
| String getUrl()                                 | 得到当前访问的域名，例如 http://127.0.0.1:8080 |
| String getIpAddr()                              | 得到当前登录用户的 IP 地址                     |

## 6. Redis 工具类

RedisUtils 不是太成熟，里面只封装了`<String,String>`形式，没有对`<String,Object>`进行封装，所以在使用要谨慎。如果担心有问题，可以直接使用最原始的形式。

| 方法                            | 说明                   |
| ------------------------------- | ---------------------- |
| delete(String key)              | 删除某个 Key           |
| delete(Collection<String> keys) | 批量删除一些 Key       |
| keys(String pattern)            | 根据正则表达式得到 key |
| select(String pattern)          | 根据正则表达式得到数据 |

## 7. 多语言

`LocaleMessageSourceUtil` 对`MessageSource`进行了一次封装，当前看没有太多的作用，就是直接引用了`MessageSource`的功能。

| 方法                                                        | 说明                                                    |
| ----------------------------------------------------------- | ------------------------------------------------------- |
| getMessage(String code)                                     | 根据 Key 得到多语言字符串                               |
| getMessage(String code, Object[] args)                      | 根据 Key 得到多语言字符串，可以替换中间的变量           |
| getMessage(String code,Object[] args,String defaultMessage) | 根据 Key 得到多语言字符串，可以替换中间的变量，有缺省值 |

## 8. Json

`JsonUtils` 对`jackson`进行了非常简单的封装，因为每次调用要设置时间格式与异常捕获，所以就做了简单的封装。

| 方法                | 说明                                                          |
| ------------------- | ------------------------------------------------------------- |
| getDateFormatMapper | 得到一个设置好时间格式的 ObjectMapper                         |
| writeValueAsString  | 转换成 String,如果有错误，就抛出一个 BusinessException 的错误 |

## 9. Id 生成器

`IdUtil` 用来生成 ID

| 方法                                             | 说明                                                 |
| ------------------------------------------------ | ---------------------------------------------------- |
| getSnowId()                                      | 返回雪花 ID                                          |
| getUUID()                                        | 获取 UUID 获取更优的效果 去掉"-"                     |
| Comparable<?> getId(String type,Properties prop) | 可以调用出自己的代码生成器,不常用                    |
| initSnow(Integer workId)                         | 初始化雪花 ID，今后每一个 Docker 容器，都会有一个 ID |

## 10. 日期工具

`DateUtil`

| 方法                                 | 说明                                                                  |
| ------------------------------------ | --------------------------------------------------------------------- |
| Date getNow()                        | 得到当前日期                                                          |
| Date parseDate(String val)           | 将一个字符串解析成 Date 类型。支持"yyyy-MM-dd"与"yyyy-MM-dd HH:mm:ss" |
| Timestamp parseTimestamp(String val) | 将一个字符串解析成 Timestamp 类型                                     |
| String getNowString()                | 得到当前日期字符串                                                    |
| long getTimestamp()                  | 获取系统时间戳（10 位）                                               |
| long getTimestamp(Date date)         | 传入一个日期，获得时间戳                                              |
