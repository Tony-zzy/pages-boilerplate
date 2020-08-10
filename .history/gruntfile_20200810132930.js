module.exports = grunt => {
    initConfig({
        pkg: grunt.file.readJSON('package.json')
    })
    grunt.loadNpmTasks('grunt-contrib-sass')
    grunt.loadNpmTasks('grunt-contrib-cssmin')
    grunt.loadNpmTasks('grunt-contrib-watch')
}