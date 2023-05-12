import Link from "next/link";
import firebase from 'firebase/app';

export default function Navbar() {
    return (
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
    )
}