'use strict'

var ReactCreateClass = require('react/lib/ReactCompositeComponent').createClass
  , ReactDOM = require('react/lib/ReactDOM')

var pitchClasses = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

module.exports =
  ReactCreateClass
    ( { getDefaultProps: function() {
          return {}
        }

      , render:
          function() {
            var {div, button} = ReactDOM

            return div( {}
                      , pitchClasses.map(pc => button({}, pc))
                      )
          }
      }
    )
