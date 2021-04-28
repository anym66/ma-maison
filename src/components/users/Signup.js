import React, { Component } from 'react'
import '../../form.css'
import axios from 'axios'

class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            user : {
                userLogin : "",
                userPassWord : "",
                agentName : "",
                agentEmail : "",
                image : ""
            }
        }
    }

    handleChange = (e) => {
        let userTemp = this.state.user
        userTemp[e.target.name] = e.target.value
        this.setState({ user : userTemp })
        console.log(this.state.user)
    }

    handleSubmit = (e) => {

        e.preventDefault()
        console.log(this.state.user)
        axios.post(`https://mamaison.arenaplaza.site/api/User/CreatedUser`,  this.state.user )
        .then(res => {
            console.log(res.data)
        }).catch(erreur =>{
            alert("serveur indisponible")
            console.log(erreur);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
        }) 
        console.log(this.state.clog)
        e.preventDefault()
    }
    

    render() {
        return <div className = "cont">
            <div className = "container-form">
                <h1>INSCRIPTION</h1>
                <form className = "formulaire">
                    <label>Login</label><input type = 'text' name = 'userLogin' onChange = {this.handleChange} /><br/>
                    <label>password</label><input  type = 'password' name = 'userPassWord' onChange = {this.handleChange} /><br/>
                    <label>nom Agent</label><input type = 'text' name = 'agentName' onChange = {this.handleChange} /><br/>
                    <label>mail</label><input  type = 'email' name = 'agentEmail'  onChange = {this.handleChange} /><br/>

                    <button className = "validate" type = "submit" onClick = {this.handleSubmit}>Envoyer</button>
                </form>
            </div>
        </div>
    }

}

export default Signup
