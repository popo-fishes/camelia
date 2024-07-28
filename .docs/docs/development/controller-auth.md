---
order: 1
group:
  path: /ss
  title: 权限与安全防护
  order: 70
---

# Controller 权限配置

①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳✕✓✔✖

这里描述的 Controller 相关的内容，建议`除了安全模块,所以接口都以 /api开头, 例如user下 /api/user/getUser;/api/user/delUser`

只有两个状态，这种形式比较粗放

## 1.1 粗颗粒度-注解

无需登录

```java
@AuthenticationType(type=AuthenticationType.permitAll)
```

需要登录

```java
@AuthenticationType(type=AuthenticationType.authenticated)
```

## 1.2 粗颗粒度-配置

在配置文件中，使用通配符，配置某个路径下都可以访问。

```yml
permiturls: /init/*,/swagger-ui/**,
```

## 1.3 细颗粒度-Url 过滤

在系统中设定不同的角色，每个角色只能访问不同的 Url，这里默认`admin`可以访问所有的 Url。

## 1.4 Spring 配置函数

由于自己已经对权限进行了封装，所以在大部分情况用不到 Spring 的权限配置，Spring 可以配置那个角色可以访问某个 Url

```java
@PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_USER')  ")
@RequestMapping("/info")
publicn Map<String, String> getInfo(@RequestParam String name) {
    //代码略
}
```
