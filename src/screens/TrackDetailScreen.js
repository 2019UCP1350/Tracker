import React, { useContext, useRef } from "react";
import { Share, StyleSheet, Text, Alert } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Context as TrackContext } from "../context/TrackContext";
import { Button } from "react-native-elements";
import MapView, { Polyline, Marker } from "react-native-maps";
import Spacer from "../components/spacer";
import { isAvailableAsync, shareAsync } from "expo-sharing";
import * as FileSystem from "expo-file-system";

const TrackDetailScreen = ({ navigation }) => {
  const { state } = useContext(TrackContext);
  const _id = navigation.getParam("_id");
  const track = state.find((t) => t._id === _id);
  const initialCoords = track.locations[0].coords;
  let map = useRef(null);
  const myCustomShare = async () => {
    try {
      let uri = await map.current.takeSnapshot({
        format: "png",
        result: Platform.OS === "ios" ? "file" : "base64", // result types: 'file', 'base64' (default: 'file')
      });
      if (!(await isAvailableAsync())) {
        Alert.alert(`Uh oh, sharing isn't available on your platform`);
        return;
      }
      if (Platform.OS === "ios") {
        uri = "file://" + uri;
        await shareAsync(uri);
      } else {
        let filename = "share.gif"; // or some other way to generate filename
        let filepath = `${FileSystem.documentDirectory}/${filename}`;
        await FileSystem.writeAsStringAsync(filepath, uri, {
          encoding: "base64",
        });
        await shareAsync(filepath, { mimeType: "image/gif" });
      }
    } catch (error) {
      console.log("Error in creating snapshot of map", error);
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
        <Polyline
          coordinates={track.locations.map((loc) => loc.coords)}
          strokeColor="#067bef"
          lineJoin="round"
        />
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
            myCustomShare();
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
