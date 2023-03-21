<!DOCTYPE html>

<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="/file?name=style.css">
    <link rel="icon" href="/file?name=bot.png" type="image/png" />
    <link href="https://fonts.googleapis.com/css2?family=Lobster+Two&display=swap" rel="stylesheet">
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,300,0,0" />
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <link rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
    <title>BOT TN</title>
</head>

<body>
    <div id="all">
        <div id="cabecera">
            <div id="title_cabecera">
              <a href="/" className="homeLink">
                Bot Trinitat Nova
              </a>
            </div>
            <!-- <input id="buscador_cabecera" type="text" placeholder="Buscar..."> -->
            <a href="/login" id="login_cabecera">Log In</a>
        </div>
        <div id="div_desplegable">
            <form id="form_desplegable" name="formulario1" method="post" action="">
                <label>Categorias</label>
                <select id="desplegable" name="destinos" onchange="location.href=formulario1.destinos.value;">
                    <option value="#">Jovens</option>
                    <option value="#">Adults</option>
                    <option value="#">Emergències</option>
                    <option value="#">Treball</option>
                    <option value="#">Inmigració</option>
                    <option value="#">Museus</option>
                    <option value="#">- Ver información </option>
                </select>
            </form>
        </div>
        <div id="cuerpo">
            <div id="qr">
                <img id="qr_img" src="/file?name=QR.png">
                <a href="https://wa.me/message/E5USRNWNH4VBL1">
                    <button id="qr_button">
                        WhatsApp Bot
                    </button>
                </a>
                <div id="qr_footer">
                    <ul>
                        <li><a href="#">Políticas de privacidad</a></li>
                        <li><a href="#">Políticas de cookies</a></li>
                        <li><a href="#">Condiciones de uso</a></li>
                        <li><a href="#">Accesibildad</a></li>
                    </ul>
                </div>
            </div>
            <div id="eventos2">
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
                <a href="#">
                    <div className="evento2">
                        Evento 8
                    </div>
                </a>
                <a href="#">
                    <div className="evento2">
                        Evento 9
                    </div>
                </a>
            </div>
        </div>
<!--         <div class="footer-basic">
            <footer>
                <table>
                    <ul>
                        <li><a href="#">Condiciones de uso</a></li>
                        <li><a href="#">Políticas de privacidad</a></li>
                        <li><a href="#">Políticas de cookies</a></li>
                        <li><a href="#">Accesibildad</a></li>
                        </ul>
                </table>
            </footer>
        </div> -->
    </div>
</body>

</html>
