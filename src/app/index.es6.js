'use strict'

var React = require('react')

require('suitcss-components-grid')
require('../index.css')
require('./index.css')

var Staff = require('../staff/index.es6.js')
  , GuessEntry = require('../guess-entry/index.es6.js')
  , HideableText = require('../hideable-text/index.es6.js')

module.exports =
  React.createClass
    ( { render:
          function() {
            var {note, guess, guessedAt, onGuess,isGuessCorrect} = this.props
              , {div, a} = React.DOM
              , clefTipText = 'Tip: Press on the clef to switch between treble and bass clef.'

            return div( {className: 'App Grid-cell--center'}
                      , HideableText({text: clefTipText})
                      , Staff({note})
                      , GuessEntry({guess, guessedAt, onGuess, isGuessCorrect})
                      )
          }
      }
    )
