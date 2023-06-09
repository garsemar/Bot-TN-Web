import Head from 'next/head'
import React, { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import Link from 'next/link';
import { withAuthUser, AuthAction } from 'next-firebase-auth';

const handleSubmit = async (event) => {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password)
  } catch (e) {
    console.error(e);
  }
};

function Login() {
  const [renderAuth, setRenderAuth] = useState(false)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setRenderAuth(true)
    }
  }, [])

  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Login</title>
      </Head>

      <div id="login-div">
        <form onSubmit={handleSubmit}>
          <input type="email" id="email" name="email" className='login-data' placeholder="Correu electronic..." />
          <input type="password" id="password" name="password" className='login-data' placeholder="Contrasenya..." />
          <input type="submit" id='login-button' value="Log in" />
        </form>

        <div id='atras_div'>
          <Link className='atras_button' href="/">Atras</Link>
        </div>
      </div>
    </>
  )
}

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.RETURN_NULL,
  whenUnauthedAfterInit: AuthAction.RENDER
})(Login)