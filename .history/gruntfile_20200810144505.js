
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
        uglify: {                
            build: {             
            //    options: {
            //      mangle: false   //默认混淆变量名和函数名
            //    },
               files:[{
                expand: true,
                cwd: 'src/assets/scripts',
                src: '**/*.js',
                dest: 'dist/assets/scripts'
              }]
            //    [{
            //     expand: true,
            //     cwd: 'src/assets/scripts/',
            //     src: ['*.js'],
            //     dest: 'dist/assets/scripts/',          
            //     // rename: function (dst, src) {
                
            //     //   return src;
            //     // }
            //   }]
            }  
         }  


    })
    grunt.loadNpmTasks('grunt-contrib-clean')
    grunt.loadNpmTasks('grunt-contrib-sass')
    grunt.loadNpmTasks('grunt-contrib-cssmin')
    grunt.loadNpmTasks('grunt-contrib-watch')
    grunt.loadNpmTasks('grunt-contrib-uglify')
    grunt.registerTask('default', ['clean'])
}