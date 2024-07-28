---
order: 2
group:
  path: /ss
  title: 权限与安全防护
  order: 70
---

# 安全相关

①②③④⑤⑥⑦⑧⑨⑩⑪⑫⑬⑭⑮⑯⑰⑱⑲⑳✕✓✔✖

## 1. 潜在风险

### 1.1 默认密码

由于是开源代码，把代码复制过去后，默认的密码一定要修改。

#### ① 调试密码

```yaml
wukong:
  core:
    debug-pwd: fanwww
```

#### ② jwt 密钥

jwt 的密钥，这个一定要修改，必然别人就能签发 token 了。

为了安全，有两种方案：

1：定期修改密钥，那么以前签发的都失效。

2：今后可以把 token 放入 redis 中，可以验证这个 token 是不是自己签发的。

```
    security:
        jwt:
            secret: fanhluck2021to8000
```

#### ③ admin 默认密码

这个一定要修改掉
