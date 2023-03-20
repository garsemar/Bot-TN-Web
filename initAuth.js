import { init } from 'next-firebase-auth'

const initAuth = () => {
  init({
    authPageURL: '/login',
      appPageURL: '/admin',
      loginAPIEndpoint: '/api/login',
      logoutAPIEndpoint: '/api/logout',
      firebaseAdminInitConfig: {
        credential: {
          projectId: 'bot-tn-d6742',
          clientEmail: 'firebase-adminsdk-y7knp@bot-tn-d6742.iam.gserviceaccount.com',
          // The private key must not be accessible on the client side.
          privateKey: process.env.FIREBASE_PRIVATE_KEY,
        }
      },
      firebaseClientInitConfig: {
        apiKey: "AIzaSyAwrJQq-_aSsAlaSTwO9fgo3Jxrjy_nGgA",
        authDomain: "bot-tn-d6742.firebaseapp.com",
        projectId: "bot-tn-d6742",
      },
      cookies: {
        name: 'bottncookie', // required
        // Keys are required unless you set `signed` to `false`.
        // The keys cannot be accessible on the client side.
        keys: [
          process.env.COOKIE_SECRET_CURRENT,
          process.env.COOKIE_SECRET_PREVIOUS,
        ],
        httpOnly: true,
        maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
        overwrite: true,
        path: '/',
        sameSite: 'strict',
        secure: true, // set this to false in local (non-HTTPS) development
        signed: true,
      },
      onVerifyTokenError: (err) => {
        console.error(err)
      },
      onTokenRefreshError: (err) => {
        console.error(err)
      },
  })
}

export default initAuth
