'use strict'

require('react')

var ReactRenderComponent = require('react/lib/ReactMount').renderComponent
  , Rx = require('rx')
  , sample = require('lodash.sample')
  , without = require('lodash.without')

var App = require('./app.es6.js')
  , Staff = require('./staff.es6.js')

var pitchClasses = new Rx.BehaviorSubject
  , answers = new Rx.BehaviorSubject
  , last2PitchClasses =
      pitchClasses.scan([null, null], ([_, last], current) => [last, current])
  , lastPitchClass
  , otherPitchClasses

answers.subscribe(function(answer) {
  if (answer === pitchClasses.value)
    pitchClasses.onNext(sample(otherPitchClasses))
})

pitchClasses.merge(answers).subscribe
  (() => ReactRenderComponent
           (App( { pitchClass: pitchClasses.value
                 , onAnswer: answers.onNext.bind(answers)
                 , lastAnswer: answers.value
                 , isLastAnswerCorrect: answers.value === lastPitchClass
                 }
               )
           , document.body))
last2PitchClasses.subscribe(([last, _]) => lastPitchClass = last)
pitchClasses.subscribe
  (pc => otherPitchClasses = without(Staff.pitchClasses, pitchClasses.value))

pitchClasses.onNext(sample(Staff.pitchClasses))
