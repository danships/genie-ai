
module.exports = {
  stt: {
    engine: 'google',
    google: {
      projectId: process.env.GOOGLE_PROJECT_ID,
      keyFilename: process.env.GOOGLE_KEYFILE
    },
    hotwords: [
      {
        file: 'assets/snowboy/snowboy.umdl',
        hotword: 'snowboy'
      }
    ]
  },
  tts: {
    engine: 'espeak'
  }
}
