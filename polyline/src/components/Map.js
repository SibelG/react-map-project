
import React, { Component } from 'react'
import GoogleMap from 'google-map-react'
import Marker from './Map/Marker'
import Polyline from './Map/Polyline'
import axios from 'axios'

var moment = require('moment');

class Map extends Component {
  constructor (props) {
    super(props)

    this.state = {
      mapsLoaded: false,
      map: null,
      maps: null,
      list:[],
      query1:[],
      query2:[],
      query3:[],
      dest:[],
      OriginLat:null,
      OriginBorough:null,
      DestBorough:null,
      OriginLot:null,
      DestLat:null,
      DestLot:null,
      markers:[]
     
    }

    this.componentDidmount()
    {this.state.mapsLoaded ? this.afterMapLoadChanges() : ''}

  
    
  }
       
    
  


  componentDidmount(){
    
    
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
         /*this.setState({ markers: [
    {lat: 53.42728, lng: -6.24357},
    {lat: 43.681583, lng: -79.61146}
  ]})*/
      
        
        console.log(this.state.dest)
        
 
    })
    .catch((error) => {
       console.error(error);
    })
    

     axios.get('http://localhost:5000/api/getList1')
    .then(response=>response.data)

    .then((data)=>{
      this.setState({query1:data})
      console.log(this.state.query1)
    

    })
    axios.get('http://localhost:5000/api/getList2')
    .then(response=>response.data)

    .then((data)=>{
      this.setState({query2:data})
      console.log(this.state.query2)
    

    })
    axios.get('http://localhost:5000/api/getList3')
    .then(response=>response.data)

    .then((data)=>{
      this.setState({query3:data})
      console.log(this.state.query3)
    

    })
 
    
  
   
  }
  
  
   

  onMapLoaded (map, maps) {
this.fitBounds(map, maps)

    this.setState({

      ...this.state,
      mapsLoaded: true,
      map: map,
      maps: maps
     
     
      
      //obj:obj
    })
  }

  fitBounds (map, maps) {

    var bounds = new maps.LatLngBounds()
    for (let marker of this.state.markers) {
      bounds.extend(
        new maps.LatLng(marker.lat, marker.lng)
      )
    }
    map.fitBounds(bounds)
  }

  afterMapLoadChanges () {
   
    return (
      <div style={{display: 'none'}}>
        <Polyline
          map={this.state.map}
          maps={this.state.maps}
          markers={this.state.markers} />
      </div>
    )
  }

  render () {
  const {list}=this.state;

    
  return(
      
      <GoogleMap
      
        bootstrapURLKeys={{key: 'AIzaSyDBPqIzL3Lq0RVizHx67JEbv5Cdo0IOnWA'}}
        style={{height: '100vh', width: '100%'}}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
        onGoogleApiLoaded={({map, maps}) => this.onMapLoaded(map, maps)}>
        
        <Marker text={this.state.OriginBorough} lat={this.state.OriginLat} lng={this.state.OriginLot} />
        <Marker text={this.state.DestBorough} lat={this.state.DestLat} lng={this.state.DestLot} />
        {this.state.mapsLoaded ? this.afterMapLoadChanges() : ''}
      </GoogleMap>
     
    
    )
   
  }
}
Map.defaultProps = {

  center: [47.367347, 8.5500025],
  zoom: 4
}

export default Map;