import {
    AuthAction,
    useAuthUser,
    withAuthUser,
    withAuthUserTokenSSR,
} from 'next-firebase-auth';
import firebase from 'firebase/app';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

// <p>Your email is {AuthUser.email ? AuthUser.email : 'unknown'}.</p>
//

/*const getRows = async () => {
  try {
    const res = await fetch(`https://bottn.glitch.me/api/tableName/`);
    const data = await res.json();
    return await data
  } catch (err) {
    console.log(err);
  }
}*/

const Item = () => {
    const [rows, setRows] = useState([]);
    const router = useRouter()

    const getRows = async () => {
        const {id} = router.query
        try {
            const res = await fetch('https://bottn.glitch.me/api/tableName/'+id, {
                method: 'GET',
                headers: new Headers({ 'Content-type': 'application/json' }),
                mode: 'cors'
            });
            console.log(res)
            const data = await res.json();

            // const formattedData = Object.entries(data).map(([id, nom, informacion, contacto, horarios, web, direccion]) => ({ id, nom, informacion, contacto, horarios, web, direccion }));
            setRows(data);
            console.log(data)
        } catch (err) {
            console.log(err);
        }
        // setRows([{id: '1', nom: 'hola'}])
    };

    useEffect(() => {
        getRows();
        console.log(rows)
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
                body: JSON.stringify({ nom: input }), // data can be `string` or {object}!
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => console.log('Success:', response));
        }
    };

    const deleteCat = (id) => {
        if (confirm("Si elimines la categoria també s'eliminara l'informació")) {
            fetch("https://bottn.glitch.me/api/tableName/" + id, {
                method: 'DELETE',
            }).then(res => res.json())
                .catch(error => console.error('Error:', error))
                .then(response => {
                    console.log('Success:', response)
                    setRows(prevTable => prevTable.filter(item => item.id !== id));
                });
        } else {
            txt = "You pressed Cancel!";
        }
    };

    const TableTR = () => ({
        renderRow(props) {
            return (
                <tr>
                    <td><Link href={'/item?id=' + props.id}>{props.nom}</Link> <Link name="id" href="" onClick={() => editCat(props.id)}>Edit</Link></td>
                    <td><Link href={'/item?id=' + props.id}>{props.informacion}</Link> <Link name="id" href="" onClick={() => editCat(props.id)}>Edit</Link></td>
                    <td><Link href={'/item?id=' + props.id}>{props.contacto}</Link> <Link name="id" href="" onClick={() => editCat(props.id)}>Edit</Link></td>
                    <td><Link href={'/item?id=' + props.id}>{props.horarios}</Link> <Link name="id" href="" onClick={() => editCat(props.id)}>Edit</Link></td>
                    <td><Link href={'/item?id=' + props.id}>{props.web}</Link> <Link name="id" href="" onClick={() => editCat(props.id)}>Edit</Link></td>
                    <td><Link href={'/item?id=' + props.id}>{props.direccion}</Link> <Link name="id" href="" onClick={() => editCat(props.id)}>Edit</Link></td>
                    <td><Link name="id" href="" onClick={() => deleteCat(props.id)}>Delete</Link></td>
                </tr>
            );
        },

        render: function () {
            return (
                <table>
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Informacion</th>
                            <th>Contacto</th>
                            <th>Horarios</th>
                            <th>Web</th>
                            <th>Direccion</th>
                        </tr>
                    </thead>
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
                <title>Administración</title>
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
                <div id='buttons_go'>
                    <div id="go_events">
                        <a href='events'>Eventos y noticias</a>
                    </div>
                    <div id="go_events">
                        <a href='date'>Calendario</a>
                    </div>
                </div>
                <div className='addDiv'>
                    <form action="/createCat" method="post">
                        <input type="text" id="new_category" className='addName' placeholder="Nom de la categoria" required />
                        <input type="submit" id="add_category" className='addNameButton' value="Afegir" />
                    </form>
                    <div id="bodyAdmin">
                        {rows.length > 0 ? <TableTR rows={rows} /> : <p>Loading...</p>}
                    </div>
                </div>
                <div>
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
})(Item)