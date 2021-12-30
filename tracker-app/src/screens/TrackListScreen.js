import React, { useContext, useState } from "react";
import {
  StyleSheet,
  FlatList,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { ListItem, Button } from "react-native-elements";
import { Context as TrackContext } from "../context/TrackContext";
import { navigate } from "../navigationRef";

const TrackListScreen = () => {
  const { state, deleteTrack } = useContext(TrackContext);
  const [loading, setLoading] = useState(false);
  const delTrack = (name, id) => {
    Alert.alert(
      `Do you want to delete ${name} ?`,
      "Removing this will delete the track permentaly.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "OK",
          onPress: () => {
            setLoading(true);
            deleteTrack(id, setLoading);
          },
        },
      ]
    );
  };
  return (
    <SafeAreaView forceInset={{ top: "always" }} style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator
          size="large"
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            flex: 1,
          }}
        />
      ) : (
        <FlatList
          data={state}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            return (
              <ListItem.Swipeable
                onPress={() => {
                  navigate("TrackDetail", { _id: item._id });
                }}
                bottomDivider
                leftContent={
                  <Button
                    title="Info"
                    icon={{ name: "info", color: "white" }}
                    buttonStyle={{ minHeight: "100%" }}
                    onPress={() => {
                      navigate("TrackDetail", { _id: item._id });
                    }}
                  />
                }
                rightContent={
                  <Button
                    title="Delete"
                    icon={{ name: "delete", color: "white" }}
                    buttonStyle={{ minHeight: "100%", backgroundColor: "red" }}
                    onPress={() => {
                      delTrack(item.name, item._id);
                    }}
                  />
                }
              >
                <ListItem.Content>
                  <ListItem.Title style={styles.ListStyle}>
                    {item.name}
                  </ListItem.Title>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem.Swipeable>
            );
          }}
        />
      )}
    </SafeAreaView>
  );
};
TrackListScreen.navigationOptions = { title: "Tracks" };
const styles = StyleSheet.create({
  ListStyle: {
    fontSize: 24,
  },
});

export default TrackListScreen;
