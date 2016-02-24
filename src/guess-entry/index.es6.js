'use strict'

var React = require('react')

require('suitcss-components-grid')
require('suitcss-components-button')
require('suitcss-utils-size')
require('../index.css')
require('./index.css')

var Staff = require('../staff/index.es6.js')
  , constants = require('../constants.es6.js')

var sortedNotes = Staff.notes().slice(0).sort()

module.exports =
  React.createClass
    ( { getDefaultProps: function() {
          return { onGuess: _ => null
                 , guess: null
                 , guessedAt: new Date
                 , isGuessCorrect: null
                 }
        }

      , getInitialState: function() {
          return {useSolfege: /[?&]solfege/.test(window.location.search)}
        }

      , onClick: function(event) {
          this.props.onGuess(this.state.useSolfege
                               ? constants.letterNamesBySolfege[event.target.textContent]
                               : event.target.textContent)
        }

      , render:
          function() {
            var {guess, guessedAt, isGuessCorrect} = this.props
              , {onClick} = this
              , {div, button, span} = React.DOM
              , isWaitOnIncorrectGuessActive =
                  (new Date) - guessedAt < constants.waitOnIncorrectGuess


            return div( {className: 'GuessEntry Grid--withGutter'
                                    + ' Grid--md-withVerticalGutter'
                                    + ' Grid--alignCenter'}
                      , sortedNotes.map(note => {
                          var className = 'Button Button--default Button--sm-border-collapse'
                                          + ' GuessEntry-button u-sizeFillAlt'
                            , text = (this.state.useSolfege ? constants.solfegeByLetterNames[note] : note)

                          if (guess === note && isGuessCorrect != null) {
                            if (isGuessCorrect) {
                              className += ' GuessEntry-button--correct'
                              text = span({className: 'fa fa-check'})
                            } else if (isWaitOnIncorrectGuessActive) {
                              className += ' GuessEntry-button--incorrect'
                              text = span({className: 'fa fa-times'})
                            }
                          }

                          return div({className: 'Grid-cell u-sm-size1of1 u-md-size1of4'},
                                   button({className, onClick}, text))
                        })
                      )
          }
      }
    )
