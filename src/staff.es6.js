'use strict'

var ReactCreateClass = require('react/lib/ReactCompositeComponent').createClass
  , ReactDOM = require('react/lib/ReactDOM')
  , range = require('lodash.range')

module.exports =
  ReactCreateClass
    ( { render:
          function() {
            var {svg, rect} = ReactDOM
            return svg( {}
                      , range(0, 50, 10).map
                          ((y) => rect({y: y, width: '100%', height: 1
                                       ,fill: 'black'}))
                      )
          }
      }
    )
