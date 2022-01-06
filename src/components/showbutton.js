import React from "react";
import { ListItem } from "react-native-elements";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-elements";

const ShowButton = ({ title, value, bottomDivider, width }) => {
  return (
    <ListItem topDivider bottomDivider={bottomDivider}>
      <View style={styles.container}>
        <Text style={{ fontSize: 22, paddingLeft: 5, width: `${width}%` }}>
          {title}
        </Text>
        <Text
          style={{
            fontSize: 22,
            paddingLeft: 5,
            width: `${100 - width}%`,
          }}
        >
          {value}
        </Text>
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
