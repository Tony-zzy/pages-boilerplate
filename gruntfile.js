
const cwd = process.cwd();
const sass=require('sass')
const loadGruntTasks=require('load-grunt-tasks')
module.exports = grunt => {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // 设置任务，删除文件夹
        clean: {
            dist: 'dist',
            temp: 'temp'
        },
        // sass编译成css文件
        sass: {
            dist: {
                options:{
                    implementation:sass
                },
                // 使用字典匹配
                files: [{
                    expand: true,
                    cwd: 'src/assets/styles/',
                    src: ['*.scss'],
                    dest: 'dist/assets/styles/',
                    ext: '.css'
                }]
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/assets/scripts',
                    src: '**/*.js',
                    dest: 'dist/assets/scripts'
                }]
            }
        },
        uglify: {
            build: {
                options: {
                    mangle: false   //默认混淆变量名和函数名
                },
                files: [{
                    expand: true,
                    cwd: 'dist/assets/scripts',
                    src: '**/*.js',
                    dest: 'dist/assets/scripts'
                }]

            }
        },
        // imagemin: {
        //     /* 压缩图片大小 */
        //     dist: {
        //         options: {
        //             optimizationLevel: 1 //定义 PNG 图片优化水平
        //         },
        //         files: [{
        //             expand: true,
        //             cwd: 'src/assets/images',//原图存放的文件夹
        //             src: ['**/*.{png,jpg,jpeg,gif}'], // 优化 img 目录下所有 png/jpg/jpeg/gif图片
        //             dest: 'dist/assets/images' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
        //         }, {
        //             expand: true,
        //             cwd: 'src/assets/fonts',//原图存放的文件夹
        //             src: ['**/*.{png,jpg,jpeg,gif,svg}'], // 优化 img 目录下所有 png/jpg/jpeg/gif图片
        //             dest: 'dist/assets/fonts' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
        //         }]
        //     }
        // },
        copy: {
            main: {
                files: [
                    { expand: true, cwd: 'src/assets/fonts', src: ['**/*'], dest: 'dist/assets/fonts' },
                    { expand: true,  cwd: 'public', src: ['**/*'], dest: 'dist/public' },
                    // src: 'src/assets/fonts',
                    // dest: 'dist/assets/fonts'
                ]
            }
        },
        watch:{
            js:{
                files:['src/assets/scripts/*.js'],
                tasks:['babel']
            },
            css:{
                files:['src/assets/styles/*.scss'],
                tasks:['sass']
            }
        }


    })
   loadGruntTasks(grunt)
    grunt.registerTask('default', ['clean', 'sass', 'babel','uglify','copy','watch'])
}