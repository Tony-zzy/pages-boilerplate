
const cwd = process.cwd();
module.exports = grunt => {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            basePath: '../',
            srcPath: '../assets/sass/',  // 源码
            deployPath: '../assets/css/'  // 编译输出
        },
        // 设置任务，删除文件夹
        clean: {
            dist: 'dist',
            temp: 'temp'
        },
        // sass编译成css文件
        sass: {
            dist: {
                options: {
                    sourcemap: 'auto',
                    style: 'compressed'
                },
                 
                // 这样写不起作用
                // files: {
                //  src: '<%= meta.srcPath %>*.scss',
                //  dest: '<%= meta.deployPath %>*.css'
                // }
                 
                // 这样只能编译特定的文件
                // files: {
                //  '<%= meta.deployPath %>test1.css': '<%= meta.srcPath %>test1.scss'
                // }
 
                // 使用字典匹配
                files: [{
                    expand: true,
                    cwd: '<%= meta.srcPath %>',
                    src: ['*.scss'],
                    dest: '<%= meta.deployPath %>',
                    ext: '.css'
                }]
            }
        }

    })
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-sass')
    grunt.loadNpmTasks('grunt-contrib-cssmin')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.registerTask('default', ['clean'])
}