// 引入 gulp 工具
var gulp = require('gulp');

// 引入 gulp-webserver 模块
var webserver = require('gulp-webserver');

// 引入 css 预处理 压缩 模块
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');

// 引入 js 模块化工具 gulp-webpack, 获得 js 文件名模块 vinyl-named, js 压缩模块
var named = require('vinyl-named');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');//CSS3自动补全
var rename = require('gulp-rename');
var watch = require('gulp-watch');
var batch = require('gulp-batch');
// 引入 fs url 模块
var fs = require('fs');
var url = require('url');

// 引入 rev revCollector 模块
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');

// 引入 gulp-sequence 模块
var sequence = require('gulp-sequence');
// css 预处理 和 压缩
//CSS入口文件数组 每新增一个模块必须添加一个入口
var cssFiles = [
  './src/styles/**/*'
];
gulp.task('scss', function () {
  gulp.src(cssFiles)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 4 versions', 'Android >= 4.0', 'iOS >=7']
    }))
    .pipe(minifyCSS())
    .pipe(rename(function (path) {
      path.extname = ".min.css";
    }))
    .pipe(gulp.dest('./build/styles/'));
});

var path = require("path");
var srcDir = './src';
gulp.task('webpackjs', function () {
  webpack(require('./webpack.config.js'))
    // .pipe(uglify({
    //   //mangle: true,//类型：Boolean 默认：true 是否修改变量名
    //   mangle: { except: ['require', 'exports', 'module'] },//排除混淆关键字
    //   mangle: true,//类型：Boolean 默认：true 是否修改变量名
    //   compress: false,//类型：Boolean 默认：true 是否完全压缩
    //   preserveComments: 'all' //保留所有注释
    // }))
    .pipe(gulp.dest('./build/js'));
});

// 引入 gulp-webserver 模块
var webserver = require('gulp-webserver');
gulp.task('webserver', function () {
  gulp.src('./')
    .pipe(webserver({
      host: 'localhost',
      port: 8080,
      directoryListing: {
        enable: true,
        path: './'
      },
      livereload: true,
      // mock 数据
      middleware: function (req, res, next) {
        var urlObj = url.parse(req.url, true);
        switch (urlObj.pathname) {
          case '/api/orders.php':
            // res.setHeader('Content-Type', 'application/json');
            // fs.readFile('./mock/list.json', function (err, data) {
            //   res.end(data);
            // });
            return;
          case '/api/user':
          // ...

          case '/api/cart':
            // ...
            return;
        }
        next();
      }
    }))
});

gulp.task('copy-libs', function () {
  gulp.src('./src/libs/**/*')
    .pipe(gulp.dest('./build/libs'));
})


gulp.task('copy-images', function () {
  gulp.src('./src/images/**/*')
    .pipe(gulp.dest('./build/images/'));
});


gulp.task('build', function () {
  gulp.start('webserver')
  watch('./src/styles/*.scss', batch(function (events, done) {
    gulp.start('scss', done);
  }));
  watch('./src/images/**/*', batch(function (events, done) {
    gulp.start('copy-images', done);
  }));
  watch('./src/scripts/*.js', batch(function (events, done) {
    gulp.start('webpackjs', done);
  }));
  watch('./src/libs/**/*', batch(function (events, done) {
    gulp.start('copy-libs', done);
  }));
  watch('./src/module/*.js', batch(function (events, done) {
    gulp.start('webpackjs', done);
  }));
});