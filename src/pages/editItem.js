import {
    AuthAction,
    useAuthUser,
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
        const { nom } = router.query
        const { informacion } = router.query
        const { contacto } = router.query
        const { horarios } = router.query
        const { web } = router.query
        const { direccion } = router.query
        console.log(item)
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
                .catch(error => console.error('Error:', error))
                .then(response => console.log('Success:', response));
        }
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
                <form className='editForm' action="/createCat" method="post">
                    <input type="text" defaultValue={item.nom} id="new_category" className='addName' placeholder="Nom"/>
                    <textarea type="text" defaultValue={item.informacion} id="new_category" className='addName' placeholder="Informacion"/>
                    <input type="text" defaultValue={item.contacto} id="new_category" className='addName' placeholder="Contacto" />
                    <input type="text" defaultValue={item.horarios} id="new_category" className='addName' placeholder="Horarios"/>
                    <input type="text" defaultValue={item.web} id="new_category" className='addName' placeholder="Web"/>
                    <textarea type="text" defaultValue={item.direccion} id="new_category" className='addName' placeholder="Direccion"/>
                    <br></br>
                    <input type="submit" id="add_category" className='addNameButton' value="Guardar"/>
                    <br></br>
                    <Link className='addNameButton' id='cancelButton' href={"/item?id="+item.id}>Cancel</Link>
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