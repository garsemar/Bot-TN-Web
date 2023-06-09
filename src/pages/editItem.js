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

const EditItem = () => {
    const [rows, setRows] = useState({});
    const router = useRouter()
    let item

    const getRows = () => {
        item = router.query
    };

    getRows()

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
                .catch(error => console.error('Error:', error));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const id = event.target.id.value;
        const nom = event.target.nom.value;
        const informacion = event.target.informacion.value;
        const contacto = event.target.contacto.value;
        const horarios = event.target.horarios.value;
        const web = event.target.web.value;
        const direccion = event.target.direccion.value;

        fetch("https://bottn.glitch.me/api/item", {
            method: 'PUT',
            body: JSON.stringify({ id: id, nom: nom, informacion: informacion, contacto: contacto, horarios: horarios, web: web, direccion: direccion }), // data can be `string` or {object}!
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .catch(error => console.error('Error:', error));

        router.push("/item?id=" + item.idCat)
    };

    return (
        <div id="all">
            <Head>
                <title>Editar item</title>
                <meta charset="UTF-8" />
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <div className='addDiv'>
                <form className='editForm' method="post" onSubmit={handleSubmit}>
                    <input type="hidden" defaultValue={item.id} name='id' />
                    <input type="text" defaultValue={item.nom} name='nom' className='addName' placeholder="Nombre" />
                    <textarea type="text" defaultValue={item.informacion} name='informacion' className='addName' placeholder="Información" />
                    <input type="text" defaultValue={item.contacto} name='contacto' className='addName' placeholder="Contacto" />
                    <input type="text" defaultValue={item.horarios} name='horarios' className='addName' placeholder="Horarios" />
                    <input type="text" defaultValue={item.web} name='web' className='addName' placeholder="Web" />
                    <textarea type="text" defaultValue={item.direccion} name='direccion' className='addName' placeholder="Dirección" />
                    <br></br>
                    <button id="add_category" className='addNameButton'>Guardar</button>
                    <br></br>
                    <Link className='addNameButton' id='cancelButton' href={"/item?id=" + item.idCat}>Cancelar</Link>
                </form>
                <div id="bodyAdmin">

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
})(EditItem)