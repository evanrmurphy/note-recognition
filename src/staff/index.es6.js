'use strict'

var React = require('react')
  , range = require('lodash.range')

var TrebleClef = require('../treble-clef.es6.js')
  , BassClef = require('../bass-clef.es6.js')
  , WholeNote = require('../whole-note.es6.js')

function notes(clef) {
  return (clef === 'treble' ? ['E', 'F', 'G', 'A', 'B', 'C', 'D'] : ['G', 'A', 'B', 'C', 'D', 'E', 'F'])
}

var Staff =
  React.createClass
    ( { getDefaultProps: function() {
          return {note: notes('treble')[0]}
        }

      , getInitialState: function() {
          return {width: document.documentElement.getBoundingClientRect().width
                 ,clef: 'treble'}
        }

      , updateWidthState: function() {
          this.setState({width: this.refs.Staff.getDOMNode().getBoundingClientRect().width})
        }

      , componentDidMount: function() {
          this.updateWidthState()
          window.addEventListener('resize', this.updateWidthState)
        }

      , componentWillUnmount: function() {
          window.removeEventListener('resize', this.updateWidthState)
        }

      , onClickClef: function() {
          this.setState({clef: (this.state.clef === 'treble' ? 'bass' : 'treble')})
        }

      , render:
          function() {
            var {svg, rect} = React.DOM
              , scale = 1.5
              , staffHeight = 50 * scale
              , lineDistance = staffHeight / 5
              , topSpacing = 10 * scale
              , staffPosition = notes(this.state.clef).indexOf(this.props.note)
              , staffLines =
                  range(0 + topSpacing, staffHeight + topSpacing
                       ,lineDistance).map(
                         y => rect({y, width: '100%', height: 1 * scale
                                   ,fill: 'black'})
                       )
              , clef = (this.state.clef === 'treble' ? TrebleClef({scale: .15 * scale, onClick: this.onClickClef})
                                                     : BassClef({scale, staffWidth: this.state.width, onClick: this.onClickClef}))

            return svg( {version: '1.1', baseProfile: 'full', width: '100%'
                        ,height: 68 * scale, xmlns: 'http://www.w3.org/2000/svg'
                        ,className: 'Staff', ref: 'Staff'
                        }

                      , staffLines
                      , clef
                      , WholeNote({scale, staffPosition, staffWidth: this.state.width})
                      )
          }
      }
    )

Staff.notes = notes

module.exports = Staff
