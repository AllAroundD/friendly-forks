const UserModel = require('./userModel')
const userModel = new UserModel()
const bcrypt = require( 'bcrypt' );
const saltRounds = 10;
let passwordHash = '';

// input: email, password
// output: <object> { userId, firstName, lastName, emailAddress, creationTime } || false
async function loginUser( email, password, session ) {
    if( !session ) {
       return { error: 'System error (session-not-given)' };
    }
    console.log('[loginUser] checking user email: ', email)
    // const userData = await db.users.findOne({ email: email }, '-createdAt -updatedAt');
    
    const userData = await userModel.getLoginCredentials(email)
    console.log( `[loadUser] email='${email}' userData:`, userData );


    if( !userData ) {
       return { error: 'Invalid password' };
    }

   //  console.log( ` [loginUser] checking password (password: ${password} ) hash(${userData[0].password})` ); 
    const isValidPassword = await bcrypt.compare( password, userData[0].password );
    console.log( ` [loginUser] checking password (password: ${password} ) hash(${userData[0].password})`, isValidPassword );
    if( !isValidPassword ) {
       return { error: 'Invalid password' };
    }
 
    // add the suggested session to the user.
    userData.session = session;
 
    // update the session
    // remove entries before we do teh update
   //  const dbResult = await db.users.findOneAndUpdate( { _id: userData._id}, userData );
    const dbResult = await userModel.updateSession(userData[0].userEmail, session);

    // remap the data into the specified fields as we are using camelCase
    if( !dbResult ) {
       return {
          error: `Sorry problems logging in ${userData.name}`
       };
    }
 
    return {
       message: `Logging in ${userData.name}...`,
       id: userData._id,
       name: userData.name,
       email: userData.email,
       thumbnail: userData.thumbnail,
       session: userData.session,
       createdAt: userData.createdAt
    }
 }


// input: session
// output: boolean
async function checkSession( session ){
   const userData = await userModel.checkSession(session);
   console.log( `[checkSession] session(${session}) -> valid? ${userData.id ? true : false}` );
   return( userData.id ? true : false );
}

 module.exports = {loginUser, checkSession};