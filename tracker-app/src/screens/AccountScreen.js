import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-navigation";
import { Button, ListItem } from "react-native-elements";
import Spacer from "../components/spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";

/*
	we can use this to make sure that our content always be inside the dispaly screen
	import SafeAreaView from "react-navigation"
	<SafeAreaView forceInset={{top:'always'}}>
*/
const AccountScreen = () => {
  const { signout } = useContext(AuthContext);
  return (
    <SafeAreaView forceInset={{ top: "always" }} style={{ marginBottom: 20 }}>
      <Text style={styles.text_container}> AccountScreen</Text>
      <Spacer />
      <ListItem bottomDivider topDivider>
        <ListItem.Title>HI</ListItem.Title>
      </ListItem>
      <ListItem>
        <Button
          title="Sign Out"
          onPress={() => {
            signout();
          }}
        />
      </ListItem>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text_container: {
    fontSize: 48,
    textAlign: "center",
  },
});

AccountScreen.navigationOptions = {
  title: "Account",
  tabBarIcon: <MaterialIcons name="switch-account" size={24} color="black" />,
};

export default AccountScreen;
