'use strict'

var React = require('react')

module.exports =
  React.createClass
    ( { getDefaultProps:
          function () {
            return { staffPosition: 4
                   , scale: 1
                   }
          }

      , render:
          function() {
            var {svg, g, path} = React.DOM
              , scale = this.props.scale
              , width = 600 * scale
              , height = 299.13995 * scale
              , x = this.props.staffWidth/2 - (190 * scale)
              , y = (28 - (5 * this.props.staffPosition)) * scale

            return svg({x, y, width, height, viewBox: '0 0 2000 2000'}
                      ,g({transform: 'matrix(2.9945185,0,0,2.9945185,-405.68296,-117.96426)'}
                        ,path({d: 'm 225.36285,99.817998 c -5.49692,-1.69186 -9.83405,-6.28944 -9.83405,-10.4246 0,-11.704229 25.13958,-16.335904 35.52156,-6.544434 11.22686,10.588284 -7.09488,22.691526 -25.68751,16.969034 z m 16.76819,-2.9403 c 3.05854,-4.66792 0.13433,-13.916407 -5.16332,-16.330174 -7.77978,-3.544708 -12.54851,2.495846 -9.30827,11.790804 2.2412,6.42911 11.35935,9.289252 14.47159,4.53937 z'
                              ,fill: '#000000'})
                        )
                      )
          }
      }
    )
