const UserModel = require('./userModel.js')
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
    
    const userData = await userModel.getLoginCredentials(email)
   //  console.log( `[loginModel loginUser] email='${email}' userData:`, userData );


    if( !userData ) {
       return { error: 'Invalid password' };
    }

   //  console.log( ` [loginUser] checking password (password: ${password} ) hash(${userData[0].password})` ); 
    const isValidPassword = await bcrypt.compare( password, userData[0].password );
   //  console.log( ` [loginUser] checking password (password: ${password} ) hash(${userData[0].password})`, isValidPassword );
    if( !isValidPassword ) {
       return { error: 'Invalid password' };
    }
 
    // add the suggested session to the user.
    userData[0].session = session;
 
    // update the session
    const dbResult = await userModel.updateSession(userData[0].userEmail, session);

    // remap the data into the specified fields as we are using camelCase
    if( !dbResult ) {
       return {
          error: `Sorry, problems logging in ${userData[0].firstName.concat(userData[0].lastName)}`
       };
    }
 
    return {
       message: `Logging in ${userData[0].firstName}...`,
       id: userData[0].id,
       name: userData[0].firstName,
       email: userData[0].userEmail,
       thumbnail: userData[0].thumbnail,
       session: userData[0].session,
       createdAt: userData[0].createdAt
    }
 }


// input: session
// output: boolean
async function getUserInfo( session ){
   const userData = await userModel.getUserInfo( session );
   // console.log( `[getUserInfo] session(${session})`,userData );
   return( userData )
}

// input: session
// output: boolean
async function logoutUser( session ){
   let updateResult = await userModel.clearSession(session);
   console.log( `[logoutUser] session(${session})`, updateResult );
   return true //( userData._id ? true : false );
}

// input: session
// output: boolean
async function checkSession( session ){
   const userData = await userModel.checkSession(session);
   // console.log( `[checkSession] session(${session}) -> valid? ${userData.id ? true : false}` );
   return( userData[0].id ? true : false )
}



 module.exports = {loginUser, checkSession, logoutUser, getUserInfo};