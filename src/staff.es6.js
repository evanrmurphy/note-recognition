'use strict'

var ReactCreateClass = require('react/lib/ReactCompositeComponent').createClass
  , ReactDOM = require('react/lib/ReactDOM')

module.exports =
  ReactCreateClass
    ( { render:
          function() {
            var {svg, rect} = ReactDOM
            return svg( {}
                      , rect({width: '100%', height: 1, fill: 'black'})
                      , rect({y: 10, width: '100%', height: 1, fill: 'black'})
                      , rect({y: 20, width: '100%', height: 1, fill: 'black'})
                      , rect({y: 30, width: '100%', height: 1, fill: 'black'})
                      , rect({y: 40, width: '100%', height: 1, fill: 'black'})
                      )
          }
      }
    )
