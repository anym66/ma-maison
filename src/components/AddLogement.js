import react, {Component} from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import '../form.css'


class AddLogement extends Component {

    constructor(props) {
        super(props)

        this.state = {
            clog : {
                roomStateName :  "verifier",
                imageLink : null,
                bedroomNumber : 1,
                cookedNumber :  1,
                showerNumber  : 1,
                livingRoomNumber : 1, 
                rentCost :  1,
                roomName : 'appartement6878',
                roomCategory: {
                },
                roomDaCreated: "2021-04-15T09:42:31.173Z"
              },
              images : [],
              imagesIsOk : false,
              clogImageUpload : []
            }
        }
      
    

    handleChange = (e) => {
        console.log(this.state.clog)
        let clogTemp = this.state.clog

        clogTemp[e.target.name] = e.target.value
        this.setState(
            {
                clog : clogTemp
            }
        )
        //console.log(this.state.clog)
    }

    handleChangeImage=(e) =>{

        let imageTemp = URL.createObjectURL(e.target.files[0])
        let imageUpTemp = e.target.files[0]
        this.setState({
            images : [...this.state.images, imageTemp],
            clogImageUpload : [...this.state.clogImageUpload, imageUpTemp]
            
        })   
        console.log(imageTemp)  
      }

    handleSubmit = (e) => {
        console.log(this.state.clog, this.state.clogImageUpload)

        const formData = new FormData()
        formData.append('file', this.state.clogImageUpload[0])
        formData.append('upload_preset', 'yaya12')

        const option = {
            method : 'POST',
            body : formData,
        }

        axios.post(`https://api.cloudinary.com/v1_1/dbcjapvf8/image/upload`,  formData)
        .then(res => {
          console.log(res.data);
          let temp = this.state.clog
          temp['roomStateName'] = res.data.url
          this.setState({ clog : temp })
        }).catch(erreur =>{
          alert("serveur indisponible")
          console.log(erreur);
      });

      

      axios.post(`https://mamaison.arenaplaza.site/api/Room/CreatedRoom`,  this.state.clog )
        .then(res => {
            console.log(res.data)
           //this.setState({ clog : res.data})
        }).catch(erreur =>{
            alert("serveur indisponible")
            console.log(erreur);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
        }) 
        console.log(this.state.clog)
        e.preventDefault() 

        
    }

        
    

    componentDidMount() {
        axios.get('https://mamaison.arenaplaza.site/api/Room/GetRoomList')
          .then(res => {
            const persons = res.data;
            console.log(persons)
            //this.setState({ persons });
          }).catch(error => {
              alert("serveur indisponible")
          })
      }

    render() {

        return(
            <div>
                <div className = "myContainer">
                    <img src = "/images/maisonPlaint.jpg" />
                </div>
                <div>
                <form onSubmit= {this.handleSubmit}>
                    <div>
                        <label>Type</label>
                        <select name = 'roomName' onChange = {this.handleChange} value = {this.state.clog['roomName']}>
                            <option value = 'studio'>Studio</option>
                            <option value = 'appartement'>Appartement</option>
                            <option value = 'chambre'>Chambre</option>
                            <option value = 'villa'>Villa</option>
                        </select>
                    </div>

                    <div>
                        <label>Nombre de Salon</label>
                        <input type = 'number' name = 'livingRoomNumber' onChange = {this.handleChange} value = {this.state.clog['livingRoomNumber']} min = "0" max = "5" />
                    </div>
                    <div>
                        <label>Nombre de Cuisine</label>
                        <input type = 'number' name = 'cookedNumber' onChange = {this.handleChange} value = {this.state.clog['cookedNumber']}  min = "0" max = "5" />
                    </div>
                    <div>
                        <label>Nombre de Douche</label>
                        <input type = 'number'  name = 'showerNumber' onChange = {this.handleChange} value = {this.state.clog['showerNumber']} min = "0" max = "5" />
                    </div>
                    <div>
                        <label>Nombre de Chambre</label>
                        <input type = 'number'  name = 'bedroomNumber' onChange = {this.handleChange} value = {this.state.clog['bedroomNumber']}  min = "0" max = "10" />
                    </div>
                    <div>
                        <label>Loyer</label>
                        <input type = 'number' name = "rentCost" onChange = {this.handleChange} value = {this.state.clog['rentCost']}  min = "0" max = "100000"/>
                    </div>
                    <div>
                        <label>Etat</label>
                        <select name = 'roomStateName'  onChange = {this.handleChange} value = {this.state.clog['roomStateName']}>
                            <option value = 'disponible'>Disponible</option>
                            <option value = 'verifier'>Verifier</option>
                            <option value = 'indisponible'>Indisponible</option>
                        </select>
                    </div>
                    <div>
                        <label>Entrer 4 photos de votre appartement</label> <br/>
                        <input type = 'file'  accept = "image" onChange = {this.handleChangeImage} disabled = {this.state.images.length === 4
                    } />
                        {
                            this.state.images.map((url, i) => {
                                return <div key = {i}>
                                    <button className = "btn btn-danger" onClick = {() => {
                                        this.setState(state => this.state.images.splice(i, 1))
                                    }}>X</button>
                                    <img src = {url} width = "120px" height = "60px" />
                                </div>
                            })
                        }
                    </div>
                    <input type="submit" value="Envoyer" onChange = {this.handleSubmit} />
                </form>
            </div>
            </div>
        )

    }
}

export default AddLogement