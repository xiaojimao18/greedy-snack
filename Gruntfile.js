module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= pkg.version%> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: ['js/config.js', 'js/game.js', 'js/snack.js', 'js/food.js'],
                dest: 'js/build/app.min.js'
            }
        },
        watch: {
            files: ['<%= uglify.build.src %>'],
            tasks: ['uglify']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['uglify']);
};
