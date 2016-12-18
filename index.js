'use script'
module.exports = {
  start: start,
  init: init,
  stop: stop,
  on: subscribe,
  removeListener: unsubscribe
}

var sonus = null,
  config = null,
  events;

const Sonus = require('sonus')

function init(options) {
  config = options;

  const speech = require('@google-cloud/speech')({
    projectId: config.stt.google.projectId,
    keyFilename: config.stt.google.keyFile
  })

  const hotwords = config.stt.hotwords;
  sonus = Sonus.init({hotwords}, speech)
}

/**
 * @param object options
 * @return void
*/
function start() {
  var EventEmitter = require("events").EventEmitter
  events = new EventEmitter();

  startSonus();
}

function subscribe(eventName, callback) {
  if (!events) {
    throw new Error('genie-ai was not started yet!')
  }
  events.on(eventName, callback)
}

function unsubscribe(eventName, callback) {
  if (!events) {
    throw new Error('genie-ai was not started yet!')
  }
  events.removeListener(eventName, callback)
}

function stop() {
  Sonus.stop(sonus)
}

function startSonus() {
  Sonus.start(sonus)
  sonus.on('hotword', (index, keyword) => events.emit('hotword', keyword))
  sonus.on('final-result', (transcript) => events.emit('transcribe', transcript))
}
