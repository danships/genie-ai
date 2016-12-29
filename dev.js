
var config = require('./lib/config/defaultConfig.js')
var genie = require('./index.js')

try {
  genie.init(config)
    .then(function () {
      return genie.start()
    })
    .then(function () {
      console.log('Genie started!')
      genie.on('hotword', function (hotword) {
        console.log('hotword ' + hotword)
      })
    })
    .then(function () {
      console.log('Saying hello')
      genie.speak('hello')
    })
  genie.on('transcribe', function (transcript) {
    console.log('I heard: ' + transcript)
  })
} catch (err) {
  console.error(err)
}
