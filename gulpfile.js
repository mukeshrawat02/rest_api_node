var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    jshint = require('gulp-jshint'),
    gulpMocha = require('gulp-mocha'),
    gutil = require('gulp-util');

gulp.task('set-dev-node-env', function () {
    return process.env.NODE_ENV = 'development';
});

gulp.task('set-prod-node-env', function () {
    return process.env.NODE_ENV = 'production';
});

gulp.task('set-test-node-env', function () {
    return process.env.NODE_ENV = 'test';
});

gulp.task('lint', function () {
    return gulp.src(['./*.js', './*/*.js', './*/*/*.js'])
               .pipe(jshint())
               .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('dev', ['set-dev-node-env'], function () {
        nodemon({
            // the script to run the app
            script: 'server.js',
            ext: 'js',
            watch: ["server.js", "models/", "controllers/", 'routes/', 'data/', 'config/'],
            env: {
                PORT: 9000
            },
            tasks: ['lint'],
            ignore: ['./node_modules/**']
        }).on('restart', function () {
            console.log('Node Dev Server restarted!');
        });
});

gulp.task('test', ['set-test-node-env' ,'mocha'], function () {
    gulp.watch(['tests/**'], ['mocha']);
});

gulp.task('mocha', function () {
    return gulp.src('tests/*.js', { read: false })
               .pipe(gulpMocha({ reporter: 'list' }))
               .on('error', gutil.log); 
});

gulp.task('prod', ['set-prod-node-env'], function () {
     nodemon({
         script: 'server.js',
         ext: 'js',
         env: {
               PORT: 8000
         },
         watch: ["server.js"],
         ignore: ['./node_modules/**']
    })
    .on('restart', function () {
            console.log('Node Prod Server restarted!');
     });
});
