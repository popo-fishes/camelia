---
order: 13
group:
  path: /controller
  title: 开发接口
  order: 50
---

# 常用函数

## 得到登录用户

这是最原始的做法

```java
@RequestMapping("/testAuth")
public CustomUserDetails testAuth() {
    SecurityContext ctx = SecurityContextHolder.getContext();
    Authentication auth = ctx.getAuthentication();
    CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();
    return user;
}

```

一般在权限模块中，会进行了二次封装，使用`SecurityContextUtils`获得当前登录的用户。

```java
    /**
     * 返回用户的信息，包含两部分内容：用户基本信息 + 所包含的权限
     * @return
     */
    @AuthenticationType(type=AuthenticationType.authenticated)
    @RequestMapping("/currentUser")
    @AntdResult
    public Optional<Admin> currentUser(){

        Long adminId=  SecurityContextUtils.getLoginUser().getAdminId();
        Optional<Admin>  adminOptional=  adminService.selectByPrimaryKey(adminId);
        return  adminOptional;
    }

```

## 得到 Request

原始的做法

```java
@RequestMapping("/testRequest")
public Object testRequest() {
    HttpServletRequest request= RequestContextHolderUtil.getRequest();
    return request.getHeader("Authorization");
}
```

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
