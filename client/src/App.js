import React, {Component} from "react";
import MyMapComponent from "./MyMapComponent"
import List from "./components/List/List"
import API from "./API/API";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            placesToGo: [],
            term: "",
            longitude: "",
            latitude: "",
            typeOfActivity: ""
        }
        this.showPosition = this
            .showPosition
            .bind(this)
    }

    componentDidMount() {
        // this.fetchCityData()
        this.getLocation()
        this.getMongoData()
    }
    getMongoData() {
        API
            .getData()
            .then(res => console.log(res))
    }
    fetchCityData(term) {
        fetch(`https://developers.zomato.com/api/v2.1/cities?q=old%20bridge`, {
            headers: {
                "user-key": "0682b996c90e314acfeaf5a14bec9cbb"
            }
        }).then(results => {
            return results.json()
        }).then(data => {
            // this.setState({restuarants: data.restaurants})
            console.log(data)
        })
    }

    fetchThingsToDo() {
        fetch(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.state.latitude},${this.state.longitude}&radius=8046&type=${this.state.typeOfActivity}&key=AIzaSyCS5o2kc-8RX4Zr5AoXrNQdAErazOeF_Ug`).then(results => {
            return results.json()
        }).then(data => {
            this.setState({placesToGo: data.results})
            console.log(data)
        })
    }

    showPosition(position) {
        this.setState({longitude: position.coords.longitude, latitude: position.coords.latitude})
    }

    getLocation() {
        if (navigator.geolocation) {
            navigator
                .geolocation
                .getCurrentPosition(this.showPosition)
        }
    }

    handleInputChange = event => {
        const {value, name} = event.target
        this.setState({[name]: value})
    }
    handleFormSubmit = event => {
        event.preventDefault();
        this.fetchThingsToDo()
    }
    render() {
        const style = {
            height: "30px"
        }
        return (
            <div style={{
                textAlign: "center"
            }}>
                <h1>What do you wanna do?</h1>
                <form>
                    <input
                        style={style}
                        type="text"
                        value={this.state.term}
                        name="term"
                        onChange={this.handleInputChange}/>
                    <select style={style} onChange={this.handleInputChange} name="typeOfActivity">
                        <option value="restaurant">Restaurant</option>
                        <option value="movie_theater">Movie Theater</option>
                        <option value="amusement_park">Amusement Park</option>
                        <option value="bar">Bar</option>
                    </select>
                    <button style={style} onClick={this.handleFormSubmit}>Submit</button>
                </form>
                <MyMapComponent
                    isMarkerShown
                    markerData={this.state.placesToGo}
                    longitude={this.state.longitude}
                    latitude={this.state.latitude}
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={< div style = {{ height: `100%` }}/>}
                    containerElement={< div style = {{ height: `400px`, width:"600px", margin: "20px auto" }}/>}
                    mapElement={< div style = {{ height: `100%`, width:"600px" }}/>}/> {!this.state.placesToGo
                    ? "Pick something you'd like to do"
                    : <List places={this.state.placesToGo}/>}
            </div>
        )
    }
}
export default App;