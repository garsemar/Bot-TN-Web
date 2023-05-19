import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import firebase from 'firebase/app';
import Head from 'next/head';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';


/* myHeaders.append("Authorization", "Client-ID 6d702fdc3700d08");*/


const Admin = () => {
  const [inputValue, setInputValue] = useState('');
  const [rows, setRows] = useState([]);

  const getRows = async () => {
    try {
      const res = await fetch('https://bottn.glitch.me/api/tableName/', {
        method: 'GET',
        headers: new Headers({ 'Content-type': 'application/json' }),
        mode: 'cors'
      });
      const data = await res.json();

      const formattedData = Object.entries(data).map(([id, nom]) => ({ id, nom }));
      setRows(formattedData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getRows();
  }, []);

  const editCat = (id) => {
    let input = prompt("Nombre de la categoria:");
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

  const addCat = (category) => {
    fetch("https://bottn.glitch.me/api/tableName/" + category, {
      method: 'POST',
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => {
        const lastId = rows.reduce((maxId, item) => Math.max(item.id, maxId), 0)
        const newRows = [...rows, { id: lastId+1, nom: category }];
        setRows(newRows);
      });
  };

  const handleInput = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addCat(inputValue);
    setInputValue('');
  };
  
  const deleteCat = (id) => {
    if (confirm("Si eliminas la categoria también se eliminará la información")) {
      fetch("https://bottn.glitch.me/api/tableName/" + id, {
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

  class TableTR extends React.Component{
    renderRow(props) {
      return (
        <tr key={props.id}>
          <td id="table_names"><Link href={'/item?id=' + props.id}>{props.nom}</Link></td>
          <td><Link className="table_functions" name="id" href="" onClick={() => editCat(props.id)}>📋</Link></td>
          <td><Link className="table_functions" href="" onClick={() => deleteCat(props.id)}>❌</Link></td>
        </tr>
      );
    }

    render() {
      return (
        <table id="table_categories">
          <tbody>
            {this.props.rows.map(this.renderRow)}
          </tbody>
        </table>
      );
    }
  };

  useEffect(() => {
    const modal = document.getElementById("myModal");
    const btn = document.getElementById("myBtn");
    const span = document.getElementsByClassName("close")[0];

    const handleBtnClick = () => {
      modal.style.display = "block";
    }

    const handleCloseClick = () => {
      modal.style.display = "none";
    }

    const handleWindowClick = (event) => {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    }

    btn.addEventListener('click', handleBtnClick);
    span.addEventListener('click', handleCloseClick);
    window.addEventListener('click', handleWindowClick);

    return () => {
      btn.removeEventListener('click', handleBtnClick);
      span.removeEventListener('click', handleCloseClick);
      window.removeEventListener('click', handleWindowClick);
    };

  })  

  return (
    <div>
      <Head>
        <title>Administración</title>
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
          <Link onClick={() => firebase.auth().signOut()} href="" id="login_cabecera">
            LOG OUT
          </Link>
        </div>
        <div id="btn_admin">
          <Link href="events" className="btn_admin_go" >Noticias y Agenda</Link>
          <Link href="date" className="btn_admin_go" >Calendario</Link>
          <Link href="" id="myBtn">Ayuda</Link>
            <div id="myModal" className="modal">
              <div className="modal-content">
                <span className="close">&times;</span>
                <p>Hola, aquí te mostraremos como funcniona la página de administración:</p>
                <p id='help'>
                  <br />
                  - En la página principal vas a poder ver las categorías del chatBot, editar el nombre de estas o eliminarlas por completo, información incluida.
                  <br />
                  <br />
                  - Al clicar sobre las categorías podrás acceder al panel de la información de cada una. Dentro del panel podrás agregar categorías, editar su información o eliminarlas.
                  <br />
                  <br />
                  - Si accedemos a la página de "Noticias y Agenda" podremos crear una nueva noticia o evento, ver las columnas con la información, editar-la, o eliminar-la.
                  <br />
                  <br />
                  - También podemos acceder al calendario, en nuestro caso, al ser administradores, podremos crear eventos en el calendario, los usuarios solo podrán verlos.
                </p>
              </div>
            </div>
        </div>
        <div className='addDiv'>
          <form onSubmit={handleSubmit}>
            <input type="text" value={inputValue} onChange={handleInput} className='addName' placeholder="Nombre de la categoria" required />
            <button className='addNameButton' type="submit">Añadir</button>
          </form>
        </div>
        <div>
          <div id="bodyAdmin">
            {rows.length > 0 ? <TableTR rows={rows} /> : <p>Loading...</p>}
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