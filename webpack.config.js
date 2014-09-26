'use strict'

var path = require('path')

module.exports =
  { entry: path.join(__dirname, 'src/main.es6.js')

  , output:
      { path: path.join(__dirname, 'dist')
      , filename: 'main.[hash].js'
      }

  , devServer:
      { contentBase: path.join(__dirname, 'src') }

  , module:
      { loaders:
          [ {test: /\.es6\.js$/, loader: 'webpack-traceur'}
          , {test: /\.css$/, loader: 'style!css'}
          ]
      }
  }
