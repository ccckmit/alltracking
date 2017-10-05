// 參考 : http://www.jianshu.com/p/7010bea0c656

const passport = module.exports = require('koa-passport')

const userList = [
  { id: 1, username: 'test', password: 'test' },
  { id: 2, username: 'ccc', password: '123' },
  { id: 3, username: '10155559266466893', password: '321' }
]

const fetchUser = (userFilter) => {
  // This is an example! Use password hashing in your
  return userList.find(userFilter)
}

// 參考:https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
passport.serializeUser(function (user, done) {
  console.log('serializeUser: user=%j', user)
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  console.log('deserializeUser: id=%d', id)
  const user = fetchUser((u) => u.id === id)
  if (user) done(null, user)
  done('deserializeUser error')
//  done(null, {id: 3, username: 'facebook', password: 'facebook'})
})

const LocalStrategy = require('passport-local').Strategy

passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password'
  },
  function (username, password, done) {
    console.log('LocalStrategy: username=%s password=%s', username, password)
    var user = fetchUser((u) => u.username === username)
    if (username === user.username && password === user.password) {
      done(null, user)
    } else {
      done(null, false)
    }
  }
))

const FacebookStrategy = require('passport-facebook').Strategy
passport.use(new FacebookStrategy(
  {
    // 請到 https://developers.facebook.com/apps 取得 id, Secret
    clientID: '1672994092752594',
    clientSecret: '52bb91dc3a9882034fc23ddcc8553266',
    callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/facebook/callback'
  },
  function (token, tokenSecret, profile, done) {
    // retrieve user ...
    var fbObj = {token: token, tokenSecret: tokenSecret, profile: profile }
    console.log('fbObj = %j', fbObj)
    var user = {id: 3, username: profile.id, password: token}
    userList.push(user)
//    fetchUser().then(user => done(null, user))
//    var user = fetchUser((u) => u.username === 'ccc')
    done(null, user)
  }
))

/*
const TwitterStrategy = require('passport-twitter').Strategy
passport.use(new TwitterStrategy({
    consumerKey: 'your-consumer-key',
    consumerSecret: 'your-secret',
    callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/twitter/callback'
  },
  function(token, tokenSecret, profile, done) {
    // retrieve user ...
    fetchUser().then(user => done(null, user))
  }
))

const GoogleStrategy = require('passport-google-auth').Strategy
passport.use(new GoogleStrategy({
    clientId: 'your-client-id',
    clientSecret: 'your-secret',
    callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/google/callback'
  },
  function(token, tokenSecret, profile, done) {
    // retrieve user ...
    fetchUser().then(user => done(null, user))
  }
))
*/