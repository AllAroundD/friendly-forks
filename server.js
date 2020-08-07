require('dotenv').config() // --> process.env
const express = require("express")
const path = require("path")
const fs = require('fs')
// const PORT = process.env.PORT || 3001
const PORT = process.env.PORT || 8080
const app = express()
const logger = require('morgan');
const uuid = require( 'uuid' )
const orm = require('./app/orm')
const login = require('./app/models/loginModel')
const UserModel = require('./app/models/userModel')
const EventModel = require('./app/models/eventModel')
const user = new UserModel()
const event = new EventModel()
const bcrypt = require( 'bcrypt' );


const UPLOAD_PATH = process.env.UPLOAD_PATH || 'public/uploads/'
const uploadResizer = require('./app/uploadResizer')
const upload = require('multer')({ dest: UPLOAD_PATH })

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"))
} else { /* Development */
  if( !fs.existsSync('.env') ){
    console.log( '*ERROR* You need a .env file (with MySQL, SESSION_SECRET, GOOGLE_KEY/SECRET,...)' )
    process.exit()
 }
}
// for post requests
app.use( express.urlencoded({ extended: false }) );
app.use( express.json() );
app.use(logger('dev'));

const API_URL = process.env.NODE_ENV === 'production'
   ? 'https://friendlyforks.herokuapp.com/' : `http://localhost:${PORT}`      // TODO add prod url once ready

// session checking middleware
async function needSession(req, res, next){
  console.log( `[middleware] session url(${req.url}) session(${req.headers.session || ''}) ` )

  // check session set, and it's valid
  if( !req.headers.session ||
       req.headers.session.length!==36 ||
       !(await login.checkSession( req.headers.session )) ){

     console.log( '[middleware:session] invalid session, indicating redirect' )
     res.status(403).send( { error: 'Requires valid session. Please login again.' } )
     return
  }

  // session was good, let's continue endpoint processing...
  next()
}

// OAUTH Authentication
async function createOAuthSession( userData ){
  console.log( `[createOAuthSession] called for ${userData.name}` )

  // register user in system (if they aren't there, and get the associated session)
  const session = uuid.v4()
  const authUserData = await orm.registerUser( userData, session )

  // returns the logged-in user info to javascript
  return authUserData
}
// oAuth - list providers we'll accept .env info for
require('./app/oAuth')(app, API_URL, ['google','facebook'], createOAuthSession)



// ENDPOINTS      /---> next()

app.post('/api/user/register', async function( req,res ){
  const userData = req.body
  console.log( '[POST: /api/user/register] userData: ', userData )
  let passwordHash = '';
   if( !userData.type || userData.type==='local' ){
      if( !userData.password ){
         console.log( '[server.js] register: invalid userData (need password)! ', userData );
         return { message: 'Invalid user password', id: '', name: '' };
      }
      const saltRounds = 10;
      passwordHash = await bcrypt.hash(userData.password, saltRounds);
      userData.password=passwordHash
      console.log( `[registerUser] (hash=${passwordHash}) req.body:`, userData );
      userData.type = 'local';
   }
  const registerResult = await user.addUser( userData )
  res.send( registerResult )
})

app.post('/api/user/login', async function( req,res ){
  const userData = req.body
  // console.log( '[POST: /api/user/login] userData: ', userData )
  const session = uuid.v4()
  // console.log('[POST: /api/user/login] session: ', session )
  const loginResult = await login.loginUser( userData.email, userData.password, session )
  loginResult.rememberMe = req.body.rememberMe
  // console.log(`[server.js] sending loginResult `, loginResult)
  res.send( loginResult )
})

app.post('/api/user/save', async function( req,res ){
  const userData = req.body
  // console.log( '[POST: /api/user/save] userData: ', userData )
  const saveResult = await user.saveUser( userData )
  res.send( saveResult )
})

app.get('/api/user/session', needSession, async function( req,res ){
  const session = req.headers.session
  // console.log( '[POST: /api/user/session] userSession: ', session )
  const userData = await login.getUserInfo( session )
  // console.log(`[server.js] GET /api/user/session `, userData)
  res.send( userData )
})

app.post('/api/user/logout', needSession, async function( req,res ){
  // console.log( '[POST: /api/user/logout] userData: ' )
  const logoutResult = await login.logoutUser( req.headers.session )
  res.send( logoutResult )
})

app.get('/server-status', function(req, res){
  res.send({ status: 'running', time: Date.now() })
})

app.get('/api/media', async function (req, res) {
  console.log('[api/media] getting the list')
  const mediaList = await orm.getMedia()
  res.send({ status: true, mediaList })
})

app.post('/api/event/create', async function( req,res ){
  const eventData = req.body
  console.log( '[POST: /api/event/create] eventData: ', eventData )
  const insertResult = await event.addEvent( eventData )
  res.send( insertResult )
})

app.get('/api/event/events', async function (req, res) {
  const eventsList = await event.getAllEvents();
  res.send(JSON.stringify(eventsList));
});

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"))
})

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`)
})

// just for testing
// const bcrypt = require( 'bcrypt' );
// const saltRounds = 10;
// let passwordHash = '';

// async function pwdTest( password ){
  
// passwordHash = await bcrypt.hash(password, saltRounds);
// console.log( `[addTest] (hash=${passwordHash})`);
// }

// pwdTest('testing123')