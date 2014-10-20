'use strict'

var React = require('react')
  , range = require('lodash.range')

var TrebleClef = require('../treble-clef.es6.js')
  , WholeNote = require('../whole-note.es6.js')

var notes = ['E', 'F', 'G', 'A', 'B', 'C', 'D']

var Staff =
  React.createClass
    ( { getDefaultProps: function() {
          return {note: notes[0]}
        }

      , getInitialState: function() {
          return {width: document.documentElement.clientWidth}
        }

      , updateWidthState: function() {
          this.setState({width: this.refs.Staff.getDOMNode().clientWidth})
        }

      , componentDidMount: function() {
          this.updateWidthState()
          window.addEventListener('resize', this.updateWidthState)
        }

      , componentWillUnmount: function() {
          window.removeEventListener('resize', this.updateWidthState)
        }

      , render:
          function() {
            var {svg, rect} = React.DOM
              , scale = 1.5
              , staffHeight = 50 * scale
              , lineDistance = staffHeight / 5
              , topSpacing = 10 * scale
              , staffPosition = notes.indexOf(this.props.note)

            return svg( {version: '1.1', baseProfile: 'full', width: '100%'
                        ,height: 68 * scale, xmlns: 'http://www.w3.org/2000/svg'
                        ,className: 'Staff', ref: 'Staff'
                        }

                      , range(0 + topSpacing, staffHeight + topSpacing
                             ,lineDistance).map(y =>
                          rect({y, width: '100%', height: 1 * scale, fill: 'black'}))

                      , TrebleClef({scale: .15 * scale})
                      , WholeNote({scale, staffPosition, staffWidth: this.state.width})
                      )
          }
      }
    )

Staff.notes = notes

module.exports = Staff
