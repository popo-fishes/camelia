---
order: 6
group:
  path: /controller
  title: 开发接口
  order: 50
---

# 文件上传与下载

默认的约定

- 数据库中不保存文件的物理路径
  - 系统会将完整的路径`/home/fanhl/wukong-files/upload/public/imgs/avatar/cat.jpg` 从`public`处截取。
  - 数据库中只保存`/imgs/avatar/cat.jpg`
- 系统设计了两个根目录：`private`与`public`，数据库中某个字段，要么是保存`public`下的文件，要么保存`private`下文件，不能混放。如果要混放，需要有另外一个字段进行区分。

## 1、目录规划

### 1.1 目录说明

- upload 目录中有两子目录，
  - private：私有目录。上传后，不同通过浏览器查看，必须通过一定权限才可以访问。
  - public：共有目录。 `sping.resources.static-locations` 对应这个目录。
    - imgs 是这个目录下的特定目录

```
wukong-files/
└── upload
    ├── private
    └── public
        └── imgs
```

### 1.2 配置文件

- 在`StorageProperties`类中定了默认的目录

```java
//项目默认的文件存储目录
@Value("${wukong.storage.upload-path:${user.home}/wukong-files/upload}")
private String uploadRootLocation;
private String imgDirName ="/imgs";
```

<font color="red">强烈建议正式项目不要使用默认的路径，因为代码中有 Junit 自动测试代码，每次系统自检，都会对这个目录下的文件进行自动删除</font>

### 1.3 主要函数

系统中提供了非常多的文件操作函数，有些是为了兼容老项目，今后要废弃的函数。所以下面只按照实际情况，列出项目中常用的函数。

| 功能说明                       | 函数名 | 备注 |
| ------------------------------ | ------ | ---- |
| 上传文件到临时目录             |        |      |
| 从临时文件复制到 imgs 目录下   |        |      |
| 从临时文件复制到 public 目录下 |        |      |
| 从临时文件复制到 public 目录下 |        |      |
|                                |        |      |

## 2、上传文件

### 2.1 公开文件的上传

公开文件上传后，可以通过浏览器的地址访问。具体的内部逻辑如下：

#### 上传到临时目录

上传的文件，是先上传到`/imgs/temp`文件夹中，当保存的时候，再将文件地址更新到数据库中。

同时将临时文件移动到正式的文件夹中。

例如：如果发现有`/imgs/temp`就将这个文件复制到 brand 文件夹中，然后进行保存。

上传文件的代码

```java
@PostMapping("/uploadToPublicTemp")
public String uploadToPublicTemp(@RequestParam("file") MultipartFile file){
    String subPath = "temp";
    // 还有关于文件格式限制、文件大小限制，详见：中配置。
    Path unixPath= storageService.storeToImgsDir(file,subPath,storageService.generateRandomFilename());
    return StringUtils.replace(unixPath.toString()
            ,storageProperties.getPublicDir(),"");
}
```

#### 将临时文件复制到正常目录

复制很简单，只用一个函数就行了`Path newPath=storageService.copyInImgsDir(tempFilePath,"brand");`。下面是一个`junit`测试的代码。

```java
@Test
@DisplayName("上传图片文件")
void testPost() throws Exception {
    File testFile= ResourceUtils.getFile("classpath:cat.png");
    MockMultipartFile mockMultipartFile=fileToMultipartFile(testFile);

    String  tempFilePath=mockMvc.perform(MockMvcRequestBuilders
                    .multipart("/upload/uploadToPublicTemp")
                    .file(mockMultipartFile)
            )
            .andDo(print())
            .andExpect(status().isOk())
            .andReturn().getResponse().getContentAsString();

    Assertions.assertTrue(WkStringUtils.startsWith(tempFilePath,"/imgs/temp/"));

    // 模拟保存图片的函数
    Path newPath=storageService.copyInImgsDir(tempFilePath,"brand");

    Assertions.assertEquals(newPath.toString()
            ,"/imgs/brand/"+WkStringUtils.getFilename(tempFilePath));

    //删除测试的临时文件
    String[] files={
            storageProperties.getPublicDir()+tempFilePath,
            storageProperties.getPublicDir()+newPath.toString(),
    };
    deleteFiles(files);
}
```

### 2.2 私有文件上传

#### 上传到临时目录

```java
@PostMapping("/uploadToPrivateTemp")
public String uploadToPrivateTemp(@RequestParam("file") MultipartFile file){
    String subPath = "temp";
    // 还有关于文件格式限制、文件大小限制，详见：中配置。
    Path unixPath= storageService.storeToPrivate(file,subPath,storageService.generateRandomFilename());
    return StringUtils.replace(unixPath.toString()
            ,storageProperties.getPrivateDir(),"");
}
```

#### 将临时文件复制到正常目录

下面是一个单元测试的代码

```java
@Test
@DisplayName("上传文件到私有目录的过程")
void uploadToPrivateTemp() throws Exception {
    File testFile= ResourceUtils.getFile("classpath:cat.png");
    MockMultipartFile mockMultipartFile=fileToMultipartFile(testFile);

    String  tempFilePath=mockMvc.perform(MockMvcRequestBuilders
                    .multipart("/upload/uploadToPrivateTemp")
                    .file(mockMultipartFile)
            )
            .andDo(print())
            .andExpect(status().isOk())
            .andReturn().getResponse().getContentAsString();

    Assertions.assertTrue(WkStringUtils.startsWith(tempFilePath,"/temp/"));

    // 模拟保存图片的函数
    Path newPath=storageService.copyInPrivateDir(tempFilePath,"brand");

    Assertions.assertEquals(newPath.toString()
            ,"/brand/"+WkStringUtils.getFilename(tempFilePath));

    //删除测试的临时文件
    String[] files={
            storageProperties.getPrivateDir()+tempFilePath,
            storageProperties.getPrivateDir()+newPath.toString(),
    };
    deleteFiles(files);
}
```

## 3、删除文件

调用`storageService.deletePublicFile(brand.getBrandLogo());` 进行文件删除。

```java
    @Override
    public int deleteByPrimaryKey( Integer brandId){
        // delete the logo
        Optional<Brand> opt =brandDao.selectByPrimaryKey(brandId);
        if(opt.isEmpty()){
            throw new BusinessException("not find brand:"+brandId);
        }
        Brand brand = opt.get();
        if(!WkStringUtils.isEmpty(brand.getBrandLogo())){
            storageService.deletePublicFile(brand.getBrandLogo());
        }
        return brandDao.deleteByPrimaryKey(brandId);
    }
```

## 4、显示或下载文件

### 4.1 public 目录

#### 配置静态路径

`wukong.storage.upload-path` 配置上传的根目录。

`spring.web.resources.static-locations`配置上传根目录下的 public 为可以展示的文件夹:`file:${wukong.storage.upload-path}/public`

```yaml
spring:
  messages:
    basename: i18n/messages
    encoding: UTF-8
  web:
    resources:
      static-locations: file:${wukong.storage.upload-path}/public
wukong:
  core:
    response: antd
  storage:
    upload-path: /home/fanhl/wukong-files/upload
```

#### 直接访问

在浏览器中直接访问这个目录就可以，如果是图片文件，就直接显示。如果是其他类型的文件，在 nginx 服务器上配置，可以下载。

`http://localhost:8080/cat.png`

### 4.2 private 目录

由于 private 目录没有放在`spring.web.resources.static-locations`，所以不能按照路径直接访问。那么只能使用 controller 来实现，下面是实现的代码。

#### 文件下载

```java
/**
 * 从private目录中下载文件
 * http://localhost:8080/loadDownPrivateFile?fileName=brand/1.png
 * @param fileName  例如：/brand/1.png
 * @return ResponseEntity<Resource>
 */
@GetMapping("/loadDownPrivateFile")
@ResponseBody
public ResponseEntity<Resource> loadDownPrivateFile(String fileName) {
    Resource file = storageService.loadPrivateFileAsResource(cleanFileName(fileName));
    return ResponseEntity.ok().header(HttpHeaders.CONTENT_DISPOSITION,
            "attachment; filename=\"" + file.getFilename() + "\"").body(file);
}
```

#### 文件显示

针对图片软件

```java
/**
 * 在浏览器中显示图片 http://localhost:8080/showPrivateImg?fileName=brand/1.png
 * @param fileName 例如：/brand/1.png
 * @return Resource
 */
@GetMapping(value="/showPrivateImg",produces = MediaType.IMAGE_JPEG_VALUE)
@ResponseBody
public Resource showPrivateImg(String fileName)  {
    return storageService.loadPrivateFileAsResource(cleanFileName(fileName));
}
```

## 5、文件操作库

`StorageService`封装了常用的文件操作方法，具体见`自定义函数库`
