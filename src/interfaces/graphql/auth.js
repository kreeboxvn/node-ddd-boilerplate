const passport = require('passport')
const { ExtractJwt, Strategy } = require('passport-jwt')
/**
 * middleware to check the if auth vaid
 */

module.exports = ({ config, repository: { userRepository } }) => {
  const params = {
    secretOrKey: config.authSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  }

  const strategy = new Strategy(params, (payload, done) => {
    console.log('checking payload ', payload)
    userRepository
      .findById(payload.id)
      .then(user => {
        console.log('loaded user: ', user)
        done(null, user)
      })
      .catch(error => done(error, null))
  })

  passport.use(strategy)

  passport.serializeUser(function(user, done) {
    done(null, user)
  })

  passport.deserializeUser(function(user, done) {
    done(null, user)
  })

  return {
    initialize: () => {
      return passport.initialize()
    },
    authenticate: (...args) => {
      console.log('running authenticate')
      return passport.authenticate(...args)
    }
  }
}
