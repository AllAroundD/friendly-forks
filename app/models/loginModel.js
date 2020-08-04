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
 
    const isValidPassword = await bcrypt.compare( password, userData.password );
    console.log( ` [loginUser] checking password (password: ${password} ) hash(${userData.password})`, isValidPassword );
    if( !isValidPassword ) {
       return { error: 'Invalid password' };
    }
 
    // add the suggested session to the user.
    userData.session = session;
 
    // update the session
    // remove entries before we do teh update
    const dbResult = await db.users.findOneAndUpdate( { _id: userData._id}, userData );
 
    // remap the data into the specified fields as we are using camelCase
    if( !dbResult._id ) {
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
       session: userData.session
    //    ,createdAt: userData.createdAt
    };
 }

