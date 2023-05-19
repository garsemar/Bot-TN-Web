import {
	AuthAction,
	withAuthUser,
	withAuthUserTokenSSR,
} from 'next-firebase-auth';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from './modules/Navbar';
import Head from 'next/head';
import React from 'react';

// <p>Your email is {AuthUser.email ? AuthUser.email : 'unknown'}.</p>
//

/*const getRows = async () => {
	try {
		const res = await fetch(`https://bottn.glitch.me/api/tableName/`);
		const data = await res.json();
		return await data
	} catch (err) {
		(err);
	}
}*/

const Item = () => {
	const [rows, setRows] = useState([]);
	const router = useRouter()
	const { id } = router.query

	const getRows = async () => {
		try {
			const res = await fetch('https://bottn.glitch.me/api/tableName/' + id, {
				method: 'GET',
				headers: new Headers({ 'Content-type': 'application/json' }),
				mode: 'cors'
			});
			const data = await res.json();

			// const formattedData = Object.entries(data).map(([id, nom, informacion, contacto, horarios, web, direccion]) => ({ id, nom, informacion, contacto, horarios, web, direccion }));
			setRows(data);
		} catch (err) {
			console.log(err);
		}
		// setRows([{id: '1', nom: 'hola'}])
	};

	useEffect(() => {
		getRows();
	}, []);

	const deleteCat = (id) => {
		if (confirm("Segur que vols eliminar la informació.")) {
			fetch("https://bottn.glitch.me/api/item/" + id, {
				method: 'DELETE',
			}).then(res => res.json())
				.catch(error => console.error('Error:', error))
				.then(response => {
					setRows(prevTable => prevTable.filter(item => item.id !== id));
				});
		} else {
			txt = "You pressed Cancel!";
		}
	};

	const addCat = () => {
		fetch("https://bottn.glitch.me/api/item/" + id, {
			method: 'POST',
		}).then(res => res.json())
			.catch(error => console.error('Error:', error))
			.then(response => {
				const lastId = rows.reduce((maxId, item) => Math.max(item.id, maxId), 0)
				const newRows = [...rows, { id: lastId + 1 }];
				setRows(newRows);
			});
	};

	class TableTR extends React.Component {
		renderRow(props) {
			return (
				<tr key={props.id}>
					<td><p>{props.nom}</p></td>
					<td><p>{props.informacion}</p></td>
					<td><p>{props.contacto}</p></td>
					<td><p>{props.horarios}</p></td>
					<td><p>{props.web}</p></td>
					<td><p>{props.direccion}</p></td>
					<td className='table_functions_item'><Link name="id" href={{ pathname: "/editItem", query: { idCat: id, id: props.id, nom: props.nom, informacion: props.informacion, contacto: props.contacto, horarios: props.horarios, web: props.web, direccion: props.direccion } }}>📋</Link></td>
					<td className='table_functions_item'><Link name="id" href={"/item?id=" + id} onClick={() => deleteCat(props.id)}>❌</Link></td>
				</tr>
			);
		}

		render() {
			return (
				<table id="table_items">
					<thead>
						<tr>
							<th>Nombre</th>
							<th>Información</th>
							<th>Contacto</th>
							<th>Horarios</th>
							<th>Web</th>
							<th>Dirección</th>
						</tr>
					</thead>
					<tbody>
						{this.props.rows.map(this.renderRow)}
					</tbody>
				</table>
			);
		}
	};

	return (
		<div id="all">
			<Head>
				<title>Administración</title>
				<meta charSet="UTF-8" />
				<meta name="description" content="Generated by create next app" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Navbar />
			<div id='buttons_go'>
				<div id="btn_admin">
					<Link href="admin" className="btn_admin_go" >Volver</Link>
				</div>
			</div>
			<div className='addDiv'>
				<form onSubmit={addCat} method="post">
					<input type="submit" id="add_category" className='addNameButton' value="Añadir item" />
				</form>
				<div id="body_items">
					{rows.length > 0 ? <TableTR rows={rows} /> : <p>Loading...</p>}
				</div>
			</div>
			<div>
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