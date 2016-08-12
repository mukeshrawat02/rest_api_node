var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');


gulp.task('lint', function () {
    return gulp.src(['./*.js', './*/*.js', './*/*/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('default', function () {
        nodemon({
            // the script to run the app
            script: 'server.js',
            ext: 'js',
            watch: ["server.js", "models/", "controllers/", 'routes/', 'data/', 'config/'],
            env: {
                PORT: 8000
            },
            tasks: ['lint'],
            ignore: ['./node_modules/**']
        }).on('restart', function () {
            console.log('Node Server restarted!');
        });
});