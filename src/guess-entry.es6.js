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
              , checkMark = '\u2714'
              , xMark = '\u2717'

            return div( {}
                      , sortedNotes.map(note => {
                          var className = 'GuessEntry-button'
                            , text = note

                          if (guess === note && isGuessCorrect != null) {
                            if (isGuessCorrect) {
                              className += ' GuessEntry-button--correct'
                              text = checkMark
                            } else {
                              className += ' GuessEntry-button--incorrect'
                              text = xMark
                            }
                          }

                          return button({className, onClick}, text)
                        })
                      )
          }
      }
    )
