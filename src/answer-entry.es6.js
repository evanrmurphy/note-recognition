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
                 , lastAnswer: null
                 , isLastAnswerCorrect: null
                 }
        }

      , handleClick: function(event) {
          this.props.onAnswer(event.target.textContent)
        }

      , render:
          function() {
            var {lastAnswer, isLastAnswerCorrect} = this.props
              , {div, button} = ReactDOM

            return div( {}
                      , pitchClassesSorted.map(pc => {
                          var className = 'AnswerEntry-button'
                          if (lastAnswer === pc && isLastAnswerCorrect != null)
                            className += isLastAnswerCorrect
                                           ? ' AnswerEntry-button--correct'
                                           : ' AnswerEntry-button--incorrect'
                          return button({className, onClick: this.handleClick}, pc)
                        })
                      )
          }
      }
    )
