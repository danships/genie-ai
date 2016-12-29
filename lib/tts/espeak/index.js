const espeak = require('promisified-espeak')

module.exports = {
  speak: speak
}

function speak (text) {
  return espeak.say(text)
}
