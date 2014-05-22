module.exports = function(grunt) {
    'use strict';
 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
 
        copy: {
            src2sandbox: {
                files: [{
                    expand: true,
                    cwd : "src/",
                    src : "**", 
                    dest : "../room-sandbox/gh-pages/sample/javascripts/"
                }]
            },
            dist2sandbox: {
                files: [{
                    expand: true,
                    cwd : "dist/",
                    src : "**", 
                    dest : "../room-sandbox/gh-pages/sample/javascripts/"
                }]
            }
        },

        concat: {
            dist : {
                src : [
                    "src/room.connection.js",
                    "src/room.cache.js"
                ],
                dest: "dist/roomframework.js"
            }
        },

        uglify: {
            build: {
                files: [{
                    "dist/room.connection.min.js": "src/room.connection.js",
                    "dist/room.cache.min.js": "src/room.cache.js",
                    "dist/roomframework.min.js": "dist/roomframework.js"
                }]
            }
        },

        jshint : {
            all : ['src/*.js']
        },
        
        watch: {
            files: [
                'src/*.js'
            ],
            tasks: ['jshint', 'concat', 'uglify', 'copy']
        }
    });
 
    // プラグインのロード
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
 
    // デフォルトタスクの設定
    grunt.registerTask('default', [ 'concat', 'uglify', 'copy']);
 
};