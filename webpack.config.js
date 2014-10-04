'use strict'

var path = require('path')
var reworkLoader = require('rework-loader');
var reworkVars = require('rework-vars');
var reworkCalc = require('rework-calc');
var reworkCustomMedia = require('rework-custom-media');
var varMap = reworkLoader.makeVarMap('src/index.css');

module.exports =
  { entry: path.join(__dirname, 'src/main.es6.js')

  , resolve:
      { packageMains:
          ['webpack', 'browser', 'web', 'browserify', ['jam', 'main']
          ,'style' ,'main']
      }

  , output:
      { path: path.join(__dirname, 'dist')
      , filename: 'main.[hash].js'
      }

  , devServer:
      { contentBase: path.join(__dirname, 'src') }

  , module:
      { loaders:
          [ {test: /\.es6\.js$/, loader: 'webpack-traceur'}
          , {test: /\.css$/, loader: 'style-loader!rework-loader'}
          , {test: /\.woff(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&minetype=application/font-woff'}
          , {test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader'}
          ]
      }

  , rework:
      { use:
        [ reworkLoader.plugins.imports,
        , reworkLoader.plugins.urls,
        , reworkLoader.plugins.stripLocalDefs(varMap),
        , reworkCustomMedia({map: varMap}),
        , reworkVars({map: varMap}),
        , reworkCalc
        ]
      }
  }
