import {
    AuthAction,
    useAuthUser,
    withAuthUser,
    withAuthUserTokenSSR,
  } from 'next-firebase-auth';
  import firebase from 'firebase/app';
  import Head from 'next/head';
  import Link from 'next/link';
  import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useRef } from "react";
  
  // <p>Your email is {AuthUser.email ? AuthUser.email : 'unknown'}.</p>
  //
  
  const editCat = (event) => {
    let input = prompt("Nom de la categoria:");
    if (input == null || input == "") {
      input = "User cancelled the prompt.";
    }
    console.log(input)
  }


const Calendar = () => {
  const calendarRef = useRef(null);
  return (
    <FullCalendar
      innerRef={calendarRef}
      plugins={[timeGridPlugin, interactionPlugin]}
      editable
      selectable
    />
  );
};


  const Demo = () => {
    const AuthUser = useAuthUser()
    return (
        <div id='page_calendar'>
            <Head>
                <title>Calendario</title>
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
          </div>
          <div id='calendar_div'>
            <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Europe%2FMadrid&src=YW5kcmVzLmFyZXZhbG8uN2UzQGl0Yi5jYXQ&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=aXRiLmNhdF9jc2M5ZGpwNml1Zjczcjg1NDQzZjd1M2Rla0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=aXRiLmNhdF9jbGFzc3Jvb21kZTU4MTk3Y0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb200ODBjMzhlMkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=aXRiLmNhdF9jbGFzc3Jvb20zN2YyNzI0Y0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=aXRiLmNhdF9jbGFzc3Jvb205YjFmYjE5MEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb21mZjMyYzI2NEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb204YTExOTNmYUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb20zMjA1NjBkMEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb20yZWVlNTc1N0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb20xNDBlMzgxNkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb21iNWQ3OTViYkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb204ZWNhOGZmOEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb20xNTdlMTJhY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb205YmVlYzdhOUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb21jMjM4YmU1MUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=aXRiLmNhdF9jbGFzc3Jvb21kMjZlOWQ4MEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb20yOWY1NWFjNUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=aXRiLmNhdF9jbGFzc3Jvb20zZmNlMDU2NUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb21jODU5MmViMEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb21hOGQ1NjMzNEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb202ZGIwMWI4NkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb201OTA2Y2IwNUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb21hYzA2Y2YwM0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb21lNWEyYWJmNkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb20xMjIwMmI1N0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb201ZDM2NDdiYUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=aXRiLmNhdF9jbGFzc3Jvb203MWNjZDk3YkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=aXRiLmNhdF9jbGFzc3Jvb205MjY1NjIyMUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb20zZTFkOGYyOUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=aXRiLmNhdF9jbGFzc3Jvb205NTNlZTg5OUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb200ZjBhMWY1MEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb21jN2ExYzAxN0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb20wOTgxNmJiOUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb205YmU4NDYzYkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb203NmE1ZDNlZUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb21lODVlYjEzYUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y2Euc3BhaW4jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&src=aXRiLmNhdF9jbGFzc3Jvb21lMDUxMDJmY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb20xNTMyNGE1ZEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=aXRiLmNhdF9jbGFzc3Jvb200YzM3ZTU2MUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=Y19jbGFzc3Jvb21mZWFjNDk0OEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%2333B679&color=%23C0CA33&color=%23137333&color=%23202124&color=%23202124&color=%230047a8&color=%23007b83&color=%23202124&color=%23202124&color=%23c26401&color=%230047a8&color=%23202124&color=%230047a8&color=%23137333&color=%23202124&color=%230047a8&color=%230047a8&color=%230047a8&color=%230047a8&color=%23202124&color=%230047a8&color=%230047a8&color=%230047a8&color=%230047a8&color=%23007b83&color=%230047a8&color=%23202124&color=%23202124&color=%237627bb&color=%237627bb&color=%230047a8&color=%23137333&color=%230047a8&color=%230047a8&color=%23202124&color=%230047a8&color=%230047a8&color=%230B8043&color=%237627bb&color=%230047a8&color=%23007b83&color=%23202124" style={{width: "80%", height: "80%", frameborder: "0", scrolling: "no"}}></iframe>
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
  })(Demo)
