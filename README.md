#### 1、谈谈你对工程化的初步认识，结合你之前遇到过的问题说出三个以上工程化能够解决问题或者带来的价值。
- 工程化≠某个工具.主要体现在项目模块化、组件化、规范化、自动化四个方面
- 使用脚手架工具自动搭建项目,提高开发效率
- 约定项目目录解构,统一代码风格,自动化部署.降低维护成本,
- 提交项目代码前进行代码检查,提交log日志格式限制.保证项目质量

- 项目中遇到的问题
    - 以前项目采用手动部署,很容易拷贝错误导致项目崩溃

    - 历史遗留代码风格多样化,看起来真的累
    
    - 生产环境和测试环境配置文件不同,需要手动配置

    - 手动发布的css,js文件夹过大需要花费大量拷贝时间

#### 2、你认为脚手架除了为我们创建项目结构，还有什么更深的意义？
- 避免重复工作,约定项目目录解构,统一代码风格,自动化部署.降低维护成本,保证项目质量.

#

## 编程题
#### 1、概述脚手架实现的过程，并使用 NodeJS 完成一个自定义的小型脚手架工具
- 通过命令行交互询问用户问题,根据用户回答的结果生成文件
- 运行node脚手架
```
1. yarn link  

2. pages-boilerplate
```

#### 2、尝试使用 Gulp 完成项目的自动化构建
- 创建了clean,style,script,page,image,font,extra,serve,useref,deploy 10个任务

- knownOptions对象预设了接收用户输入参数配置默认值及类型,通过 minimist插件接收命令行用户输入参数
- config对象预设数据作为项目目录配置的默认值,读取来自node执行目录的pages.config.js文件和config数据合并
- clean 任务清理dist和temp两个目录
- style 任务将scss转换成css文件,并发布到temp目录
- script 任务将js编译转换成es2015,发布到temp目录
- page 任务通过config.data 自定义的数据 将html模板文件中的数据替换并发布到temp目录
- image 任务将image文件压缩处理,发布到dist目录
- font 任务将能够通过imagemin压缩的文件压缩,不能压缩的copy的方式操作,发布到dist目录
- extra 任务pulic目录下的文件copy到dist文件夹
- serve 任务开启文件监听,通过配置端口开启浏览器web服务,实时更新
- useref 任务将temp文件下的js,css,html 压缩,发布到dist目录
- deploy 任务将dist目录下的文件发布到github分支上

```
yarn clean //执行目录清理

        PS C:\Users\zzy\Documents\lgClass\pages-boilerplate> yarn clean
        yarn run v1.22.4
        $ gulp clean
        [20:38:07] Using gulpfile ~\Documents\lgClass\pages-boilerplate\gulpfile.js
        [20:38:07] Starting 'clean'...
        [20:38:07] Finished 'clean' after 27 ms
        Done in 1.47s.

yarn lint //并行执行 style和script 任务

        PS C:\Users\zzy\Documents\lgClass\pages-boilerplate> yarn lint
        yarn run v1.22.4
        $ gulp lint
        [20:37:23] Using gulpfile ~\Documents\lgClass\pages-boilerplate\gulpfile.js
        [20:37:23] Starting 'lint'...
        [20:37:23] Starting 'style'...
        [20:37:23] Starting 'script'...
        [20:37:24] Finished 'style' after 740 ms
        [20:37:24] Finished 'script' after 741 ms
        [20:37:24] Finished 'lint' after 745 ms
        Done in 1.94s.

yarn  compile //并行执行 style、script和page 任务

        PS C:\Users\zzy\Documents\lgClass\pages-boilerplate> yarn compile
        yarn run v1.22.4
        $ gulp compile
        [20:38:30] Using gulpfile ~\Documents\lgClass\pages-boilerplate\gulpfile.js
        [20:38:30] Starting 'compile'...
        [20:38:30] Starting 'style'...
        [20:38:30] Starting 'script'...
        [20:38:30] Starting 'page'...
        [20:38:31] Finished 'script' after 908 ms
        [20:38:31] Finished 'page' after 910 ms
        [20:38:31] Finished 'style' after 913 ms
        [20:38:31] Finished 'compile' after 915 ms
        Done in 2.10s.

yarn serve --port 5202 --open //执行serve任务,接收2个可选参数port端口号和open是否打开浏览器

        PS C:\Users\zzy\Documents\lgClass\pages-boilerplate> yarn serve --port 5202 --open
        yarn run v1.22.4
        $ gulp serve --port 5202 --open
        [20:39:38] Using gulpfile ~\Documents\lgClass\pages-boilerplate\gulpfile.js
        [20:39:38] Starting 'serve'...
        [Browsersync] Access URLs:
        --------------------------------------
            Local: http://localhost:5202
            External: http://192.168.94.49:5202
        --------------------------------------
                UI: http://localhost:3001
        UI External: http://localhost:3001
        --------------------------------------
        [Browsersync] Serving files from: temp
        [Browsersync] Serving files from: dist
        [Browsersync] Serving files from: public

yarn build //执行clean清理文件夹,执行style, script, page后发布到dist 和image、font、extra任务并行执行

        PS C:\Users\zzy\Documents\lgClass\pages-boilerplate> yarn build
        yarn run v1.22.4
        $ gulp build
        [20:36:39] Using gulpfile ~\Documents\lgClass\pages-boilerplate\gulpfile.js
        [20:36:39] Starting 'build'...
        [20:36:39] Starting 'clean'...
        [20:36:39] Finished 'clean' after 27 ms
        [20:36:39] Starting 'image'...
        [20:36:39] Starting 'font'...
        [20:36:39] Starting 'extra'...
        [20:36:39] Starting 'style'...
        [20:36:39] Starting 'script'...
        [20:36:39] Starting 'page'...
        [20:36:40] gulp-imagemin: Couldn't load default plugin "gifsicle"
        [20:36:40] gulp-imagemin: Couldn't load default plugin "mozjpeg"
        [20:36:40] gulp-imagemin: Couldn't load default plugin "optipng"
        [20:36:41] gulp-imagemin: Couldn't load default plugin "gifsicle"
        [20:36:41] gulp-imagemin: Couldn't load default plugin "mozjpeg"
        [20:36:41] gulp-imagemin: Couldn't load default plugin "optipng"
        [20:36:41] gulp-imagemin: Minified 1 image (saved 10.9 kB - 17.4%)
        [20:36:41] gulp-imagemin: Couldn't load default plugin "gifsicle"
        [20:36:41] gulp-imagemin: Couldn't load default plugin "mozjpeg"
        [20:36:41] gulp-imagemin: Couldn't load default plugin "optipng"
        [20:36:41] Finished 'extra' after 1.86 s
        [20:36:41] Finished 'script' after 1.82 s
        [20:36:41] Finished 'page' after 1.82 s
        [20:36:41] gulp-imagemin: Minified 1 image (saved 693 B - 6%)
        [20:36:41] Finished 'style' after 1.83 s
        [20:36:41] Starting 'useref'...
        [20:36:41] Finished 'image' after 2.32 s
        [20:36:41] Finished 'font' after 2.46 s
        [20:36:41] Finished 'useref' after 636 ms
        [20:36:41] Finished 'build' after 2.55 s
        Done in 3.88s.

yarn start //执行build编译后执行serve任务,imagemin没有装好

        PS C:\Users\zzy\Documents\lgClass\pages-boilerplate> yarn start --port 3302 --open
        yarn run v1.22.4
        $ gulp start --port 3302 --open
        [20:21:22] Using gulpfile ~\Documents\lgClass\pages-boilerplate\gulpfile.js
        [20:21:22] Starting 'start'...
        [20:21:22] Starting 'clean'...
        [20:21:22] Finished 'clean' after 20 ms
        [20:21:22] Starting 'image'...
        [20:21:22] Starting 'font'...
        [20:21:22] Starting 'extra'...
        [20:21:22] Starting 'style'...
        [20:21:22] Starting 'script'...
        [20:21:22] Starting 'page'...
        [20:21:22] gulp-imagemin: Couldn't load default plugin "gifsicle"
        [20:21:22] gulp-imagemin: Couldn't load default plugin "mozjpeg"
        [20:21:22] gulp-imagemin: Couldn't load default plugin "optipng"
        [20:21:23] gulp-imagemin: Couldn't load default plugin "gifsicle"
        [20:21:23] gulp-imagemin: Couldn't load default plugin "mozjpeg"
        [20:21:23] gulp-imagemin: Couldn't load default plugin "optipng"
        [20:21:23] gulp-imagemin: Minified 1 image (saved 10.9 kB - 17.4%)
        [20:21:23] gulp-imagemin: Couldn't load default plugin "gifsicle"
        [20:21:23] gulp-imagemin: Couldn't load default plugin "mozjpeg"
        [20:21:23] gulp-imagemin: Couldn't load default plugin "optipng"
        [20:21:23] Finished 'extra' after 1.8 s
        [20:21:23] Finished 'script' after 1.75 s
        [20:21:23] gulp-imagemin: Minified 1 image (saved 693 B - 6%)
        [20:21:23] Finished 'page' after 1.76 s
        [20:21:23] Finished 'style' after 1.76 s
        [20:21:23] Starting 'useref'...
        [20:21:24] Finished 'image' after 2.11 s
        [20:21:24] Finished 'font' after 2.27 s
        [20:21:24] Finished 'useref' after 471 ms
        [Browsersync] Access URLs:
        --------------------------------------
            Local: http://localhost:3302
            External: http://192.168.94.49:3302
        --------------------------------------
                UI: http://localhost:3001
        UI External: http://localhost:3001
        --------------------------------------
        [Browsersync] Serving files from: temp
        [Browsersync] Serving files from: dist
        [Browsersync] Serving files from: public

yarn deploy --branch //执行部署dist文件夹到github分支,默认分支gh-pages

        //执行结果
        PS C:\Users\zzy\Documents\lgClass\pages-boilerplate> yarn deploy --branch
        yarn run v1.22.4
        $ gulp deploy --production --branch
        [20:29:24] Using gulpfile ~\Documents\lgClass\pages-boilerplate\gulpfile.js
        [20:29:24] Starting 'deploy'...
        [20:29:53] [gh-pages] Cloning repo
        [20:29:53] [gh-pages] Checkout remote branch `gh-pages`
        [20:29:54] [gh-pages] Updating repository
        [20:30:08] [gh-pages] Copying files to repository
        [20:30:08] [gh-pages] Adding 1 files.
        [20:30:08] [gh-pages] Committing "Update 2020-08-10T12:29:24.190Z"
        [20:30:09] [gh-pages] Pushing to remote.
        [20:30:26] Finished 'deploy' after 1.03 min
        Done in 63.99s.
```
#### 3、使用 Grunt 完成项目的自动化构建
- 创建clean,sass,babel,uglify,copy,watch 6个task,注册 default task 依次执行6个task
```
yarn grunt //执行grunt tasks

        PS C:\Users\zzy\Documents\lgClass\pages-boilerplate> yarn grunt 
        yarn run v1.22.4
        $ C:\Users\zzy\Documents\lgClass\pages-boilerplate\node_modules\.bin\grunt
        Running "clean:dist" (clean) task
        >> 1 path cleaned.

        Running "clean:temp" (clean) task
        >> 0 paths cleaned.

        Running "sass:dist" (sass) task

        Running "babel:dist" (babel) task

        Running "uglify:build" (uglify) task
        >> 1 file created 242 B → 139 B

        Running "copy:main" (copy) task
        Copied 5 files

        Running "watch" task
        Waiting...     

```