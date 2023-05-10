import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';
import Head from 'next/head';
import Link from 'next/link';
import { useState, useRef } from "react";
import { createCanvas, loadImage } from 'canvas';
import { useRouter } from 'next/router';
import axios from 'axios';


const Form = () => {
  const AuthUser = useAuthUser()

  const [opcionSeleccionada, setOpcionSeleccionada] = useState('Eventos');

  const [img, setImg] = useState("");

  const handleChange = (e) => {
    setOpcionSeleccionada(e.target.value);
  };


  function uploadImage() {
    // fetch("https://api.imgur.com/oauth2/authorize?client_id=6d702fdc3700d08&response_type=TOKEN&state=HOLA")
    
    const myHeaders = {
      'Authorization': 'Client-ID 6d702fdc3700d08'
    };
  
    const formData = new FormData();
      formData.append('image', `iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAMAAADDpiTIAAAAA3NCSVQICAjb4U/gAAAACXBIWXMAABrXAAAa1wH5OIzNAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAwBQTFRF////AQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACAQACl5/7/AAAAP90Uk5TAAECAwQF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`);

  
    axios({
      method: 'post',
      url: 'https://api.imgur.com/3/image',
      headers: myHeaders,
      data: formData
    })
    .then(response => {
      console.log(response.data.data.link.toString());
      setImg(response.data.data.link.toString());
    })
    .catch(error => console.log('error', error));
    
  }
  uploadImage()

  console.log(img)

  const { createCanvas, loadImage } = require('canvas');

  async function getBase64Image(imgSrc) {
    const img = await loadImage(imgSrc);
    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const dataURL = canvas.toDataURL('image/png');
    return dataURL.replace(/^data:image\/?[A-z]*;base64,/, '');
  }

  (async () => {
    const base64 = await getBase64Image(img);
    console.log(base64)
  })();

  const handleSubmit = (e) => {
    const router = useRouter();
    router.push('/events');
  }


  return (
    <div>
      <Head>
        <title>Creación</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="all">
        <div id="form_body">
          <div id="form-div">
            <form className='w-full flex' method="post" encType="multipart/form-data" onSubmit={handleSubmit}>
              <div>
                <label>Noticias<input type="radio" value="Noticias" checked={opcionSeleccionada === 'Noticias'} onChange={handleChange}></input></label>
                <label>Eventos<input type="radio" value="Eventos" checked={opcionSeleccionada === 'Eventos'} onChange={handleChange}></input></label>
              </div>
              <input type="text" id="title_noticia" name="titular" className='title_noticia' placeholder="Titular..." />
              <textarea type="text" id="text_noticia" name="infor" className='text_noticia' rows="10" placeholder="Información..."></textarea>
              <input type="text" id="text_noticia" name="link" className='url' rows="2" placeholder="Añadir link de página web..."></input>
              <img src={img} id="img" height="200px" />
              <input type="file" id="file" />

              <input type="submit" id='add-button' value="Añadir" />
            </form>
            <div id='atras_div'>
              <Link className='atras_button' href="events">Atras</Link>
            </div>
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
})(Form)
