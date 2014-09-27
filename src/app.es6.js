'use strict'

var ReactCreateClass = require('react/lib/ReactCompositeComponent').createClass
  , ReactDOM = require('react/lib/ReactDOM')

var Staff = require('./staff.es6.js')
  , AnswerEntry = require('./answer-entry.es6.js')

module.exports =
  ReactCreateClass
    ( { render:
          function() {
            var {note, onAnswer
                ,lastAnswer, isLastAnswerCorrect} = this.props
              , {div} = ReactDOM

            return div( {}
                      , Staff({note})
                      , AnswerEntry({onAnswer, lastAnswer, isLastAnswerCorrect})
                      )
          }
      }
    )
