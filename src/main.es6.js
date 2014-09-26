'use strict'

require('react')

var ReactCreateClass = require('react/lib/ReactCompositeComponent').createClass
  , ReactRenderComponent = require('react/lib/ReactMount').renderComponent
  , ReactDOM = require('react/lib/ReactDOM')
  , Rx = require('rx')
  , sample = require('lodash.sample')
  , without = require('lodash.without')

var Staff = require('./staff.es6.js')
  , AnswerEntry = require('./answer-entry.es6.js')

var pitchClasses = new Rx.BehaviorSubject
  , answers = new Rx.BehaviorSubject
  , last2PitchClasses =
      pitchClasses.scan([null, null], ([_, last], current) => [last, current])
  , lastPitchClass
  , otherPitchClasses

var App =
  ReactCreateClass
    ( { render:
          function() {
            var {onAnswer} = this.props
            var {div} = ReactDOM
            return div( {}
                      , Staff({pitchClass: pitchClasses.value})
                      , AnswerEntry
                          ( { onAnswer
                            , markCorrect: answers.value === lastPitchClass
                                             ? answers.value
                                             : null}
                          )
                      )
          }
      }
    )


answers.subscribe(function(answer) {
  if (answer === pitchClasses.value)
    pitchClasses.onNext(sample(otherPitchClasses))
})

pitchClasses.merge(answers).subscribe
  (() => ReactRenderComponent
           (App( { onAnswer: answers.onNext.bind(answers)
                 }
               )
           , document.body))
last2PitchClasses.subscribe(([last, _]) => lastPitchClass = last)
pitchClasses.subscribe
  (pc => otherPitchClasses = without(Staff.pitchClasses, pitchClasses.value))

pitchClasses.onNext(sample(Staff.pitchClasses))
