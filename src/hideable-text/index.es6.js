'use strict'

var React = require('react')

require('./index.css')

module.exports =
  React.createClass
    ( { getInitialState: function() {
          return {isHidden: false}
        }

      , onClickHide: function() {
          this.setState({isHidden: true})
        }

      , render:
          function() {
            var text = this.props.text + ' '
              , {div, a} = React.DOM
              , className = `HideableText ${this.state.isHidden ? 'HideableText--hidden' : ''}`

            return div({className}
                      ,text
                      ,a({href: '#', onClick: this.onClickHide}, 'Hide')
                      )
          }
      }
    )
