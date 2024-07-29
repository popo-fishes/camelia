---
order: 40
group:
  path: /quick
  title: 快速开始
  order: 10
---

# 框架参数配置

## 1、参数一览

- 所有的参数集中在`wukong-boot-configuration`统计管理。
- 在 IDEA 中会自动提示如何填写参数。

| 参数名                                       | 类型     | 默认值 | 说明                           |
| -------------------------------------------- | -------- | ------ | ------------------------------ |
| wukong.db.auto-fill-date-column.enabled      | Boolean  | false  | 是否启用自动添加数据库日期字段 |
| wukong.db.auto-fill-date-column.date-columns | String[] | null   | 要更新的日期字段               |
|                                              |          |        |                                |

Spring 自带的参数

| 参数名                      | 类型   | 默认值                                       | 说明                                                       |
| --------------------------- | ------ | -------------------------------------------- | ---------------------------------------------------------- |
| context.initializer.classes | String | com.wukong.db.initializer.CheckDbInitializer | 会自动校验要连接的数据库是否存在，如果不在，就创将一个空库 |
| spring.datasource.\*        | suit   | null                                         | 如果要连接数据库，那么这些数值就一定要配置                 |
|                             |        |                                              |                                                            |

## 2、如何使用

### 2.1 使用@Autowired

在`pringBoot`可控的类中，使用`@Autowired`获取配置文件

```java
@Configuration
public class MybatisConfig {
    private final boolean canAutoFillDate;
    @Autowired(required = false)
    public MybatisConfig(WkConfigurationProperties wkConfigurationProperties){
        assert wkConfigurationProperties!=null;
        canAutoFillDate=wkConfigurationProperties.getDb()
                .getAutoFillDateColumn()
                .isEnabled();
    }
```

### 2.2 使用 SpringUtils._getBean_

在非可控的`class`使用`SpringUtils.getBean`

```java
WkConfigurationProperties wkConfigurationProperties=SpringUtils.getBean(WkConfigurationProperties.class);
String[] autoFillColumns = wkConfigurationProperties.getDb().getAutoFillDateColumn().getDateColumns();
```

## 3、实现过程

### 3.1 添加依赖

`spring-boot-configuration-processor`会根据代码，自动生成`build/classes/java/main/META-INF/spring-configuration-metadata.json`

```groovy
    //用来自动生成配置文件
    annotationProcessor("org.springframework.boot:spring-boot-configuration-processor"){
        exclude(group: "org.springframework", module: "spring-web")
        exclude(group: "org.springframework", module: "spring-webmvc")
        exclude(group: "org.springframework", module: "spring-core")
        exclude(group: "org.springframework", module: "spring-context")
        exclude(group: "com.vaadin.external.google", module: "android-json")
        exclude(group: "org.json", module: "json")
        exclude(group: "commons-cli", module: "commons-cli")
        exclude(group: "ch.qos.logback", module: "logback-core")
        exclude(group: "ch.qos.logback", module: "logback-classic")
    }
```

### 3.2 撰写代码

```java
@Component
@ConfigurationProperties("wukong")
@Getter
@Setter
public class WkConfigurationProperties implements Serializable {
    @Serial
    private static final long serialVersionUID = -8620267783496071683L;

    @NestedConfigurationProperty
    private DbProperties db=new DbProperties();

}
```

### 3.3 未来要完善的

添加自动校验的功能。

- 在属性上添加注释，这样当用户没有设置的时候，就会校验出错误
- 在属性上添加注释，当用户输入的参数格式不对，就会校验出错误
