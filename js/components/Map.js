import _ from "lodash";
import React, { Component } from "react";
import { connect } from 'react-redux';
import { RaisedButton } from 'material-ui';
import GoogleMapHOC from './GoogleMapHOC';

import { showDetails, hideDetails } from '../actions/detailActions';
import ActionButtons from './buttons/actionButtons';

class Map extends Component {
  //state initialization for map center, and direction information
  state = {
    origin: null,
    destination: null,
    directions: null,
    waypoints: [],
    lat: 39.877742,
    lng: -97.380979,
    zoom: 4
  }
  //add event listender to recenter the map when the screen size is changed
  componentWillMount() {
    this.handleResize()
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    this.clearSelected()
  }

  handleResize = () => {
    const width = window.innerWidth;
    this.setState({
      lat: this.state.lat + .000001,
      lng: this.state.lng + .000001
    })
    //change zoom level for smaller screens
    if(width < 780) {
      this.setState({
        zoom: 3
      })
    }
    else {
      this.setState({
        zoom: 4
      })
    }

  }

  handleMapLoad = map => {
    this._mapComponent = map;
  }

  handleMarkerClick = (targetMarker) => {
    this.props.showDetails(targetMarker);
    const { longitude, latitude } = targetMarker._embedded.venues[0].location;
    const { searchResults } = this.props;
    const prevLocations = [];
    this.setState({
      origin: null,
      destination: null,
      directions: null,
      waypoints: []
    })

    //loops through the search results slicing the events from the 1st
    //to whichever was clicked on then pushes the result into the previous
    //locations array as a new google map location to display the directions
    //between each. See getDirections below
    for(var i = 0; i < searchResults.length; i++) {
      if(searchResults[i].id === targetMarker.id && i !== 0 ) {
        const previousEvents = searchResults.slice(1, i);
        previousEvents.map(event => {
          const { latitude, longitude } = event._embedded.venues[0].location;
          prevLocations.push({
            location: new google.maps.LatLng(parseFloat(latitude), parseFloat(longitude)),
            stopover: true
          });
        });
      }
      //creates origin from the latitude and longitude of the 1st element in our searchResults
      //creates destination from the latitude and longitude of the targetMarker
      const originLon = parseFloat(searchResults[0]._embedded.venues[0].location.longitude);
      const originLat = parseFloat(searchResults[0]._embedded.venues[0].location.latitude);
      this.setState({
        origin: new google.maps.LatLng(originLat, originLon),
        destination: new google.maps.LatLng(latitude, longitude),
        waypoints: prevLocations
      });
    }
    this.getDirections();

  }

  getDirections = () => {
    const { origin, destination, waypoints } = this.state;
    //googleMap DirectionsService for displaying driving directions
    //between two given points. waypoints are the show locations in between
    // the origin (1st show) and destination (target show).
    const DirectionsService = new google.maps.DirectionsService();

     DirectionsService.route({
       origin: origin,
       destination: destination,
       waypoints: waypoints,
       travelMode: google.maps.TravelMode.DRIVING,
     }, (result, status) => {
       if (status === google.maps.DirectionsStatus.OK) {
         this.setState({
           directions: result,
         });
       } else {
         console.error(`error fetching directions ${result}`);
       }
     });
  }

  clearSelected = () => {
    //clears selected show and resets directions
    this.setState({
      origin: null,
      destination: null,
      directions: null,
      waypoints: [],
      zoom: 4
    })
    this.props.hideDetails();
  }

  renderSelected = () => {
    //only show selected button if an item is currently selected
    if(this.props.selected) {
      return (
        <RaisedButton
          className='action-btn'
          label='Clear Selected'
          onClick={this.clearSelected}
        />
      )
    }
  }

  render() {
    return (
      <div>
        <div className='map-container'>
          <GoogleMapHOC
            containerElement={
              <div style={{ height: `100%` }} />
            }
            mapElement={
              <div style={{ height: `100%` }} />
            }
            onMapLoad={this.handleMapLoad}
            markers={this.props.searchResults}
            directions={this.state.directions}
            onMarkerClick={this.handleMarkerClick}
            lat={this.state.lat}
            lng={this.state.lng}
            zoom={this.state.zoom}
          />
        </div>
        <ActionButtons pageNumber={this.props.page}>
          {this.renderSelected()}
        </ActionButtons>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { searchResults } = state.data;
  const { selected } = state.event;

  return { searchResults, selected };
}

export default connect(mapStateToProps, { showDetails, hideDetails })(Map);
