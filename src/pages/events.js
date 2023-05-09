import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import firebase from 'firebase/app';
import Head from 'next/head';
import Link from 'next/link';

// <p>Your email is {AuthUser.email ? AuthUser.email : 'unknown'}.</p>
//

const editCat = (event) => {
  let input = prompt("Nom de la categoria:");
  if (input == null || input == "") {
    input = "User cancelled the prompt.";
  }
  console.log(input)
}

const Events = () => {
  const AuthUser = useAuthUser()
  return (
    <div>
      <Head>
        <title>Eventos</title>
        <meta charset="UTF-8"/>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div id="all">
        <div id="cabecera">
          <div id="title_cabecera">
            <Link href="/" className="homeLink">
              Bot Trinitat Nova
            </Link>
          </div>
          <a onClick={() => firebase.auth().signOut()} id="login_cabecera">LOG OUT</a>
        </div>
        <div id='buttons_go'>
          <div id="go_events">
            <a href='admin'>Volver</a>
          </div>
          <div id="go_events">
            <a href='form'>Creación</a>
          </div>
        </div>
        <div id="block">
          <div className="form_eventos" id="div_noticias">
            <a href="#">
              <div className="evento2">
                Noticia 1
              </div>
            </a>
            <a href="#">
              <div className="evento2">
                Noticia 2
              </div>
            </a>
            <a href="#">
              <div className="evento2">
                Noticia 3
              </div>
            </a>
            <a href="#">
              <div className="evento2">
                Noticia 4
              </div>
            </a>
            <a href="#">
              <div className="evento2">
                Noticia 5
              </div>
            </a>
            <a href="#">
              <div className="evento2">
                Noticia 6
              </div>
            </a>
            <a href="#">
              <div className="evento2">
                Noticia 7
              </div>
            </a>
          </div>
          <div className="form_eventos" id="div_eventos">
            <a href="#">
              <div className="evento2">
                Evento 1
              </div>
            </a>
            <a href="#">
              <div className="evento2">
                Evento 2
              </div>
            </a>
            <a href="#">
              <div className="evento2">
                Evento 3
              </div>
            </a>
            <a href="#">
              <div className="evento2">
                Evento 4
              </div>
            </a>
            <a href="#">
              <div className="evento2">
                Evento 5
              </div>
            </a>
            <a href="#">
              <div className="evento2">
                Evento 6
              </div>
            </a>
            <a href="#">
              <div className="evento2">
                Evento 7
              </div>
            </a>
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
})(Events)