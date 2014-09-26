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
  , answers = new Rx.BehaviorSubject
  , last2PitchClasses =
      pitchClasses.scan([null, null], ([_, last], current) => [last, current])
  , lastPitchClass

var App =
  ReactCreateClass
    ( { render:
          function() {
            var {div, svg} = ReactDOM
            return div( {}
                      , Staff({pitchClass: pitchClasses.value})
                      , AnswerEntry({onAnswer: answers.onNext.bind(answers)
                                    ,markCorrect: answers.value === lastPitchClass ? answers.value : null})
                      )
          }
      }
    )


answers.subscribe(function(answer) {
  if (answer === pitchClasses.value)
    pitchClasses.onNext(sample(Staff.pitchClasses))
})

pitchClasses.subscribe(() => ReactRenderComponent(App(), document.body))
answers.subscribe(() => ReactRenderComponent(App(), document.body))
last2PitchClasses.subscribe(([last, _]) => lastPitchClass = last)

pitchClasses.onNext(sample(Staff.pitchClasses))
