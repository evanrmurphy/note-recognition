var path = require('path')

module.exports =
  { entry: path.join(__dirname, 'src/main.js')

  , output:
      { path: path.join(__dirname, 'dist')
      , filename: 'main.[hash].js'
      }
  }
