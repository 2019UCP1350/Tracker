import React, { useContext } from "react";
import { StyleSheet, ActivityIndicator } from "react-native";
import MapView, { Polyline, Circle } from "react-native-maps";
import { Context as LocationContext } from "../context/LocationContext";

const Map = () => {
  const {
    state: { currentLocation, locations },
  } = useContext(LocationContext);

  if (!currentLocation) {
    return <ActivityIndicator size="large" style={{ marginTop: 200 }} />;
  }
  /*region={{
				...currentLocation.coords,
				latitudeDelta:0.001,
				longitudeDelta:0.001,
			}}
		this code can be used to to center the position of the map to use currentLocation
	*/
  return (
    <MapView
      style={{ height: 300 }}
      initialRegion={{
        ...currentLocation.coords,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      }}
    >
      <Circle
        center={currentLocation.coords}
        radius={10}
        strokeColor="rgba(158,158,255,1.0)"
        fillColor="rgba(158,158,255,0.5)"
      />
      <Polyline coordinates={locations.map((loc) => loc.coords)}></Polyline>
    </MapView>
  );
};

const styles = StyleSheet.create({});

export default Map;
