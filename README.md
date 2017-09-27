# 以下内容是我自己折腾记录

### 按照说明构建原生平台程序

#### 1. cocos creator构建设置
    * 发布平台：Android
    * API level：android-22
    * 调试模式：勾选

#### 2. 点击构建

#### 3. 点击编译

#### 4. 点击运行
  * 点击运行，卡在 `xxx uninstall org.cocos2dx.helloworld`，怎么办？
    > 解决方案：用数据线链接手机和电脑即可。因为点击运行会将程序安装到手机。
    

### 生成1.0.0版本manifest文件

```bash
> node version_generator.js -v 1.0.0 -u http://192.168.10.130:8000/tutorial-hot-update/remote-assets/ -s build/jsb-default/ -d assets/
```
- `-s`：原生平台的资源目录(cocos creator是在build/jsb-default/)
- `-d`：生成manifest文件存放目录

### 启动server服务
进入项目目录`tutorial-hot-update`，运行命令：
```bash
python -m SimpleHTTPServer 8000
```

浏览器访问地址：
```bash
http://localhost:8000/
```
可以浏览`tutorial-hot-update`目录的所有文件

### 安装程序到手机并启动程序

### 点击`检测更新`，提示`fail to download manifest file, hot update skipped`，并且cmd提示404，怎么办？
* **原因**：
启动server服务的目录是`tutorial-hot-update`，对应的地址是`http://192.168.10.130:8000/remote-assets/`，这个链接地址和manifest配置的地址不匹配，导致无法下载manifest文件。

* **解决**：`cmd`关闭server服务，`cd ../tutorial-hot-update`，启动server服务，确保链接地址和manifest文件里面的URL相匹配。


### 来自JS引擎编译生成的文件

* `\build\jsb-default\src\jsb_anysdk_constants.js`
* `\build\jsb-default\src\jsb_anysdk.js`
* `\build\jsb-default\src\jsb_polyfill.js`


#### TODO 

[如何在 Android 平台上使用 JavaScript 直接调用 Java 方法](http://www.cocos.com/docs/creator/advanced-topics/java-reflection.html)