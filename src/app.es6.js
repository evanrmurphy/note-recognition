'use strict'

var ReactCreateClass = require('react/lib/ReactCompositeComponent').createClass
  , ReactDOM = require('react/lib/ReactDOM')

require('./lib/font-awesome/css/font-awesome.css')
require('suitcss-components-grid')
require('./index.css')
require('./app.css')

var Staff = require('./staff.es6.js')
  , GuessEntry = require('./guess-entry.es6.js')

module.exports =
  ReactCreateClass
    ( { render:
          function() {
            var {note, guess, onGuess, isGuessCorrect} = this.props
              , {div, span} = ReactDOM

            return div( {className: 'App Grid-cell--center'}
                      , Staff({note})
                      , GuessEntry({guess, onGuess, isGuessCorrect})
                      , span({className: 'fa fa-check', style: {fontSize: '20px'}})
                      )
          }
      }
    )
