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
                 , lastGuess: null
                 , isLastGuessCorrect: null
                 }
        }

      , handleClick: function(event) {
          this.props.onGuess(event.target.textContent)
        }

      , render:
          function() {
            var {lastGuess, isLastGuessCorrect} = this.props
              , {div, button} = ReactDOM

            return div( {}
                      , sortedNotes.map(note => {
                          var className = 'GuessEntry-button'
                          if (lastGuess === note && isLastGuessCorrect != null)
                            className += isLastGuessCorrect
                                           ? ' GuessEntry-button--correct'
                                           : ' GuessEntry-button--incorrect'
                          return button({className, onClick: this.handleClick}, note)
                        })
                      )
          }
      }
    )
