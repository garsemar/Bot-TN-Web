import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from "react";

export default function Home() {

  const [displayNoticias, setDisplayNoticias] = useState(true)
  const [displayEventos, setDisplayEventos] = useState(false)

  const handleBtnDivnClick = () => {
    setDisplayNoticias(true);
    setDisplayEventos(false);
  }

  const handleBtnDiveClick = () => {
    setDisplayNoticias(false);
    setDisplayEventos(true);
  }

  const [rows, setRows] = useState([]);

  useEffect(() => {
    getRows();
  }, []);

  const getRows = async () => {
    try {
      const res = await fetch('https://bottn.glitch.me/api/events/', {
        method: 'GET',
        headers: new Headers({ 'Content-type': 'application/json' }),
        mode: 'cors'
      });
      console.log(res)
      const data = await res.json();
      console.log("data ", data)

      const formattedData = Object.entries(data).map(([id, titulo, informacion, links]) => ({ id, titulo, informacion, links }));
      setRows(formattedData);
      console.log(formattedData)
    } catch (err) {
      console.log(err);
    }
  };

  const TableTR = () => ({
    renderRow(props) {
      return (
        <tr>
          <td><Link href={'data?id=' + props.id}>{props.titulo}</Link></td>
          <td><Link href={'data?id=' + props.id}>{props.informacion}</Link></td>
          <td><Link href={'data?id=' + props.id}>{props.links}</Link></td>
        </tr>
      );
    },

    render: function () {
      return (
        <table className="vertical-table">
          <tbody>
            {this.props.rows.map(this.renderRow)}
          </tbody>
        </table>
      );
    }
  });

  

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

  }, 
  
  []);

  return (
    <>
      <Head>
        <title>BOT TN</title>
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
        </div>
        <div id="cuerpo">
          <div id="qr">
            <Link href="" id="myBtn">Instrucciones</Link>
            <div id="myModal" className="modal">
              <div className="modal-content">
                <span className="close">&times;</span>
                <p>titulo = vuelta menu <br /> botnoes = cambio eventos</p>
              </div>
            </div>
            <Link id="date_user" href="/date_user">Calendario</Link>
            <div id="myModal" className="modal">
              <div className="modal-content">
                <span className="close">
                  &times;
                </span>
                <p>Instrucciones de cómo funciona la página web</p>
              </div>
            </div>
            <img id="qr_img" src="/QR.png" />
            <a href="https://wa.me/message/E5USRNWNH4VBL1">
              <button id="qr_button">
                WhatsApp Bot
              </button>
            </a>
          </div>
          <div id="eventos2">
            <div id="seleccion">
              <Link href="" className="btn_divg" onClick={handleBtnDivnClick}>Noticias</Link>
              <Link href="" className="btn_divg" onClick={handleBtnDiveClick}>Agenda</Link>
            </div>
            <div id="block">
              <div className="div_noticias" id="div_noticias" style={{ display: displayNoticias ? 'block' : 'none' }}>
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
              <div className="div_eventos" id="div_eventos" style={{ display: displayEventos ? 'block' : 'none' }}>
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
        <div id="bodyAdmin">
            {rows.length > 0 ? <TableTR rows={rows} /> : <p>Loading...</p>}
          </div>
      </div>
    </>
  )
}
