'use strict'

var React = require('react')

require('suitcss-components-grid')
require('../index.css')
require('./index.css')

var Staff = require('../staff.es6.js')
  , GuessEntry = require('../guess-entry/index.es6.js')

module.exports =
  React.createClass
    ( { render:
          function() {
            var {note, guess, onGuess, isGuessCorrect} = this.props
              , {div} = React.DOM

            return div( {className: 'App Grid-cell--center'}
                      , Staff({note})
                      , GuessEntry({guess, onGuess, isGuessCorrect})
                      )
          }
      }
    )
