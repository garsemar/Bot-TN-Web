import Head from 'next/head';
import Link from 'next/link';

export default function Date() {
  return (
    <div id='page_calendar'>
      <Head>
        <title>Calendario</title>
        <meta charset="UTF-8" />
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
        <div id="btn_admin">
          <Link href="/" className="btn_admin_go" >Volver</Link>
        </div>
        <div id='calendar_div'>
          <iframe src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=UTC&src=dGF1bGFzYWx1dHRyaW5pdGF0bm92YUBnbWFpbC5jb20&src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&src=ZXMuc3BhaW4jaG9saWRheUBncm91cC52LmNhbGVuZGFyLmdvb2dsZS5jb20&color=%23039BE5&color=%2333B679&color=%230B8043" style={{ width: "80%", height: "80%", frameborder: "0", scrolling: "no" }}></iframe>
        </div>
      </div>
    </div>
  )
}
