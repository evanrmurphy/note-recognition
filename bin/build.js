#!/usr/bin/env node

var shellJs = require('shelljs')
  , path = require('path')
  , webpackConfig = require('../webpack.config.js')

var rm = shellJs.rm
  , exec = shellJs.exec
  , cp = shellJs.cp
  , ls = shellJs.ls
  , sed = shellJs.sed

var buildPath = webpackConfig.output.path
  , buildFilename = webpackConfig.output.filename

var buildFilenameEscaped = buildFilename.replace(/\./g, '\\.')
  , buildFilenameRegex =
      new RegExp(buildFilenameEscaped.replace('\\\.[hash]', ''))
  , builtFilenameRegex =
      new RegExp(buildFilenameEscaped.replace('[hash]', '.*'))

function isBuiltFilename(filename) { return builtFilenameRegex.test(filename) }

function webpack() {
  return exec(path.join(__dirname, '../node_modules/.bin/webpack --bail'))
}

function build() {
  rm('-rf', buildPath)

  if (webpack().code !== 0)
    throw new Error('webpack build failed')

  var builtFilename = ls(buildPath).filter(isBuiltFilename)[0]

  cp('index.html', buildPath)
  sed('-i', buildFilenameRegex, builtFilename, buildPath + '/index.html')
}

build()
