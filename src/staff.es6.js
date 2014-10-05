'use strict'

var React = require('react')
  , range = require('lodash.range')

var TrebleClef = require('./treble-clef.es6.js')
  , WholeNote = require('./whole-note.es6.js')

var notes = ['E', 'F', 'G', 'A', 'B', 'C', 'D']

var Staff =
  React.createClass
    ( { getDefaultProps: function() {
          return {note: notes[0]}
        }

      , render:
          function() {
            var {svg, rect} = React.DOM
              , topSpacing = 10
              , staffPosition = notes.indexOf(this.props.note)

            return svg( {version: '1.1', baseProfile: 'full', width: '100%'
                        ,height: '100', xmlns: 'http://www.w3.org/2000/svg'
                        }

                      , range(0 + topSpacing, 50 + topSpacing, 10).map
                          (y => rect({y, width: '100%', height: 1
                                     ,fill: 'black'}))
                      , TrebleClef({scale: .15})
                      , WholeNote({staffPosition})
                      )
          }
      }
    )

Staff.notes = notes

module.exports = Staff
