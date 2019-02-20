const gulp = require('gulp')
const sass = require('gulp-sass')
const minify = require('gulp-minify')
const handler = require('serve-handler')
const http = require('http')

gulp.task('sass', function() {
    return gulp.src('src/scss/main.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('assets/styles/'))
})

gulp.task("watch", function() {
    gulp.watch(['src/scss/**/*.scss', 'src/scss/*.scss'], gulp.series('sass'))

    const server = http.createServer((request, response) => {
        return handler(request, response)
      })
       
      server.listen(5000, () => {
        console.log('Running at http://localhost:5000')
      })
})

// gulp.task('compress', function() {
//     return gulp.src('assets/scripts/*.js')
//     .pipe(minify().on('error', sass.logError))
//     .pipe(gulp.dest('assets/'))
// })