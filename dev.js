
var config = require('./lib/config/defaultConfig.js'),
  genie = require('./index.js');

try {
  genie.init(config);
  genie.start();
  console.log('Genie started!');
  genie.on('hotword', function(hotword) {
    console.log('hotword ' + hotword);
  })
  genie.on('transcribe', function(transcript) {
    console.log('I heard: ' + transcript);
  })
} catch (err) {
  console.error(err);
}

/**const Sonus = require('sonus')
const speech = require('@google-cloud/speech')({
  projectId: process.env.GOOGLE_PROJECT_ID,
  keyFilename: process.env.GOOGLE_KEYFILE
})
const hotwords = [{ file: 'assets/snowboy/snowboy.umdl', hotword: 'snowboy' }]
const sonus = Sonus.init({ hotwords }, speech)
Sonus.start(sonus)
sonus.on('hotword', (index, keyword) => console.log("!"))
sonus.on('final-result', console.log)
*/
