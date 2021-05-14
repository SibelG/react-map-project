import React from 'react'
import  { compose, withProps, lifecycle } from 'recompose'
import {withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer} from 'react-google-maps'


class RouteDrawing extends React.Component {
  constructor(props){
    super(props)
    this.state={
        list:[],
        dest:[],
        OriginLat:null,
        OriginBorough:null,
        DestBorough:null,
        OriginLot:null,
        DestLat:null,
        DestLot:null
    }
  }
render() {
    const DirectionsComponent = compose(
      withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDBPqIzL3Lq0RVizHx67JEbv5Cdo0IOnWA&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `400px` }} />,
        containerElement: <div style={{ width: `100%` }} />,
        mapElement: <div style={{height: `100vh`, width: `100%` }}  />,
      }),
      withScriptjs,
      withGoogleMap,
      lifecycle({
        componentDidMount() { 
          fetch('http://localhost:5000/api/getList6', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
       }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      
        this.setState({ list: responseJson })
        this.setState({OriginLat:Object.values(this.state.list)[0]["latitude"]})
        this.setState({OriginLot:Object.values(this.state.list)[0]["longitude"]})
        this.setState({OriginBorough:Object.values(this.state.list)[0]["Borough"]})
        console.log(this.state.OriginLat)
        console.log(this.state.OriginLot)
        console.log(this.state.list)
        
       
        

    })
    .catch((error) => {
       console.error(error);
    })
    fetch('http://localhost:5000/api/getList7', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
       }
    })
    .then((response) => response.json())
    .then((responseJson) => {
      
        this.setState({ dest: responseJson })
        this.setState({DestLat:Object.values(this.state.dest)[0]["latitude"]})
        this.setState({DestLot:Object.values(this.state.dest)[0]["longitude"]})
        this.setState({DestBorough:Object.values(this.state.dest)[0]["Borough"]})
        console.log(this.state.DestLat)
        console.log(this.state.DestLot)
        this.setState({markers:[{lat:this.state.OriginLat,lng:this.state.OriginLot},
        {lat:this.state.DestLat,lng:this.state.DestLot}]})

      
        
        console.log(this.state.dest)
        
 
    })
    .catch((error) => {
       console.error(error);
    })
          const DirectionsService = new window.google.maps.DirectionsService();
          DirectionsService.route({
            origin: new window.google.maps.LatLng(this.state.OriginLat, this.state.OriginLot),
            destination: new window.google.maps.LatLng(this.state.DestLat, this.state.DestLot),
            travelMode: window.google.maps.TravelMode.DRIVING,
          }, (result, status) => {
            if (status === window.google.maps.DirectionsStatus.OK) {
this.setState({
                directions: {...result},
                markers: true
              })
            } else {
              console.error(`error fetching directions ${result}`);
            }
          });
        }
      })
    )(props =>
      <GoogleMap
        defaultZoom={3}
      >
        {props.directions && <DirectionsRenderer directions={props.directions} suppressMarkers={props.markers}/>}
      </GoogleMap>
    );
return (
        <DirectionsComponent
        />
    )
  }
}
export default RouteDrawing;