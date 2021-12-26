import React, { useContext} from "react";
import { StyleSheet, FlatList, SafeAreaView,TouchableOpacity } from "react-native";
import { ListItem, Button } from "react-native-elements";
import { NavigationEvents } from "react-navigation";
import { Context as TrackContext } from "../context/TrackContext";
import { navigate } from "../navigationRef";
const TrackListScreen = () => {
  const { state, deleteTrack } = useContext(TrackContext);
  return (
    <SafeAreaView forceInset={{ top: "always" }} style={{flex:1}}>
      <FlatList
        data={state}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          return (
            <ListItem.Swipeable
              onPress={() => {navigate("TrackDetail", { _id: item._id })}}
              bottomDivider
              leftContent={
                <Button
                  title="Info"
                  icon={{ name: 'info', color: 'white' }}
                  buttonStyle={{ minHeight: '100%' }}
                  onPress={() => {navigate("TrackDetail", { _id: item._id })}}
                />
              }
              rightContent={
                <Button
                  title="Delete"
                  icon={{ name: 'delete', color: 'white' }}
                  buttonStyle={{ minHeight: '100%', backgroundColor: 'red' }}
                  onPress={()=>{deleteTrack(item._id)}}
                />
              }
            >
              <ListItem.Content>
              <ListItem.Title style={styles.ListStyle}>{item.name}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem.Swipeable>
          );
        }}
      />
    </SafeAreaView>
  );
};
TrackListScreen.navigationOptions = { title: "Tracks" };
const styles = StyleSheet.create({
  ListStyle:{
    fontSize:24
  }
});

export default TrackListScreen;
