
const cwd = process.cwd();
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
                    dest: 'temp/assets/scripts'
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
                    cwd: 'temp/assets/scripts',
                    src: '**/*.js',
                    dest: 'dist/assets/scripts'
                }]

            }
        },
        imagemin: {
            /* 压缩图片大小 */
            dist: {
                options: {
                    optimizationLevel: 1 //定义 PNG 图片优化水平
                },
                files: [{
                    expand: true,
                    cwd: 'src/assets/images',//原图存放的文件夹
                    src: ['**/*.{png,jpg,jpeg,gif}'], // 优化 img 目录下所有 png/jpg/jpeg/gif图片
                    dest: 'dist/assets/images' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
                },{
                    expand: true,
                    cwd: 'src/assets/fonts',//原图存放的文件夹
                    src: ['**/*.{png,jpg,jpeg,gif,svg}'], // 优化 img 目录下所有 png/jpg/jpeg/gif图片
                    dest: 'dist/assets/fonts' // 优化后的图片保存位置，覆盖旧图片，并且不作提示
                }]
            }
        },
        copy: {
            main: {
                src: 'src/assets/fonts',
                dest: './dest/'
            },
        }


    })
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-sass')
    // grunt.loadNpmTasks('grunt-contrib-cssmin')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.loadNpmTasks('grunt-contrib-imagemin')
    grunt.loadNpmTasks('grunt-babel')
    grunt.registerTask('default', ['clean', 'sass', 'babel', 'uglify','imagemin'])
}