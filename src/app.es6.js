'use strict'

var ReactCreateClass = require('react/lib/ReactCompositeComponent').createClass
  , ReactDOM = require('react/lib/ReactDOM')

var Staff = require('./staff.es6.js')
  , GuessEntry = require('./guess-entry.es6.js')

module.exports =
  ReactCreateClass
    ( { render:
          function() {
            var {note, onGuess
                ,lastGuess, isLastGuessCorrect} = this.props
              , {div} = ReactDOM

            return div( {}
                      , Staff({note})
                      , GuessEntry({onGuess, lastGuess, isLastGuessCorrect})
                      )
          }
      }
    )
