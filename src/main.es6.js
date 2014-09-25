'use strict'

require('react')

var ReactCreateClass = require('react/lib/ReactCompositeComponent').createClass
  , ReactRenderComponent = require('react/lib/ReactMount').renderComponent
  , ReactDOM = require('react/lib/ReactDOM')
  , Rx = require('rx')
  , sample = require('lodash.sample')

var Staff = require('./staff.es6.js')
  , AnswerEntry = require('./answer-entry.es6.js')

var pitchClasses = new Rx.BehaviorSubject
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
                           ,Staff({pitchClass: pitchClasses.value})
                           )
                      , AnswerEntry({onAnswer: answers.onNext.bind(answers)})
                      )
          }
      }
    )


answers.subscribe(function(answer) {
  if (answer === pitchClasses.value)
    pitchClasses.onNext(sample(Staff.pitchClasses))
})

pitchClasses.subscribe(() => ReactRenderComponent(App(), document.body))

pitchClasses.onNext(sample(Staff.pitchClasses))
