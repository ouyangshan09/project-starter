# project-starter v0.0.1 概要设计

序号 | 修订日期    | 修订内容 | 修订人 | 评审人
---- | ---------- | -------- | ----- | -----
01   | 2019-06-07 | 初稿     | 欧阳 | -

## 目录

* [1. 需求](#需求)
* [2. 功能列表](#功能)
* [3. 涉及知识](#涉及知识)
* [4. 项目结构](#项目结构)
* [5. 开发规范](#开发规范)
* [6. Error](#Error)

## 需求
1. 可对es6、es7，甚至高于当前浏览器未实现标准的代码进行编译，输出es5等标准代码，必要时还需要对大部分浏览器做兼容处理，使代码可以在大部分浏览器（Chorme、Firefox、IE、Edge、Safrio、搜狗、360、...）正常运行
2. 在兼容的同时还必须保留兼容后的代码包大小，做到按需加载
3. 代码分块设计（webpack4.x 支持，需要有分块的设计方案）
4. 开发(development)中的代码热更新
5. 不同开发模式的不同config配置，（依赖编译环境变量）
6. 常用依赖库的固定打包一个文件
7. UI所有样式打包为一个文件
8. 编译生成环境自动清理旧文件
9. eslint检查，vscode 格式自动formatter
10. docker部署
11. 单元测试
12. react组件测试
13. 异步框架（redux + ajax）
14. redux-logger重新再封装
15. 自动化工具，指的是redux-action自动化创建d.ts文件提示
16. 规范化standard redux目录结构
17. 规范化standard react目录结构
18. 本地服务mock数据功能
19. 自动化工具，根据后端文档或者后端controller.java文件创建api.js接口
20. 统一标准的Error处理格式

## 功能
1. 打包代码
2. 打包css
3. 按需加载
4. 代码分块
5. 热更新和局部热更新
6. 模板文件自动打包
7. 单元测试和react测试
8. 自动部署
9. eslint检查和vscode代码格式化
10. mock数据服务

## 涉及知识
1. babel 
2. webpack
3. babel-plugin
4. docker
5. Lunix
6. 部署
7. vscode plugin


## 项目结构
```
|- root (根目录)
|-- doc 概要设计文档
|-- public 公共文件
     |-- resource 业务依赖文件夹
     |-- config 项目配置
|-- src 代码源文件
     |-- components 公共组件
     |-- utils 公共工具
     |-- constons 公共常量
     |-- index.js 项目入口
     |-- routes.js 路由配置
|-- test 测试用例
|-- scripts 部署脚本
|-- dockerfile docker服务配置
|-- CHANGELOG 项目版本变更说明（版本发布说明）
|-- CONTRIBUTING.md git提交规范
```


## 开发规范

1. 业务中使用多次（5次）的组件，可预计未来超过10次的，请把组件设计好，放入`components`文件夹中
2. 项目中使用多次（5次）的函数，可预见未来超过10次以上的，放入`utils`文件夹中
3. 项目中使用多次同时该值需要在被多个地方引用，该值具有唯一性，放入`constons`文件夹中
4. 存入`components, utils`的组件，函数，请一定要写相关的测试用例
5. 所有文件已组件为主要内的请遵循该命名规范`xx.component.js`，测试用例为`xx.component.test.js`


# Error

* 自定义Error必须继承ES Error对象
* 自定义Error实现5个属性，`name, code, message, type, stack`

`name`：错误名称，暂时保留 <br>
`code`：错误标志码，该值是后台给的唯一常量，如果为`0`，则本次的错误由本地产生的 <br>
`message`：错误信息，该值是后台给的需要提示的信息，如果`code === 0`，则message由本地业务产生的 <br>
`stack`：错误栈对象，该对象是记录Error对象的报错信息栈，目前用途未知 <br>
`type`：错误类型，ES标准定义了六种错误类型，希望可以通过Error来确定type的值 <br>


```
class CustomError extends Error {
     constrout(props){
          super(props)
          this.code = props.code || 0;
          this.message = props.message || 'unknown';
          this.stack = props.stack;
          this.type = null;
     }

     getCode() {
          return this.code;
     }

     getMessage() {
          return this.message;
     }

     getStack() {
          return this.stack;
     }

     getType() {
          return this.type;
     }

     toString() {
          return `
            code: ${this.code}\n
            message: ${this.message}\n
            type: ${this.type}\n
            stack: ${this.stack}\n
          `;
     }
}
```


## 概要设计


## babel 7.x 采坑记录

1. 新增babel.config.js，默认在放在`rootDir`下，可以通过babelOptions修改搜索位置
2. .babelrc 和6.x 变得完全不一致了，.babelrc 只能应用于单项目范围内的代码，不能应用`node_modules`、`link package`、`...` 等相关范围了
3. babel.config.js 可以根据环境变量设计不同的配置，它会覆盖.babelrc中的内容，它可以应用在`node_modules, link package，momopackage`等项目范围中，它的应用更加广泛
它不能局限为某个情况设计配置，因为它可能会和其它一些配置冲突，造成不可预估的错误
4. react-hot-loader 使用方法改变，具体可看官方文档`https://github.com/gaearon/react-hot-loader`
5. react version > `16.6`，需要使用热更新必须，添加@hot-loader/react-dom
6. babel-preset-env 把stage-x 等标准全部移除，需要自己手动配置
7. babel官方的相关的插件命名空间全部替换为@babel/xx
8. 
