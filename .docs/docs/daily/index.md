---
title: 日常必备
order: 1
---

# 日常必备

这里记录了每次开发中，可能用到的一些功能。

## 1. 代码生成

在 idea 中的 Terminal 中执行下面命令：

```shell
./gradlew gen2
```

## 2. 常用网址

- [MyBatis Dynamic SQL](https://mybatis.org/mybatis-dynamic-sql/docs/introduction.html)

- [MyBatis Generator](http://mybatis.org/generator/)

## 3. 调试技巧

### 3.1 输出 sql

`logback-spring` 文件中配置要输出的日志包。例如

```xml
    <!--配置具体的输出类-->
    <logger name="com.wukong" level="debug"/>
```

### 3.2 文件对比

Meld 或者使用 Idea 的文件对比，选中两个文件的标签，右键显示对比工具。

### 3.3 lombok

有时候经常发现：@Slf4j 或者 lombok 相关的插件错误。检查配置如下：

- 依赖文件中添加

  ```groovy
  	annotationProcessor group: 'org.projectlombok', name: 'lombok', version: '1.18.24'
  	compileOnly group: 'org.projectlombok', name: 'lombok', version: '1.18.24'

  	testAnnotationProcessor group: 'org.projectlombok', name: 'lombok', version: '1.18.24'
  	testCompileOnly group: 'org.projectlombok', name: 'lombok', version: '1.18.24'
  ```

- Compiler->Annotation Processors-> Enable annotation processing 选中

- 安装 lombok 插件

## 4. 快捷键

### 4.1 Idea

[Idea 快捷键大全](https://blog.csdn.net/qq_38963960/article/details/89552704)

|                          |                                                                       |
| ------------------------ | --------------------------------------------------------------------- |
| Ctrl + Tab               | 编辑窗口切换，如果在切换的过程又加按上 delete，则是关闭对应选中的窗口 |
| Shift + Alt + 左方向键   | 退回到上一个操作的地方 `（必备）` Ctrl + Alt + 左方向键               |
| Shift + Alt + 右方向键   | 前进到上一个操作的地方 `（必备）`Ctrl + Alt + 右方向键                |
| Ctrl + Shift + F         | 根据输入内容查找整个项目 或 指定目录内文件 `（必备）`                 |
| Ctrl + Shift + R         | 根据输入内容替换对应内容，范围为整个项目 或 指定目录内文件 `（必备）` |
| Ctrl + Shift + /         | 代码块注释 `（必备）`                                                 |
| Ctrl + Shift + Enter     | 自动结束代码，行末自动添加分号 `（必备）`                             |
| Ctrl + Shift + Backspace | 退回到上次修改的地方                                                  |
|                          |                                                                       |

### 4.2 idea 配置

java implements Serializable 怎么生成 serialversionUID(idea 版)
Settings----Inspections----Serializable class without 'serialVersionUID’打勾

### 4.3 Linux

|                     |                    |
| ------------------- | ------------------ |
| super+左或右        | 窗口一半居中       |
| super+上            | 窗口最大           |
| super+下            | 恢复最初大小       |
| shift+super+ 左或右 | 在不同显示器中移动 |
| super+e             | 文件管理器快捷键   |
|                     |                    |

```
文件管理器快捷键
是通过自定义快捷键，把命令nautilus -w加入的
```

SimpleImage 后台图片处理
