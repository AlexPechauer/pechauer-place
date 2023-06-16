'use strict'
const gulp = require('gulp')
const path = require('path')
const fs = require('fs')
const del = require('del')
const ts = require('gulp-typescript')
const nodemon = require('gulp-nodemon')
const { exec } = require("child_process");

function dbMigrate(cb) {
  process.chdir('db')
  exec("db-migrate up")
  cb();
}

const rooted = (childPath) => {
  return path.join(process.env.PWD, childPath)
}

const cleanDist = () => {
  return del([rooted('dist/*')])
}

const buildDest = rooted('dist')

let buildTsDeclarations = false
const tsConfigPath = rooted('tsconfig.json')
const tsProject = fs.existsSync(tsConfigPath)
  ? ts.createProject(tsConfigPath)
  : ts.createProject({ ...DEFAULT_TS_CONFIG, declaration: buildTsDeclarations })

const buildTs = () => {
  console.log('building ts')
  return gulp.src([rooted('src/**/*{.ts,.tsx}')])
    .pipe(tsProject().on("error", (err) => { console.log(err) }))
    .pipe(gulp.dest(buildDest))
}

const copyJs = () => {
  return gulp.src(rooted('src/**/*.js'))
    .pipe(gulp.dest(buildDest))
}

const buildSrc = gulp.series(buildTs, copyJs)

const buildConfig = () => {
  return gulp.src(rooted('src/**/*.yaml'))
    .pipe(gulp.dest(buildDest))
}

const build = gulp.series(buildSrc, buildConfig)

const distPackage = () => {
  return gulp.src(rooted('package.json'))
    .pipe(gulp.dest(rooted('dist')))
}

const watchServer = () => {
  return gulp.watch([
    rooted('src/**/*')
  ], build)
}

const serveLib = (done) => {
  return nodemon({
    // cwd: rooted('dist'),
    // script: 'lib',
    delay: 3000,
    ext: 'js',
    watch: [rooted('dist')],
    done
  })
}

const distAll = gulp.series(build, distPackage)
const tasks = {
  clean: {
    dist: cleanDist,
    all: gulp.series([cleanDist])
  },
  build: {
    src: buildSrc,
    config: buildConfig,
    all: build
  },
  dist: {
    package: distPackage,
    all: distAll
  },
  watch: {
    server: watchServer,
    serve: serveLib,
    all: gulp.series([distAll, gulp.parallel(watchServer, serveLib)])
  }
}

exports.dbMigrate = dbMigrate;
exports.clean = tasks.clean.all,
  exports.dbMigrate = dbMigrate;
exports.build = tasks.build.all,
  exports.dist = tasks.dist.all,
  exports.watch = tasks.watch.all,
  exports.default = tasks.dist.all






