module.exports = function(grunt) {
    'use strict';
    var gruntConfig = {
        pkg: grunt.file.readJSON('package.json'),
        cssmin: {
            add_banner: {
                options: {
                    banner: '/**\n' +
                            ' * <%= pkg.name %> - v<%= pkg.version %>\n' +
                            ' * <%= pkg.description %>\n' +
                            ' * <%= grunt.template.today("dd-mm-yyyy") %> \n'+
                            ' */',
                    keepSpecialComments: '*',
                    report: 'min',
                },
                files: {
                    'public_html/css/all.min.css': ['src/css/*.css']
                }
            }
        },
        coffee: {
            compileJoined: {
                options: {
                    join: true
                },
                files: {
                    'public_html/js/all.min.js': 'src/coffee/start.coffee'

                }
            },
            glob_to_multiple: {
                expand: true,
                flatten: true,
                cwd: 'src/coffee/',
                src: ['*.coffee'],
                dest: 'public_html/js/',
                ext: '.js'
            },
        },
        less: {
            production:{
                options: {
                    paths: ["src/less"],
                    banner: '/**\n' +
                            ' * <%= pkg.name %> - v<%= pkg.version %>\n' +
                            ' * <%= pkg.description %>\n' +
                            ' * <%= grunt.template.today("dd-mm-yyyy") %> \n'+
                            ' */'
                },
                files: {
                    "src/css/style.css": "src/less/style.less"
                }
            }
        },
        watch: {
            css: {
                files: 'src/less/*.less',
                tasks: ['less', 'cssmin'],
                options: {
                    livereload: true
                }
            },
            jade: {
                tasks: ['jade'],
                files: ['src/jade/nav.jade', 'src/jade/index.jade']
            },
            coffee: {
                tasks: ['coffee'],
                files: ['src/coffee/start.coffee']
            },
            uglify:{
                tasks: ['uglify'],
                files: ['public_html/js/*.js','!public_html/js/all.min.js']
            }
        },
        jade: {
            compile: {
                options: {
                    client: false,
                    pretty: true
                },
                files: {                    
                    'public_html/index.html': 'src/jade/index.jade'
                }
            }
        },
        uglify: {
            options: {
                banner: '/**\n'+
                        ' * <%= pkg.name %> - v<%= pkg.version %> \n' +
                        ' * <%= pkg.description %>\n' +
                        ' * <%= grunt.template.today("dd-mm-yyyy") %> \n'+
                        ' */\n'
            },
            my_target: {
                files: {
                    'public_html/js/all.min.js': ['public_html/js/*.js','!public_html/js/all.min.js']
                }
            }
        }

    };
    grunt.initConfig(gruntConfig);
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.registerTask('default', ["watch"]);
};
