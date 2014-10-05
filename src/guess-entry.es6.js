'use strict'

var React = require('react')

require('suitcss-components-grid')
require('suitcss-components-button')
require('suitcss-utils-size')
require('./index.css')
require('./guess-entry.css')

var Staff = require('./staff.es6.js')

var sortedNotes = Staff.notes.slice(0).sort()

module.exports =
  React.createClass
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
              , {div, button, span} = React.DOM

            return div( {className: 'Grid--withGutter Grid--withVerticalGutter'}
                      , sortedNotes.map(note => {
                          var className = 'Button Button--default'
                                          + ' GuessEntry-button u-sizeFillAlt'
                            , text = note

                          if (guess === note && isGuessCorrect != null) {
                            if (isGuessCorrect) {
                              className += ' GuessEntry-button--correct'
                              text = span({className: 'fa fa-check'})
                            } else {
                              className += ' GuessEntry-button--incorrect'
                              text = span({className: 'fa fa-times'})
                            }
                          }

                          return div({className: 'Grid-cell u-size1of4'},
                                   button({className, onClick}, text))
                        })
                      )
          }
      }
    )
