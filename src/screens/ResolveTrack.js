import React, { useContext, useEffect } from "react";
import { Context as TrackContext } from "../context/TrackContext";
import { ActivityIndicator } from "react-native";

const ResolveTrackScreen = () => {
  const { fetchTracks } = useContext(TrackContext);
  useEffect(() => {
    fetchTracks();
  }, []);
  return (
    <ActivityIndicator
      size="large"
      style={{ flexDirection: "row", justifyContent: "space-around", flex: 1 }}
      color="#067bef"
    />
  );
};

export default ResolveTrackScreen;
