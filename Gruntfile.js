module.exports = function(grunt) {
    'use strict';
 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
 
        concat: {
            dist : {
                src : [
                    "src/room.connection.js",
                    "src/room.cache.js",
                    "src/room.templateManager.js",
                    "src/room.logger.js"
                ],
                dest: "dist/roomframework.js"
            }
        },

        uglify: {
            build: {
                files: [{
                    "dist/room.connection.min.js": "src/room.connection.js",
                    "dist/room.cache.min.js": "src/room.cache.js",
                    "dist/room.templateManager.min.js": "src/room.templateManager.js",
                    "dist/room.logger.min.js": "src/room.logger.js",
                    "dist/roomframework.min.js": "dist/roomframework.js"
                }]
            }
        },

        jshint : {
            all : ['src/*.js']
        },
        
        watch: {
            main: {
                files: [
                    'src/*.js'
                ],
                tasks: ['jshint', 'concat', 'uglify']
            },
            site: {
                files: [
                    '*.html',
                    'assets/**/*',
                    '*.md'
                ],
                tasks: [],
                options: {
                    livereload: true
                }
            },
        },

        connect: {
            server: {
                options: {
                    port: 9000,
                    livereload: true
                }
            }
        }
    });
 
    // プラグインのロード
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
 
    // デフォルトタスクの設定
    grunt.registerTask('default', [ 'jshint', 'concat', 'uglify']);
    grunt.registerTask('site', [ 'connect', 'watch:site']);
 
};