'use strict'

var path = require('path')
var merge = require('lodash.merge')
var webpackConfig = require('./webpack.config.js');

module.exports = merge({}, webpackConfig,
  { resolve:
      { alias:
          { rx: path.join(__dirname, 'node_modules/rx/dist/rx.all.js')
          , react: path.join(__dirname, 'node_modules/react/dist/react.js')
          }
      }

  , output: { filename: 'main.js' }
  })
