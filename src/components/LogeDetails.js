import react, {Component} from 'react'
import axios from 'axios'
import { connect } from 'react-redux'


class LogeDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id : null,
            data : {

            },
        }

    }


    handleFavoritelog=() =>{
        this.setState({
          isFavoriteLog: !this.state.isFavoriteLog
        });
        const action = { type: "TOGGLE_FAVORITE", value: this.state.data };
        this.props.dispatch(action);
        console.log(this.props)
      
    }

    componentDidMount() {

        const dataId = parseInt(this.props.match.params.idLoge)
        axios.get("https://mamaison.arenaplaza.site/api/Room/GetRoomDetail/"+dataId).then(res => {
        const logementInfos = res.data;
        this.setState({data : logementInfos})
        console.log(logementInfos)
    })

    const favoriteLogIndex = this.props.favoritesLog.findIndex(item => item.id === dataId)
    if (favoriteLogIndex !== -1) {
        this.setState({isFavoriteLog : true})
    }
    else {
        this.setState({isFavoriteLog : false})
    }
}
    
    render() {

         
        return (
            <div>
                <h1>Ma Maison</h1>
                <div  className = "card shadow-sm">
                    <img src = {this.state.data.photo} className = "bd-placeholder-img card-img-top" width="auto" height="200"  />
                    <div className = "card-body" >
                    <h2 className = 'little-title'>{this.state.data.roomName}</h2>
                    <p className = 'paraLab' >Nombre de douches :{this.state.data.showerNumber} <label className = 'labProps' ></label></p>
                    <p className = 'paraLab' >Nombre de chambres : {this.state.data.bedroomNumber} <label className = 'labProps' ></label> </p>
                    <p className = 'paraLab' >Nombre de cuisine : {this.state.data.cookedNumber} <label className = 'labProps' ></label></p>
                    <p className = 'paraLab' >Prix : {this.state.data.rentCost}<label className = 'labProps' ></label></p>
                    <img src = {this.state.isFavoriteLog?'/images/like.png':'/images/pasLike.png'} onClick = {this.handleFavoritelog} />
                    </div>
                </div>
            </div>
        )
    }
}

//export default LogeDetails

const mapStateToProps = state => {
    return {
      favoritesLog:state.favoritesLog
    };
  };
  export default connect(mapStateToProps)(LogeDetails)
