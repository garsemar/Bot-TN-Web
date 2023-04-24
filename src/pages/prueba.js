import {
    AuthAction,
    useAuthUser,
    withAuthUser,
    withAuthUserTokenSSR,
  } from 'next-firebase-auth';
  import firebase from 'firebase/app';
  import Head from 'next/head';
  import Link from 'next/link';
  import axios from "axios";
  import FormData from 'form-data';
  import { useState, useRef } from "react";
    
    // <p>Your email is {AuthUser.email ? AuthUser.email : 'unknown'}.</p>
    //
    
    const editCat = (event) => {
      let input = prompt("Nom de la categoria:");
      if (input == null || input == "") {
        input = "User cancelled the prompt.";
      }
      console.log(input)
    }
    
    const Demo = () => {
      const AuthUser = useAuthUser()
  
      const [opcionSeleccionada, setOpcionSeleccionada] = useState('Eventos');
  
      const handleChange = (e) => {
        setOpcionSeleccionada(e.target.value);
      };
  
      const uploadImage = (event) => {
        console.log(event.target)
        const file = event.target.files[0];
        const data = new FormData();
        data.append('image', file);
    
        const config = {
          method: 'post',
          maxBodyLength: Infinity,
          url: 'https://api.imgur.com/3/image',
          headers: {
            'Authorization': 'Client-ID {{49dea5b2f599342}}'
          },
          data: data
        };
    
        axios(config)
          .then(function (response) {
            const url = response.data.data.link;
            console.log(url);
            // Aquí puede actualizar la URL de la imagen en su estado o hacer cualquier otra cosa con ella
          })
          .catch(function (error) {
            console.log(error);
          });
      };
          
      return (
        <div>
          <Head>
              <title>Creación</title>
              <meta name="description" content="Generated by create next app" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <link rel="icon" href="/favicon.ico" />
          </Head>
          <div id="all">
            <img src="#" id="img" height="200px" />
            <br />
            <input type="file" id="file" /* onChange={ (e) => uploadImage} */ />
            <br />
              <p id="url"></p>
              <button onClick={uploadImage}>upload</button>
          </div>
        </div>
      )
    }
    
    export const getServerSideProps = withAuthUserTokenSSR({
      whenUnauthed: AuthAction.REDIRECT_TO_LOGIN
    })(() => {
      return {
        props: {}
      }
    })
    
    export default withAuthUser({
      whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN
    })(Demo)
  