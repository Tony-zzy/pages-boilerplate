module.exports = grunt => {
    initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // 设置任务，删除文件夹
        clean: {
            dist: 'dist',
            temp:'temp'
        },
        sass: {

        }

    })
    grunt.loadNpmTasks('grunt-contrib-sass')
    grunt.loadNpmTasks('grunt-contrib-cssmin')
    grunt.loadNpmTasks('grunt-contrib-watch')
}