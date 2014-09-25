'use strict'

require('react')

var ReactCreateClass = require('react/lib/ReactCompositeComponent').createClass
  , ReactRenderComponent = require('react/lib/ReactMount').renderComponent
  , ReactDOM = require('react/lib/ReactDOM')
  , Rx = require('rx')
  , sample = require('lodash.sample')

var Staff = require('./staff.es6.js')
  , AnswerEntry = require('./answer-entry.es6.js')

var pitchClasses = ['A', 'B', 'C', 'D', 'E', 'F', 'G']
  , answers = new Rx.Subject

var App =
  ReactCreateClass
    ( { render:
          function() {
            var {div, svg} = ReactDOM
            return div( {}
                      , svg({version: '1.1'
                            ,baseProfile: 'full'
                            ,width: '100%'
                            ,xmlns: 'http://www.w3.org/2000/svg'
                            }
                           ,Staff({pitchClass: sample(pitchClasses)})
                           )
                      , AnswerEntry({onAnswer: answers.onNext.bind(answers)})
                      )
          }
      }
    )

ReactRenderComponent(App(), document.body)

answers.subscribe(x => alert(`You answered: ${x}`))
