const { OAuth2Client } = require('google-auth-library');
const { googleID, googleSecret} = require('./../config')

const client = new OAuth2Client(googleSecret);
async function googleVerify( token ) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: googleID,  // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();  
  return payload;
}
googleVerify().catch(console.error);

module.exports = {
    googleVerify
}