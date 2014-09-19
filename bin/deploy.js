#!/usr/bin/env node

var shellJs = require('shelljs')
  , path = require('path')
  , webpackConfig = require('../webpack.config.js')

var exec = shellJs.exec
  , rm = shellJs.rm
  , cp = shellJs.cp
  , ls = shellJs.ls

var buildPath = webpackConfig.output.path
  , buildDir = path.basename(buildPath)
  , thisCommit = exec('git rev-parse --verify HEAD').output.replace('\n', '')
  , thisBranch = exec('git branch').output.split('\n')
                   .filter(function(branch) { return /^\*/.test(branch) })[0]
                   .replace('* ', '')
  , keepers = ['.git', '.gitignore', 'node_modules', buildDir, 'LICENSE']

function build() {
  exec(path.join(__dirname, 'build.js'))
}

function checkoutDeployBranch() {
  exec('git fetch origin gh-pages:gh-pages')
  exec('git checkout gh-pages --force')
}

function removeAllButKeepers() {
  function isntKeeper(_) { return keepers.indexOf(_) === -1 }
  rm('-rf', ls('-A').filter(isntKeeper))
}

function extractBuild() {
  cp(buildPath + '/*', './')
  rm('-rf', buildPath)
}

function deploy() {
  exec('git add .')
  exec('git commit --message "Deploy ' + thisCommit + '"')
  exec('git push origin gh-pages')
}

function checkoutPreviousBranch() {
  exec('git checkout ' + thisBranch)
}

build()
checkoutDeployBranch()
removeAllButKeepers()
extractBuild()
deploy()
checkoutPreviousBranch()
