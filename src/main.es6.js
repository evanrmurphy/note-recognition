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
  , pitchClasses1 = new Rx.BehaviorSubject
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
                           ,Staff({pitchClass: pitchClasses1.value})
                           )
                      , AnswerEntry({onAnswer: answers.onNext.bind(answers)})
                      )
          }
      }
    )


answers.subscribe(function(answer) {
  if (answer === pitchClasses1.value)
    pitchClasses1.onNext(sample(pitchClasses))
})

pitchClasses1.subscribe(() => ReactRenderComponent(App(), document.body))

pitchClasses1.onNext(sample(pitchClasses))
