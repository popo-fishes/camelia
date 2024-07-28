---
order: 1
group:
  path: /test
  title: 代码测试
  order: 80
---

# 单元测试

- [用 JUnit 5 进行 Spring Boot 测试的详细指南](https://juejin.cn/post/7126035708061417509)
- [Spring Boot 中使用 JUnit5 进行单元测试](https://cloud.tencent.com/developer/article/2171179)
- [Spring Boot（八）：JUnit5](https://juejin.cn/post/7029463003074412580)
- [Test a Spring Boot REST Controller with JUnit 5](https://howtodoinjava.com/spring-boot2/testing/rest-controller-unit-test-example/)

## 1、Junit 技巧

**@Test** :表示方法是测试方法。但是与 JUnit4 的@Test 不同，他的职责非常单一不能声明任何属性，拓展的测试将会由 Jupiter 提供额外测试

- **@ParameterizedTest** :表示方法是参数化测试，下方会有详细介绍
- **@RepeatedTest**:表示方法可重复执行，下方会有详细介绍
- **@DisplayName** :为测试类或者测试方法设置展示名称
- **@BeforeEach** :表示在每个单元测试之前执行
- **@AfterEach** :表示在每个单元测试之后执行
- **@BeforeAll** :表示在所有单元测试之前执行
- **@AfterAll** :表示在所有单元测试之后执行
- **@Tag** :表示单元测试类别，类似于 JUnit4 中的@Categories
- **@Disabled** :表示测试类或测试方法不执行，类似于 JUnit4 中的@Ignore
- **@Timeout** :表示测试方法运行如果超过了指定时间将会返回错误
- **@ExtendWith** :为测试类或测试方法提供扩展类引用

我们可以用@DisplayName 注解给测试方法取一个名字，这个注解不仅可以用在测试方法上，还可以用在测试类上面。

### 1.1 测试顺序

如果对顺序有要求的话，建议使用`@TestMethodOrder(MethodOrderer.OrderAnnotation.class)` + `@Order(1)`

```java
@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
public class FileUtilTest {
    @Test
    @Order(1)
    @DisplayName("代码中包含测试的图片文件")
    public void theTestFileIsExist() throws FileNotFoundException {

    }
}
```

### 1.2 重复测试

可以指定测试数量，并且指定显示名称，具体用法在网上查查

```
@RepeatedTest(1)
```

### 1.3 条件测试

#### 自定义条件

@EnabledIf 和@DisabledIf 注解用来设置自定义条件，示例：

```java
@Test
@EnabledIf("customCondition")
void enabled() {
    // ...
}

@Test
@DisabledIf("customCondition")
void disabled() {
    // ...
}

boolean customCondition() {
    return true;
}

```

#### 内置条件

JUnit5 的`org.junit.jupiter.api.condition`包中内置了一些条件注解。

##### 操作系统条件

`@EnabledOnOs`和`DisabledOnOs`，示例：

```java
@Test
@EnabledOnOs(MAC)
void onlyOnMacOs() {
    // ...
}

@TestOnMac
void testOnMac() {
    // ...
}

@Test
@EnabledOnOs({ LINUX, MAC })
void onLinuxOrMac() {
    // ...
}

@Test
@DisabledOnOs(WINDOWS)
void notOnWindows() {
    // ...
}

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Test
@EnabledOnOs(MAC)
@interface TestOnMac {
}
```

##### JRE 条件

`@EnabledOnJre`和`@DisabledOnJre`用于指定版本，`@EnabledForJreRange`和`@DisabledForJreRange`用于指定版本范围，示例：

```java
@Test
@EnabledOnJre(JAVA_8)
void onlyOnJava8() {
    // ...
}

@Test
@EnabledOnJre({ JAVA_9, JAVA_10 })
void onJava9Or10() {
    // ...
}

@Test
@EnabledForJreRange(min = JAVA_9, max = JAVA_11)
void fromJava9to11() {
    // ...
}

@Test
@EnabledForJreRange(min = JAVA_9)
void fromJava9toCurrentJavaFeatureNumber() {
    // ...
}

@Test
@EnabledForJreRange(max = JAVA_11)
void fromJava8To11() {
    // ...
}

@Test
@DisabledOnJre(JAVA_9)
void notOnJava9() {
    // ...
}

@Test
@DisabledForJreRange(min = JAVA_9, max = JAVA_11)
void notFromJava9to11() {
    // ...
}

@Test
@DisabledForJreRange(min = JAVA_9)
void notFromJava9toCurrentJavaFeatureNumber() {
    // ...
}

@Test
@DisabledForJreRange(max = JAVA_11)
void notFromJava8to11() {
    // ...
}
```

##### JVM 系统属性条件

`@EnabledIfSystemProperty`和`@DisabledIfSystemProperty`，示例：

```java
@Test
@EnabledIfSystemProperty(named = "os.arch", matches = ".*64.*")
void onlyOn64BitArchitectures() {
    // ...
}

@Test
@DisabledIfSystemProperty(named = "ci-server", matches = "true")
void notOnCiServer() {
    // ...
}
```

##### 环境变量条件

`@EnabledIfEnvironmentVariable`和`@DisabledIfEnvironmentVariable`，示例：

```java
@Test
@EnabledIfEnvironmentVariable(named = "ENV", matches = "staging-server")
void onlyOnStagingServer() {
    // ...
}

@Test
@DisabledIfEnvironmentVariable(named = "ENV", matches = ".*development.*")
void notOnDeveloperWorkstation() {
    // ...
}
```

## 2、 SpringTest 技巧

### 2.1 回滚数据库操作

Junit 进行数据库操作时，**会真实的往数据库中添加数据**。

不想污染数据库，那么需要自动回滚。

需要在`Class`添加下面的注解`@Transactional`与`@Rollback`

```java
@SpringBootTest
@Transactional
@Rollback
public class StudentServiceTest {
```

### 2.2 使用不同的配置文件

#### 增量模式

- 在 resoureces 文件夹下新建`application-test.yml`文件，在里面填写测试的配置.

- 在测试类中使用`@ActiveProfiles("test")`注解

注意，这种方式是使用**覆盖**的方式加载配置，它会先加载`application.yml`中的默认配置，然后再加载`application-test.yml`中的测试配置，如果测试配置和默认不同，使用测试配置。如果未覆盖，则使用默认配置。

#### 全覆盖模式

使用`@TestPropertySource`注解加载测试配置

这种方式只会加载测试目录 resources 下的 application-test.yml 文件，不能放到 main/resources 目录下。

```java
@SpringBootTest
@TestPropertySource(properties = {"spring.config.location=classpath:application-postgres.yml"})
public class DbPostgresTest {
}

```

### 2.3 多线程与单线程

junit 默认是执行类级别的多线程进行测试，这样能提高速度，但是当进行数据库操作时，多个类一起执行会出现错误。所以要改称单线程，具体做法如下：

添加：`resources/junit-platform.properties`文件，并修改成单线程

```properties
#是否允许并行执行true/false
junit.jupiter.execution.parallel.enabled=false

#是否支持方法级别多线程 same_thread/concurrent 相同线程/并发
junit.jupiter.execution.parallel.mode.default = concurrent

#是否支持类级别多线程 same_thread/concurrent  相同线程/并发
junit.jupiter.execution.parallel.mode.classes.default = concurrent

#最大池大小可以使用Paralle进行配置
junit.jupiter.execution.parallel.config.strategy = fixed
junit.jupiter.execution.parallel.config.fixed.parallelism = 5
```

## 模拟数据

```java
List<Student> list = TestUtil.getMockData(Student.class, "mock/Student.json");
```

## 一些常用的注解

@MybatisTest
