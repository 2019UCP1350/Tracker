import React, { useContext,useState ,useRef} from "react";
import { Share, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Context as TrackContext } from "../context/TrackContext";
import { Button } from "react-native-elements";
import MapView, { Polyline, Marker } from "react-native-maps";
import Spacer from "../components/spacer";

const TrackDetailScreen = ({ navigation }) => {
  const { state } = useContext(TrackContext);
  const [mapImage,setMapImage]=useState('');
  const _id = navigation.getParam("_id");
  const track = state.find((t) => t._id === _id);
  const initialCoords = track.locations[0].coords;
  let map=useRef(null);
  const myCustomShare=async ()=>{
    const snapshot =map.current.takeSnapshot({
      format:'png',
      result: 'file'   // result types: 'file', 'base64' (default: 'file')
    });
    snapshot.then((uri) => {
      setMapImage(uri);
    },(error)=>{
      console.log("Error in creating snapshot of map",error);
    });
    try{
      const response=await Share.share({
        title:track.name,
        url:mapImage
      },);
    }catch(error){
      console.log("Error while Sharing",error);
    }
  };
  return (
    <SafeAreaView forceInset={{ Top: "always" }}>
      <MapView
        initialRegion={{
          longitudeDelta: 0.001,
          latitudeDelta: 0.001,
          ...initialCoords,
        }}
        style={styles.map}
        ref={map}
      >
        <Polyline coordinates={track.locations.map((loc) => loc.coords)} />
        <Marker
          coordinate={track.locations[0].coords}
          title="Start Location"
          pinColor="#067bef"
        />
        <Marker
          coordinate={track.locations[track.locations.length - 1].coords}
          title="End Location"
          pinColor="#067bef"
        />
      </MapView>
      <Spacer />
      <Text style={styles.textContainer}>{track.name}</Text>
      <Spacer>
        <Button
          title="Share"
          icon={{
            name: "share",
            type: "font-awesome",
            size: 20,
            color: "white",
          }}
          containerStyle={{
            flexDirection: "row",
            alignSelf: "center",
          }}
          iconRight={true}
          titleStyle={{
            fontSize: 26,
            padding: 10,
          }}
          onPress={() => {
            myCustomShare()
          }}
        />
      </Spacer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  map: {
    height: 300,
  },
  textContainer: { fontSize: 48, textAlign: "center", color: "#067bef" },
});

export default TrackDetailScreen;
