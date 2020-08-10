
const cwd = process.cwd();
module.exports = grunt => {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
          
            srcPath: 'src/assets/styles/',  // 源码
            deployPath: 'dist/assets/styles/'  // 编译输出
        },
        // 设置任务，删除文件夹
        clean: {
            dist: 'dist',
            temp: 'temp'
        },
        // sass编译成css文件
        sass: {
            dist: {
                // options: {
                //     sourcemap: 'auto',
                //     style: 'compressed'
                // },
                 
                // 这样写不起作用
                // files: {
                //  src: '<%= meta.srcPath %>*.scss',
                //  dest: '<%= meta.deployPath %>*.css'
                // }
                 
                // 这样只能编译特定的文件
                // files: {
                //  'dist/assets/styles/test.css': 'src/assets/styles/main.scss'
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