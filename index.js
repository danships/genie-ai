'use script'
module.exports = {
  start: start,
  init: init,
  stop: stop,
  on: subscribe,
  removeListener: unsubscribe
}

var sonus = null
var config = null

const EventEmitter = require('events').EventEmitter
const events = new EventEmitter()
const Promise = require('bluebird')
const Sonus = require('sonus')

function init (options) {
  return new Promise(function (resolve, reject) {
    config = options

    const speech = require('@google-cloud/speech')({
      projectId: config.stt.google.projectId,
      keyFilename: config.stt.google.keyFile
    })

    const hotwords = config.stt.hotwords
    sonus = Sonus.init({hotwords}, speech)
    resolve()
  })
}

/**
 * @param object options
 * @return void
*/
function start () {
  return new Promise(function (resolve, reject) {
    startSonus()
    resolve()
  })
}

function subscribe (eventName, callback) {
  return new Promise(function (resolve, reject) {
    if (!events) {
      reject(new Error('genie-ai was not started yet!'))
    }
    events.on(eventName, callback)
    resolve()
  })
}

function unsubscribe (eventName, callback) {
  return new Promise(function (resolve, reject) {
    if (!events) {
      reject(new Error('genie-ai was not started yet!'))
    }
    events.removeListener(eventName, callback)
    resolve()
  })
}

function stop () {
  return new Promise(function (resolve, reject) {
    Sonus.stop(sonus)
    resolve()
  })
}

function startSonus () {
  Sonus.start(sonus)
  sonus.on('hotword', (index, keyword) => events.emit('hotword', keyword))
  sonus.on('final-result', (transcript) => events.emit('transcribe', transcript))
}
