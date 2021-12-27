import React, { useContext, useState } from "react";
import { Button, Input, Text } from "react-native-elements";
import { View, StyleSheet } from "react-native";
import Spacer from "./spacer";
import { Context as LocationContext } from "../context/LocationContext";
import useSaveTrack from "../hooks/useSaveTrack";

const TrackForm = () => {
  const {
    state: { name, recording, locations },
    startRecording,
    stopRecording,
    changeName,
  } = useContext(LocationContext);
  const [error, setError] = useState("");
  const [saveTrack] = useSaveTrack();
  return (
    <View>
      <Spacer>
        <Input
          placeholder="Enter name"
          value={name}
          onChangeText={(text) => changeName(text)}
        />
        {error ? (
          <>
            <Text style={styles.errorMessage}>{error}</Text>
            <Spacer />
          </>
        ) : null}
        {recording ? (
          <Button title="Stop Recording" onPress={stopRecording} />
        ) : (
          <Button title="Start Recording" onPress={startRecording} />
        )}
      </Spacer>
      <Spacer>
        {!recording && locations.length ? (
          <Button
            title="Save"
            onPress={() => {
              name ? saveTrack() : setError("Enter name of the track.");
            }}
          />
        ) : null}
      </Spacer>
    </View>
  );
};

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: 16,
    color: "red",
    paddingLeft: 10,
  },
});

export default TrackForm;
