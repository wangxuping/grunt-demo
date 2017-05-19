module.exports = function (grunt) {
  // 项目配置
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    //concat插件的配置信息
    concat: {
        options:{
            stripBanners:true, //合并时允许输出头部信息
            banner:'/*!<%= pkg.name %>-<%= pkg.version %>-‘+‘<%=grunt.template.today("yyyy-mm-dd") %> */'
        },
        cssConcat:{
            src:['src/css/gobal.css','src/css/main.css'],
            dest:'src/css/concat/<%= pkg.name %>-<%= pkg.version %>.css' //dest 是目的地输出
        },
        jsConcat:{
            src:'src/js/*.js',
            dest:'src/js/concat/<%=pkg.name %>-<%= pkg.version %>.js'
        }
    },
    //压缩css
    cssmin:{
        options:{
            stripBanners:true, //合并时允许输出头部信息
            banner:'/*!<%= pkg.name %>-<%= pkg.version %>-'+'<%=grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        build:{
            src:'src/css/concat/<%=pkg.name %>-<%=pkg.version %>.css',//压缩是要压缩合并了的
            dest:'dist/css/<%= pkg.name %>-<%= pkg.version %>.min.css' //dest 是目的地输出
        }
    },
    //压缩js
    uglify:{
        options:{
            stripBanners:true, //合并时允许输出头部信息
            banner:'/*!<%= pkg.name %>-<%= pkg.version %>-'+'<%=grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        build:{
            src:'src/js/concat/<%=pkg.name %>-<%= pkg.version %>.js',//压缩是要压缩合并了的
            dest:'dist/js/<%= pkg.name %>-<%= pkg.version %>.min.js' //dest 是目的地输出
        }
    },
    jshint: {
      build:['Gruntfile.js','src/js/*.js'],
      options: {
        jshintrc:'.jshintrc'
      }
    },
    csslint:{
        options:{
            csslintrc:'.csslint'
        },
        build:['src/css/*.css']
    },
    watch:{
        build:{
            files:['src/js/*.js','src/css/*.css'],
            tasks:['jshint','csslint','concat','cssmin','uglify'],
            options:{spawn:false}
        }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  // 默认任务
  //grunt.registerTask('default', ['jshint','uglify','watch']);
  grunt.registerTask('default', ['jshint','csslint','concat','cssmin','uglify','watch']);
};


