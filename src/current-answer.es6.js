'use strict'

var Rx = require('rx')
  , singleton

function accessor() {
  if (singleton == null)
    singleton = new Rx.Subject()

  return singleton
}

module.exports = accessor
