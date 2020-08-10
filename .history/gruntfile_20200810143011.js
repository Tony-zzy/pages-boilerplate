
const cwd = process.cwd();
module.exports = grunt => {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
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
                    cwd: '<%= src %>/<%= paths.styles %>',
                    src: ['*.scss'],
                    dest:'<%= dist %>/<%= paths.styles %>',
                    ext: '.css'
                }]
            }
        }

    })
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-sass')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.registerTask('default', ['clean'])
}