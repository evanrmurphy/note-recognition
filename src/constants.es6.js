'use strict'

var invert = require('lodash.invert')
  , solfegeByLetterNames =
      { C: 'do'
      , D: 're'
      , E: 'mi'
      , F: 'fa'
      , G: 'sol'
      , A: 'la'
      , B: 'si'
      }
  , letterNamesBySolfege = invert(solfegeByLetterNames)

module.exports =
  { letterNamesBySolfege
  , solfegeByLetterNames
  , waitOnCorrectGuess: 667
  , waitOnIncorrectGuess: 333
  }
