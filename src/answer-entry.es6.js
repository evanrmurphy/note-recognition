'use strict'

var ReactCreateClass = require('react/lib/ReactCompositeComponent').createClass
  , ReactDOM = require('react/lib/ReactDOM')

require('./answer-entry.css')

var Staff = require('./staff.es6.js')

var pitchClassesSorted = Staff.pitchClasses.slice(0).sort()

module.exports =
  ReactCreateClass
    ( { getDefaultProps: function() {
          return { onAnswer: _ => null
                 , markCorrect: null
                 }
        }

      , handleClick: function(event) {
          this.props.onAnswer(event.target.textContent)
        }

      , render:
          function() {
            var {div, button} = ReactDOM
            return div( {}
                      , pitchClassesSorted.map(pc => {
                          var className = 'AnswerEntry-button'
                          if (this.props.markCorrect === pc)
                            className += ' AnswerEntry-button--correct'
                          return button({className, onClick: this.handleClick}, pc)
                        })
                      )
          }
      }
    )
