import React from 'react'
import App from '../App.js'
import AddLogement from './AddLogement'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Accueil from './Accueil'
import LogeDetails from './LogeDetails'
import Login from '../components/users/Login'
import Signup from '../components/users/Signup'


function Main() {
    return (
        <div>
                <BrowserRouter>
                    <Route path = "/"  component = {Accueil} />
                    <Switch>
                        <Route path = "/addlogement" component = {AddLogement} />
                        <Route path = "/logedetails/:idLoge" component = {LogeDetails} />
                        <Route path = "/login" component = {Login} />
                        <Route path = "/signup" component = {Signup} />
                        <Route path = "/app" component = {App} />
                    </Switch>
                </BrowserRouter>
        </div>
    )
}

export default Main
