import React, {Component} from 'react'
import { Link, Redirect } from 'react-router-dom'
import LogeDetails from './LogeDetails'
import datas from './items.js'
import { connect } from 'react-redux'

class MaMaison extends Component {

    constructor(props) {
        super(props)
        this.state = {
            house : this.props.house,
            isFavoriteLog : this.props.isFavoriteLog

        }
    }

    handleFavoritelog=() =>{
        this.setState({
          isFavoriteLog: !this.state.isFavoriteLog
        });
        const action = { type: "TOGGLE_FAVORITE", value: this.props.house };
        this.props.dispatch(action);
        console.log(this.props.favoritesLog)
      
    }

    componentDidMount() {
        console.log(this.props.favoritesLog)
    }
    

    render() {
        
       

        return (
            <div className = 'col'>
                
                 <div  className = "card shadow-sm">
                    <Link to = {`/logedetails/${this.props.idLoge}`}><img src={"https://res.cloudinary.com/dbcjapvf8/image/fetch/w_250/" + this.props.statut}/></Link>
                    <div className = "card-body" >
                    <h2 className = "">{this.props.name}</h2>
                    <p className = 'paraLab' >Nombre de douches : <label className = 'labProps' >{this.props.douche}</label></p>
                    <p className = 'paraLab' >Nombre de chambres : <label className = 'labProps' >{this.props.chambre}</label> </p>
                    <p className = 'paraLab' >Nombre de cuisine : <label className = 'labProps' >{this.props.cuisine}</label></p>
                    <p className = 'paraLab' >Prix :<label className = 'labProps' >{this.props.price} </label></p>
                    {this.props.statut ==='libre'||this.props.statut ==='Disponible'&&<button className = 'btn btn-sm btn-outline-primary'>{this.props.statut}</button>}
                    {this.props.statut ==='occuper'&&<button className = 'btn btn-sm btn-outline-danger' disabled = 'disabled'>{this.props.statut}</button>}
                    {this.props.statut ==='verifier'&&<button className = 'btn btn-sm btn-outline-secondary'>{this.props.statut}</button>}<br/>
                    <img src = {(this.state.isFavoriteLog)?'/images/like.png':'/images/pasLike.png'} onClick = {this.handleFavoritelog} />
                    
                    </div>
                </div>
            </div>
        )
    }
}
//export default MaMaison

const mapStateToProps = state => {
    return {
      favoritesLog:state.favoritesLog
    };
  };
  export default connect(mapStateToProps)(MaMaison)

