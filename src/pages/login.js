import Head from 'next/head'
import React, {useEffect, useState} from 'react';
import firebase from 'firebase/app';

import { withAuthUser, AuthAction } from 'next-firebase-auth';

const handleSubmit = async (event) => {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;
  console.log(email, password)
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
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Document</title>
      </Head>

      <div id="login-div">
        <form onSubmit={handleSubmit}>
            <h1 className=' mb-10 text-4xl xl:text-5xl'></h1>
            <input type="email" id="email" name="email" className='login-data' placeholder="Correu electronic..."/>
            <input type="password" id="password" name="password" className='login-data' placeholder="Contrasenya..."/>
            <input type="submit" id='login-button' value="Log in"/>
        </form>

        <div>
            <a id="atras_button" href="/">Atras</a>  
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