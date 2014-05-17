module.exports = function(grunt) {
    'use strict';
 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
 
        // ファイル圧縮の設定
        copy: {
            src2sandbox: {
                files: [{
                    "expand": true,
                    "cwd" : "src/",
                    "src" : "**", 
                    "dest" : "../room-sandbox/gh-pages/sample/javascripts/"
                }]
            },
            dist2sandbox: {
                files: [{
                    "expand": true,
                    "cwd" : "dist/",
                    "src" : "**", 
                    "dest" : "../room-sandbox/gh-pages/sample/javascripts/"
                }]
            }
        },

        uglify: {
            build: {
                files: [{
                    "dist/room.connection.min.js": "src/room.connection.js" 
                }]
            }
        },

        watch: {
            files: [
                'src/*.js'
            ],
            tasks: ['copy', 'uglify']
        }
    });
 
    // プラグインのロード
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
 
    // デフォルトタスクの設定
    grunt.registerTask('default', [ 'uglify', 'copy']);
 
};