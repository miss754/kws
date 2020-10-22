// 1. 导入gulp这个第三方模块
const gulp = require('gulp');

// 2-1 导入gulp-cssmin这个第三方模块 css压缩
const cssmin = require('gulp-cssmin');

// 2-2 导入gulp-autoprefixer这个第三方模块 css加前缀
const autoprefixer = require('gulp-autoprefixer');

// 4-1 导入gulp-babel这个第三方模块 js的es6转es5
const babel = require('gulp-babel');
// 4-2 导入gulp-uglify这个第三方模块 js压缩
const uglify = require('gulp-uglify');

// 6-1 导入gulp-htmlmin这个第三方模块 html压缩
const htmlmin = require('gulp-htmlmin');

// 7-1 导入del这个第三方模块
const del = require('del');

// 9-1 导入gulp-webserver这个第三方模块
const webserver = require('gulp-webserver');


// 2-3 书写一个打包css的方法
const cssHandler = ()=>{
    return gulp.src('./src/css/*.css')
    .pipe(autoprefixer())
    .pipe(cssmin())
    .pipe(gulp.dest('./dist/css'))
}

//3-1 书写一个移动images文件夹的方法
const imgHandler = ()=>{
    return gulp.src('./src/images/**')
    .pipe(gulp.dest('./dist/images'))
}

// 4-3 书写一个压缩js文件的方法
const jsHandler = ()=>{
    return gulp.src('./src/js/*.js')
    // es6转es5
    .pipe(babel({
        presets:['@babel/env']
    }))
    //压缩代码
    .pipe(uglify())
    //写入到dist的js文件夹里面
    .pipe(gulp.dest('./dist/js'))
}

// 5-1 书写一个移动lib文件的方法
const libHandler = ()=>{
    return gulp.src('./src/lib/*.js')
    .pipe(gulp.dest('./dist/lib'))
}

// 6-2 书写一个压缩html文件的方法
const htmlHandler = ()=>{
    return gulp.src('./src/pages/*.html')
    .pipe(htmlmin({
        collapseWhitespace: true, //压缩空格
        removeAttributeQuotes:true, //移除属性的引号
        collapseBooleanAttributes:true,//把值为布尔值的属性简写
        removeComments:true,//移除注释
        minifyCSS:true,//把页面里面的style标签里面的css样式也去空格
        minifyJS:true,//把页面里的script标签里面的js代码给去空格
    }))
    .pipe(gulp.dest('./dist/pages'))
}

// 7-2 书写一个任务,自动删除dist目录
 const delHandler = ()=>{
    // 这个函数的目的就是为了删除dist目录使用的
    return del(['./dist'])
 }

 // 8-1 书写一个自动监控文件的任务
// 监控src下面的所有文件,只要一修改,就执行响应的任务
// 比如src下面的css文件夹,只要里面的文件一修改,我就执行一下cssHanlder这个任务
const watchHanlder = ()=>{
    // 监控src下面的css文件夹下的所以css文件,只要里面的文件一修改,我就执行一下cssHanlder这个任务
    gulp.watch('./src/css/*.css',cssHandler);
    gulp.watch('./src/images/**',imgHandler);
    gulp.watch('./src/js/*.js',jsHandler)
    gulp.watch('./src/lib/*.js',libHandler)
    gulp.watch('./src/pages/*.html',htmlHandler)
}


// 9-2 书写一个配置服务器的任务
// 在开发过程中直接把我写的东西在服务器上打开
// 因为我要一边写一边修改一边测试
// 因为gulp是基于node运行的
// 这里就使用node给我们开启一个服务,不是apache,也不是nginx
// 自动刷新,当dist目录里面的代码改变以后,就会自动刷新浏览器
const serverHandler = ()=>{
    // 要把页面在服务器上打开
    // 打开的是dist目录里面我已经压缩好的页面
    return gulp.src('./dist') //找到我要打开的页面的文件夹,把这个文件夹当做网站跟目录
    .pipe(webserver({ // 需要一些配置项
        port:8080, //端口号,0-65535,尽量不要用0-1023
        open:'./pages/index.html', //你默认打开的首页,从dist下面的目录开始书写
        livereload:true, //自动刷新浏览器-热启动
        proxies:[
            // 每一个代理配置就是一个对象
            {
                source:'/weather', //源,你的代理标识符
                // 你直接请求下面这个地址压根也拿不到东西,因为跨域了
                target:'https://way.jd.com/jisuapi/weather' //目标,你要代理的地址

            }
        ]
    }))
}


// 导出一个默认任务
// 当我将来执行默认任务default的时候,就会自动帮我删除dist目录,同时压缩css,js,html,同时移动images和lib文件夹
// 小细节:当你在命令行执行gulp default的时候,可以不写default
// 你在命令行执行gulp这个指令,就是在执行gulp default
module.exports.default = gulp.series(
    delHandler,
    gulp.parallel(
        cssHandler,
        imgHandler,
        jsHandler,
        libHandler,
        htmlHandler
    ),
    serverHandler,
    watchHanlder
)


/* //2-4 导出准备好的cssHandler这个压缩和加前缀的方法
module.exports.css = cssHandler;  //2-5 执行任务指令 gulp css
//3-2 导出准备好的imgHandler这个移动images的方法
module.exports.img = imgHandler;
// 4-4 导出准备好的jsHandler这个压缩js的方法
module.exports.js = jsHandler;
//5-2 导出准备好的libHandler这个移动lib的方法
module.exports.lib = libHandler;
//6-3 导出准备好的htmlHandler这个移动html的方法
module.exports.html = htmlHandler;
//7-3 导出准备好delHandler这个删除dist目录的方法
module.exports.del = delHandler;
 */

 // 匹配条件：
    // “?”：匹配文件路径中的一个字符（不会匹配路径分隔符）
    // “src/test.js”：指定某个文件；
    // “*”：匹配所有文件 例：src/*.js(包含src下的所有js文件)；
    // “**”：匹配0个或多个子文件夹 例：src/**/*.js(包含src的0个或多个子文件夹下的js文件)；
    // “{}”：匹配多个属性,例：src/{a,b}.js(包含a.js和b.js文件) src/*.{jpg,png,gif}(src下的所有jpg/png/gif文件)；
    // “!”：排除文件 例：!src/a.js(不包含src下的a.js文件)
