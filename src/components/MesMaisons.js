import React, {Component} from 'react'
import MaMaison from './MaMaison'
import 'antd/dist/antd.css'
import {Pagination} from 'antd'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'


class MesMaisons extends Component {

    constructor(props) {
        super(props)
        this.state = {
            number : 8,
            currentPage : 1,
            log : [      
            ]
        }   
       this.handleChange = this.handleChange.bind(this)        
    }

    handleChange(e) {
        this.setState(
            { 
                number : parseInt(e.target.value),
                currentPage : 1
            }
            )
    }
    selectHandleChange = value => {
        this.setState({
          currentPage: value
        });
      };
  
      componentDidMount() {
        axios.get('https://mamaison.arenaplaza.site/api/Room/GetRoomList')
          .then(res => {
            const listLogement = res.data;
            this.setState({ log : listLogement });
          }).catch(error => {
              alert("serveur indisponible")
          })

          console.log(this.props.favoritesLog)
      }
    


    render() {

        const indexOfLastLog = this.state.currentPage * this.state.number;
        const indexOfFirstLog = indexOfLastLog - this.state.number

        console.log(this.state.log)

        return (
            <div>
                <h1 className = "title">GESMAIS<span>O</span>N</h1>
                <p className="commentaire">Consulter le site pour acheter la maison de vos rêves</p>
                <div className = "container"> 
                { 
                    this.state.log.slice(this.state.log.length -25, this.state.log.length).slice(indexOfFirstLog, indexOfLastLog).map((data) => {
                        return <MaMaison  idLoge = {data.id} salon = {data.roomName} image = {data.photo} name = {data.roomName} douche = {data.showerNumber} chambre = {data.bedroomNumber} cuisine = {data.cookedNumber} price = {data.rentCost} statut = {data.roomStateName} house = {data} isFavoriteLog = { (this.props.favoritesLog.findIndex(item => item.id === data.id) === -1)?false:true} />
                    })
                }
                </div>

                <div className="pagination_div">
                <Pagination
                    defaultCurrent={this.state.currentPage}
                    defaultPageSize={this.state.number} 
                    pageSize={this.state.number}
                    onChange={this.selectHandleChange}
                    total={this.state.log.length > 0 && this.state.log.length - (this.state.log.length - 25)}
                />
                </div>

                <select value = {this.state.number} onChange = {this.handleChange} >
                    <option value = '4' >4</option>
                    <option value = '6' >6</option>
                    <option value = '8' >8</option>
                </select>
            </div>
        )
    }
}
//export default MesMaisons

const mapStateToProps = state => {
    return {
      favoritesLog:state.favoritesLog
    };
  };
  export default connect(mapStateToProps)(MesMaisons)
