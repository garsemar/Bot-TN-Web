import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import firebase from 'firebase/app';
import Head from 'next/head';
import Link from 'next/link';
import React, { useEffect, useState } from "react";


// <p>Your email is {AuthUser.email ? AuthUser.email : 'unknown'}.</p>
//


const Events = () => {

  const [rows, setRows] = useState([]);
  const [rows2, setRows2] = useState([]);

  const getRows = async () => {
    try {
      const res = await fetch(`https://bottn.glitch.me/api/events/true`, {
        method: 'GET',
        headers: new Headers({ 'Content-type': 'application/json' }),
        mode: 'cors'
      });
      const res2 = await fetch(`https://bottn.glitch.me/api/events/false`, {
        method: 'GET',
        headers: new Headers({ 'Content-type': 'application/json' }),
        mode: 'cors'
      });
      const data = await res.json();
      const data2 = await res2.json();

      const formattedData = data.map(({ id, titulo, informacion, links }) => ({ id, titulo, informacion, links }));
      setRows(formattedData);
      const formattedData2 = data2.map(({ id, titulo, informacion, links }) => ({ id, titulo, informacion, links }));
      setRows2(formattedData2);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRows();
  }, []);

  const deleteCat = (id) => {
		if (confirm("Segur que vols eliminar la informació.")) {
			fetch("https://bottn.glitch.me/api/events/" + id, {
				method: 'DELETE',
			}).then(res => res.json())
				.catch(error => console.error('Error:', error))
				.then(response => {
					setRows(prevTable => prevTable.filter(item => item.id !== id));
          setRows2(prevTable => prevTable.filter(item => item.id !== id));
				});
		} else {
			txt = "You pressed Cancel!";
		}
	};

  class TableTR extends React.Component {
    renderRow(props) {
      return (
        <div key={props.id} id="tablas_index">
          <h2>{props.titulo}</h2>
          <p>{props.informacion}</p>
          <p><Link href={props.links}>{props.links}</Link></p>
          <div id="function_events">
            <p><Link name="id" href={{ pathname: "/editEvent", query: { id: props.id, titulo: props.titulo, informacion: props.informacion, links: props.links } }}>📋</Link></p>
            <p><Link name="id" href="/events" onClick={() => deleteCat(props.id)}>❌</Link></p>
          </div>
        </div>
      );
    }

    render() {
      return (
        <div>
          {this.props.rows.map(this.renderRow)}
        </div>
      );
    }
  };


  const AuthUser = useAuthUser()
  return (
    <div>
      <Head>
        <title>Eventos</title>
        <meta charset="UTF-8" />
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
          <Link href="admin" className="btn_events_go" >Volver</Link>
          <Link href="form" className="btn_events_go" >Creación</Link>
        </div>
        <div id="block">
          <div className="form_eventos" id="div_noticias">
          <p id='title_event'>Noticias</p>
            {rows.length > 0 ? <TableTR rows={rows} /> : <p>Loading...</p>}
          </div>
          <div className="form_eventos" id="div_eventos">
            <p id='title_event'>Eventos</p>
            {rows.length > 0 ? <TableTR rows={rows2} /> : <p>Loading...</p>}
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