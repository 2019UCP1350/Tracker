import React from "react";
import { ListItem } from "react-native-elements";
import { StyleSheet } from "react-native";


const UpdateButton = ({ title, callback }) => {
  return (
    <ListItem
      containerStyle={styles.container}
      onPress={() => {
        callback();
      }}
    >
      <ListItem.Content style={styles.containerContent}>
        <ListItem.Title style={styles.containertitle}>
          {title}
        </ListItem.Title>
      </ListItem.Content>
    </ListItem>
  );
};

const styles=StyleSheet.create({
    container:{
        backgroundColor: "#067bef",
        textAlign: "center",
        marginHorizontal:10,
        marginVertical:7,
      },
    containerContent:{
        flexDirection: "row" 
    },
    containertitle:{
        color: "#FFFFFF", 
        fontSize: 20 
    }
})
export default UpdateButton;
