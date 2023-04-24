import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import firebase from 'firebase/app';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// <p>Your email is {AuthUser.email ? AuthUser.email : 'unknown'}.</p>
//

const rows = [
  { id: 1, nom: "hola1" },
  { id: 2, nom: "hola2" },
  { id: 3, nom: "hola3" },
];

/*const getRows = async () => {
  try {
    const res = await fetch(`https://bottn.glitch.me/api/tableName/`);
    const data = await res.json();
    return await data
  } catch (err) {
    console.log(err);
  }
}*/

const Admin = () => {
  const [rows, setRows] = useState([]);

  const getRows = async () => {
    try {
      const res = await fetch('https://bottn.glitch.me/api/tableName/', {
        method: 'GET',
        headers: new Headers({ 'Content-type': 'application/json' }),
        mode: 'cors'
      });
      console.log(res)
      const data = await res.json();

      const formattedData = Object.entries(data).map(([id, nom]) => ({ id, nom }));
      setRows(formattedData);
    } catch (err) {
      console.log(err);
    }
    // setRows([{id: '1', nom: 'hola'}])
  };

  useEffect(() => {
    getRows();
  }, []);

  const editCat = (id) => {
    let input = prompt("Nom de la categoria:");
    if (input == null || input == "" || input.length > 300) {
      setTableName("Error!");
    } else {
      setRows((prevTable) =>
        prevTable.map((row) => {
          if (row.id === id) {
            return { ...row, nom: input };
          } else {
            return row;
          }
        })
      );
      fetch("https://bottn.glitch.me/api/tableName/" + id, {
        method: 'PUT',
        body: JSON.stringify({nom: input}), // data can be `string` or {object}!
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
    }
  };

  const TableTR = () => ({
    renderRow(props) {
      return (
        <tr>
          <td><Link href={'/tableInfo?if=' + props.id}>{props.nom}</Link></td>
          <td><Link name="id" href="" onClick={() => editCat(props.id)}>Edit</Link></td>
          <td><Link href={"/api/deleteCat?id=" + props.id}>Delete</Link></td>
        </tr>
      );
    },

    render: function () {
      return (
        <table>
          <tbody>
            {this.props.rows.map(this.renderRow)}
          </tbody>
        </table>
      );
    }
  });

  return (
    <div>
      <Head>
        <title>Bot Trinitat Nova</title>
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
          <Link onClick={() => firebase.auth().signOut()} href="" id="login_cabecera">
            LOG OUT
          </Link>
        </div>
        <div>
          <form action="/createCat" method="post">
            <input type="text" id="new_category" placeholder="Nom de la categoria" required />
            <input type="submit" id="add_category" value="Afegir" />
          </form>
          <div id="bodyAdmin">
            {rows.length > 0 ? <TableTR rows={rows} /> : <p>Loading...</p>}
          </div>
        </div>
        <div className="footer-basic">
          <div>
            <Link href="#">Condiciones de uso</Link>
            <Link href="#">Políticas de privacidad</Link>
            <Link href="#">Políticas de cookies</Link>
            <Link href="#">Accesibildad</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

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
})(Admin)