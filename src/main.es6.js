'use strict'

require('react')

var ReactCreateClass = require('react/lib/ReactCompositeComponent').createClass
  , ReactRenderComponent = require('react/lib/ReactMount').renderComponent
  , ReactDOM = require('react/lib/ReactDOM')

var Staff = require('./staff.es6.js')
  , AnswerEntry = require('./answer-entry.es6.js')
  , currentAnswer = require('./current-answer.es6.js')

var App =
  ReactCreateClass
    ( { render:
          function() {
            var {svg, rect} = ReactDOM
            return svg( {version: '1.1'
                        ,baseProfile: 'full'
                        ,width: '100%'
                        ,xmlns: 'http://www.w3.org/2000/svg'
                        }
                      , Staff()
                      , AnswerEntry()
                      )
          }
      }
    )

ReactRenderComponent(App(), document.body)

currentAnswer().subscribe(x => console.log(x))
