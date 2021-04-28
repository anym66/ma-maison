import React from 'react'
import {Link} from 'react-router-dom'
import Login from './users/Login'
import Signup from './users/Signup'

function Accueil() {
    return (
        <div>
            <Link to = '/addlogement'>Ajouter un Logement</Link>
            <Link to = '/app'>Galerie</Link>
        </div>
    )
}

export default Accueil
