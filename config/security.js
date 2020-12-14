var helmet = require('helmet');
const cookieParser = require('cookie-parser');

function getDirectives () {
    const self = "'self'"
    const unsafeInline = "'unsafe-inline'"
    const scripts = [
      "https://www.google-analytics.com/",
      "https://maps.googleapis.com/",
      "https://platform.twitter.com/",
    ]
    const styles = [
      "https://fonts.googleapis.com/",
      "https://platform.twitter.com/"
    ]
    const fonts = [
      "https://fonts.gstatic.com/"
    ]
    const frames = [
      "https://www.youtube.com/",
    ]
    const images = [
      "https:",
      "data:"
    ]
    const connect = [
      "https://api.github.com/",
      "https://maps.googleapis.com/"
    ]
  
    return {
      defaultSrc: [self],
      scriptSrc: [self, ...scripts],
      styleSrc: [self, unsafeInline, ...styles],
      fontSrc: [self, ...fonts],
      frameSrc: [self, ...frames],
      connectSrc: [self, ...connect],
      imgSrc: [self, ...images],
      objectSrc: [self],  
    }
  }

module.exports = app => {

    app.use(cookieParser())

    app.use(helmet.contentSecurityPolicy({
        directives: getDirectives()
    }))

    app.use(helmet.frameguard())

    app.use(helmet.hidePoweredBy())

}