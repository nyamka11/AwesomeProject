import React, {useState, useEffect } from 'react';
import {View, Text, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

// const initialState = {
//     latitude: null,
//     longitude: null,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421
// }

const MapGps =()=>  {
    const [curentPosition, setCurentPosition] = useState(initialState);


    useEffect(()=>  {
      navigator.geolocation.getCurrentPosition(position => {
        const { longitude, latitude } = position.coords;
        setCurentPosition({
            // ...curentPosition,
            latitude,
            longitude,
        })
      },
        error => alert(error.message),
        { timeout: 20000, maximumAge: 1000 }
        
      )
    },[])

    return(
        <MapView
            provider={PROVIDER_GOOGLE}
            style={{ flex: 1 }}
            // initialRegion={curentPosition}
        />
    );
};

export default MapGps;