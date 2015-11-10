'use strict'

var React = require('react')

require('suitcss-components-grid')
require('../index.css')
require('./index.css')

var Staff = require('../staff/index.es6.js')
  , GuessEntry = require('../guess-entry/index.es6.js')

module.exports =
  React.createClass
    ( { getInitialState: function() {
          return {showTip: true}
        }

      , onClickTipHide: function() {
          this.setState({showTip: false})
        }

      , render:
          function() {
            var {note, guess, guessedAt, onGuess,isGuessCorrect} = this.props
              , {div, a} = React.DOM
              , appTipText = 'Tip: Press the clef to toggle between treble and bass clef. '

            return div( {className: 'App Grid-cell--center'}
                      , div({className: `App-tip ${this.state.showTip ? '' : 'hidden'}`}
                           ,appTipText
                           ,a({href: '#', className: 'App-tip-hide', onClick: this.onClickTipHide}, 'Hide'))
                      , Staff({note})
                      , GuessEntry({guess, guessedAt, onGuess, isGuessCorrect})
                      )
          }
      }
    )
