const { src, dest, parallel, series } = require("gulp");

const loadPlugins = require("gulp-load-plugins");

// const sass = require("gulp-sass");
// const babel = require("gulp-babel");
// const swig = require("gulp-swig");
// const imagemin = require("gulp-imagemin");

//清除目标目录文件 ,返回的是promise 可以标记成功 所以gulp可以用
const del = require("del");
const browserSync = require("browser-sync");
const { watch } = require("browser-sync");
const cwd = process.cwd();
const minimist = require("minimist")
const ghPages = require('gulp-gh-pages');

let config = {
    build: {
        src: "src",
        dist: "dist",
        temp: "temp",
        public: "public",
        paths: {
            styles: "assets/styles/*.scss",
            scripts: "assets/scripts/*.js",
            pages: "*.html",
            images: "assets/images/**",
            fonts: "assets/fonts/**",
        },
    },
};

try {
    const loadConfig = require(`${cwd}/pages.config.js`);
    config = Object.assign({}, config, loadConfig);
    console.log(config);
} catch (e) { console.log(e) }


let knownOptions = {
    string: ["port","branch"],//值解析成string 
    boolean: ["open", "production", "prod"],//解析成bool
    default: {
        branch:"gh-pages",
        open: false,
        port: 2080,
        production: false,
        prod: false,
        baseUrl: [config.build.temp, config.build.dist, config.build.public]
    }
};
let options = minimist(process.argv.slice(2), knownOptions);

try {
    if (options.production || options.prod)
        options.baseUrl = config.build.dist
} catch (e) { console.log(e) }

const plugins = loadPlugins(); //自动加载插件
const bs = browserSync.create();
const clean = () => {
    return del([config.build.dist, config.build.temp]);
};
const style = () => {
    return src(config.build.paths.styles, {
        base: config.build.src,
        cwd: config.build.src,
    })
        .pipe(plugins.sass({ outputStyle: "expanded" }))
        .pipe(dest(config.build.temp))
        .pipe(bs.reload({ stream: true }));
};

const script = () => {
    return src(config.build.paths.scripts, {
        base: config.build.src,
        cwd: config.build.src,
    })
        .pipe(plugins.babel({ presets: [require("@babel/preset-env")] }))
        .pipe(dest(config.build.temp))
        .pipe(bs.reload({ stream: true }));
};

const page = () => {
    return src(config.build.paths.pages, {
        base: config.build.src,
        cwd: config.build.src,
    }) //src/**/*.html 寻找子目录下的html
        .pipe(plugins.swig({ data: config.data, defaults: { cache: false } })) // 防止模板缓存导致页面不能及时更新
        .pipe(dest(config.build.temp))
        .pipe(bs.reload({ stream: true }));
};

const image = () => {
    return src(config.build.paths.images, {
        base: config.build.src,
        cwd: config.build.src,
    })
        .pipe(plugins.imagemin())
        .pipe(dest(config.build.dist));
};
const font = () => {
    return src(config.build.paths.fonts, {
        base: config.build.src,
        cwd: config.build.src,
    })
        .pipe(plugins.imagemin())
        .pipe(dest(config.build.dist));
};
const extra = () => {
    return src("**", {
        base: config.build.public,
        cwd: config.build.public,
    }).pipe(dest(config.build.dist));
};

const serve = () => {
    //监视文件变化
    watch(config.build.paths.styles, { cwd: config.build.src }, style);
    watch(config.build.paths.scripts, { cwd: config.build.src }, script);
    watch(config.build.paths.pages, { cwd: config.build.src }, page);
    //不参与构建,发布上线参与构建,开发阶段减少构建次数
    // watch("src/assets/images/**", image);
    // watch("src/assets/fonts/**", font);
    // watch("public/**", extra);

    watch(
        [config.build.paths.images, config.build.paths.fonts],
        { cwd: config.build.src },
        bs.reload
    );
    watch(
        '**',
        { cwd: config.build.public },
        bs.reload
    );
    bs.init({
        notify: false,
        open: options.open,
        port: options.port,
        // files: "dist/**",
        server: {
            baseDir:[config.build.temp, config.build.dist, config.build.public],
            routes: {
                "/node_modules": "node_modules",
            },
        },
    });
};

//根据注解重新生成html,合并文件
const useref = () => {
    return src(config.build.paths.pages, { base: config.build.temp, cwd: config.build.temp })
        .pipe(plugins.useref({ searchPath: [config.build.temp, "."] }))
        .pipe(plugins.if(/\.js$/, plugins.uglify()))
        .pipe(plugins.if(/\.css$/, plugins.cleanCss()))
        .pipe(
            plugins.if(
                /\.html$/,
                plugins.htmlmin({
                    collapseWhitespace: true,
                    minifyCSS: true,
                    minifyJS: true,
                })
            )
        )
        .pipe(dest(config.build.dist));
};

const deploy=()=>{
    return src(config.build.paths.dist)
          .pipe(ghPages());
}

const compile = parallel(style, script, page);

//上线编译
const build = series(
    clean,

    parallel(series(compile, useref), image, font, extra)

);
const lint = parallel(style, script)
// const develop = series(compile, serve);
const start = series(build, serve);
module.exports = {
    clean,
    lint,
    compile,
    serve,
    build,
    // develop,
    start,
    deploy
};