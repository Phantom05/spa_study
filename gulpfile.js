const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const autoprefixer = require('gulp-autoprefixer');
const del = require('del');

const assets = {
  src:`./public/src/assets`,
  dist:`./public/dist/assets`,
  clean:'./public/dist/*'
}
const paths={
  style:{
    src:`${assets.src}/scss/**/*.{scss,css}`,
    dist:`${assets.dist}/css`,
  },
  js:{
    src:`${assets.src}/js/**/*.js`,
    dist:`${assets.dist}/js`,
  },
}
const setting={
  style:{
    sass:{
      outputStyle: "compressed",
      indentType: "tab",
      indentWidth: 1,
      precision: 3,
      sourceComments: false,
      errLogToConsole: true,
    },
    autoprefixer:{
      browsers: ['last 3 versions'],
  }
  }
}
var info=()=>{
console.log(`
/* 
================================================+
Node version : ${process.version}
PPID         : ${process.ppid}
pid          : ${process.pid}
platform     : ${process.platform}
================================================+
*/
`);
}
info();

gulp.task('clean', () =>del([assets.clean]));

gulp.task('scripts', function () {
  return gulp.src(paths.js.src)
    .pipe(sourcemaps.init())
    .pipe(babel().on('error',handleError))
    .pipe(uglify())
    .pipe(sourcemaps.write('./', {sourceRoot: '../src'}))
    .pipe(gulp.dest(paths.js.dist));
});

gulp.task('styles', function () {
  return gulp.src(paths.style.src)
    .pipe(sourcemaps.init())
    .pipe(sass(setting.style.sass).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./', {sourceRoot: '../src'}))
    .pipe(gulp.dest(paths.style.dist));
});

gulp.task('watch', function () {
  gulp.watch(paths.style.src, ['styles']);
  gulp.watch(paths.js.src, ['scripts']);
});

// Error Handler
function handleError(err) {
  console.log(err);
  this.emit('end');
}

/**
 * ==================================+
 * @ gulp tasks process
 * ==================================+
 */ 
const default_process = ['scripts','styles','watch'];
gulp.task('default',default_process, function () {
  console.log(`Gulp is runing!`);
  info();
})

gulp.task('dev',['scripts','styles','watch'],function(){

})

gulp.task('prod',['scripts','styles'],()=>console.log('Tansfile complete!'))