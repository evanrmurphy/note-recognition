'use strict'

var ReactCreateClass = require('react/lib/ReactCompositeComponent').createClass
  , ReactDOM = require('react/lib/ReactDOM')

require('./answer-entry.css')

var Staff = require('./staff.es6.js')

var pitchClassesSorted = Staff.pitchClasses.slice(0).sort()

module.exports =
  ReactCreateClass
    ( { getDefaultProps: function() {
          return {onAnswer: _ => null}
        }

      , handleClick: function(event) {
          this.props.onAnswer(event.target.textContent)
        }

      , render:
          function() {
            var {div, button} = ReactDOM

            return div( {}
                      , pitchClassesSorted.map
                          (pc => button({className: 'AnswerEntry-button'
                                        ,onClick: this.handleClick
                                        }
                                        , pc))
                      )
          }
      }
    )
