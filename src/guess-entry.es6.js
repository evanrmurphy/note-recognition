'use strict'

var ReactCreateClass = require('react/lib/ReactCompositeComponent').createClass
  , ReactDOM = require('react/lib/ReactDOM')

require('./guess-entry.css')

var Staff = require('./staff.es6.js')

var sortedNotes = Staff.notes.slice(0).sort()

module.exports =
  ReactCreateClass
    ( { getDefaultProps: function() {
          return { onGuess: _ => null
                 , guess: null
                 , isGuessCorrect: null
                 }
        }

      , onClick: function(event) {
          this.props.onGuess(event.target.textContent)
        }

      , render:
          function() {
            var {guess, isGuessCorrect} = this.props
              , {onClick} = this
              , {div, button} = ReactDOM

            return div( {}
                      , sortedNotes.map(note => {
                          var className = 'GuessEntry-button'
                          if (guess === note && isGuessCorrect != null)
                            className += isGuessCorrect
                                           ? ' GuessEntry-button--correct'
                                           : ' GuessEntry-button--incorrect'
                          return button({className, onClick}, note)
                        })
                      )
          }
      }
    )
