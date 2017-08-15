import React from 'react';
import { withGoogleMap, GoogleMap, Marker, DirectionsRenderer } from "react-google-maps";

const GoogleMapHOC = withGoogleMap(props => (
  //higher order component for creating the GoogleMap
  //loops through the response data to create a map marker for each location
  //if a marker is clicked on it renders directions between all markers previous to the
  //targetMarker
  <GoogleMap
    ref={props.onMapLoad}
    zoom={props.zoom}
    center={{lat: props.lat, lng: props.lng}}
  >
    {props.markers.map((marker, i) => {
      const { longitude, latitude } = marker._embedded.venues[0].location;
      let position = {lat: parseFloat(latitude), lng: parseFloat(longitude)};
      return (
        <Marker
          position={position}
          key={i}
          defaultAnimation={2}
          onClick={() => props.onMarkerClick(marker)}
        />
      )}
    )}
    {props.directions && <DirectionsRenderer directions={props.directions} />}
  </GoogleMap>
));

export default GoogleMapHOC;
