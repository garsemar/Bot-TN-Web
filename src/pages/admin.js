import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import firebase from 'firebase/app';
import Head from 'next/head';

// <p>Your email is {AuthUser.email ? AuthUser.email : 'unknown'}.</p>
// 

const Demo = () => {
  const AuthUser = useAuthUser()
  return (
    <div>
      <Head>
        <title>garsemar</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div id="all">
        <div id="cabecera">
            <div id="title_cabecera">
                <a href="/" className="homeLink">
                Bot Trinitat Nova
              </a>
            </div>
            <a onClick={() => firebase.auth().signOut()} id="login_cabecera">LOG OUT</a>
        </div>
        <div>
            <form action="/createCat" method="post">
                <input type="text" id="new_category" placeholder="Nom de la categoria" required/>
                <input type="submit" id="add_category" value="Afegir"/>
            </form>
        <div id="bodyAdmin">
            <table>
                    <tr>
                        <td>table</td>
                        <td><a href="#">Edit</a></td>
              					<td><a href="#">Delete</a></td>
                    </tr>
            </table>
        </div>
        </div>
        <div className="footer-basic">
        <div>
                <a href="#">Condiciones de uso</a>
                <a href="#">Políticas de privacidad</a>
                <a href="#">Políticas de cookies</a>
                <a href="#">Accesibildad</a>
              </div>
        </div>
    </div>
    </div>
  )
}

// Note that this is a higher-order function.
export const getServerSideProps = withAuthUserTokenSSR({
    whenUnauthed: AuthAction.REDIRECT_TO_LOGIN
})(() => {
    return {
        props: {}
    }
})

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
})(Demo)