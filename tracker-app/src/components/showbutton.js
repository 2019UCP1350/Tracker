import React from "react";
import { ListItem } from "react-native-elements";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";

const ShowButton = ({ title, value, bottomDivider }) => {
  return (
    <ListItem topDivider bottomDivider={bottomDivider}>
      <View style={styles.container}>
        <View>
          <Text style={{ fontSize: 22, paddingRight: 5 }}>{title}</Text>
        </View>
        <View>
          <Text style={{ fontSize: 22, paddingLeft: 5 }}>{value}</Text>
        </View>
      </View>
    </ListItem>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default ShowButton;
