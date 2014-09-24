'use strict'

var ReactCreateClass = require('react/lib/ReactCompositeComponent').createClass
  , ReactDOM = require('react/lib/ReactDOM')

var pitchClasses = ['A', 'B', 'C', 'D', 'E', 'F', 'G']

module.exports =
  ReactCreateClass
    ( { getDefaultProps: function() {
          return {}
        }

      , handleClick: function(event) {
          this.setState({currentAnswer: event.target.textContent})
      }

      , render:
          function() {
            var {div, button} = ReactDOM

            return div( {}
                      , pitchClasses.map(pc => button({onClick: this.handleClick}, pc))
                      )
          }
      }
    )
