import React, { Component } from 'react'
import axios from 'axios'

export class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user : {
                userLogin : "",
                userPassWord : ""
            }
        }
    }

    

    handleChange = (e) =>{
        let userTemp = this.state.user
        userTemp[e.target.name] = e.target.value
        this.setState({user : userTemp})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        axios.post(`https://mamaison.arenaplaza.site/api/User/Authentificate`,  this.state.user )
        .then(res => {
            localStorage.setItem('token', res.data.userTokeng)
            const userToken = localStorage.getItem('token')
            console.log(userToken)
        }).catch(erreur =>{
            alert("serveur indisponible")
            console.log(erreur);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
        })
        
    }
    
    render() {
        return (
            <div>
                <div>
                    <form>
                        <label>Login</label>
                        <input type = "text" name = "userLogin" onChange = {this.handleChange}/>
                        <label>PassWord</label>
                        <input type = "password" name = "userPassWord" onChange = {this.handleChange}/>
                        <button type = 'submit' onClick = {this.handleSubmit}>Connecter</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login
