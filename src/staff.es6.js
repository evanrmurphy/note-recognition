'use strict'

var ReactCreateClass = require('react/lib/ReactCompositeComponent').createClass
  , ReactDOM = require('react/lib/ReactDOM')
  , range = require('lodash.range')

var TrebleClef = require('./treble-clef.es6.js')
  , WholeNote = require('./whole-note.es6.js')

var pitchClasses = ['E', 'F', 'G', 'A', 'B', 'C', 'D']

module.exports =
  ReactCreateClass
    ( { getDefaultProps: function() {
          return {pitchClass: pitchClasses[0]}
        }

      , render:
          function() {
            var {svg, rect} = ReactDOM
              , topSpacing = 10
              , staffPosition = pitchClasses.indexOf(this.props.pitchClass)

            return svg( {}
                      , range(0 + topSpacing, 50 + topSpacing, 10).map
                          (y => rect({y, width: '100%', height: 1
                                     ,fill: 'black'}))
                      , TrebleClef({scale: .15})
                      , WholeNote({staffPosition})
                      )
          }
      }
    )
