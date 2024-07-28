---
order: 12
group:
  path: /controller
  title: 开发接口
  order: 50
---

# Json 处理技巧

- 将对象转为 JSON 字符串

```java
ObjectMapper objectMapper = new ObjectMapper();
String str = objectMapper.writeValueAsString(javaObj);
```

- 将 JSON 字符串转为 Map

```java
JavaType valueType = objectMapper.getTypeFactory()
    .constructParametricType(HashMap.class, String.class, Object.class);
HashMap<String, Object> map = objectMapper.readValue(str, valueType);
```

- 将 JSON 字符串转为 List

```java
JavaType valueType = objectMapper.getTypeFactory()
     .constructParametricType(ArrayList.class, Person.class);
List<Person> list = objectMapper.readValue(str, valueType);
```
