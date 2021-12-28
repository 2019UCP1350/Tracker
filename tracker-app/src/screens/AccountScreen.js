import React, { useContext } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-navigation";
import Spacer from "../components/spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { MaterialIcons } from "@expo/vector-icons";
import UpdateButton from "../components/updatebutton";
import ShowButton from "../components/showbutton";

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
      <ShowButton title="Username:" value="RandomUser" />
      <ShowButton title="Email" value="RandomEmail" bottomDivider={true} />
      <UpdateButton
        title="Change Username"
        callback={() => {
          console.log("HI from user");
        }}
      />
      <UpdateButton
        title="Change Email"
        callback={() => {
          console.log("HI from Email");
        }}
      />
      <UpdateButton
        title="Change Password"
        callback={() => {
          console.log("HI from Password");
        }}
      />
      <UpdateButton title="Sign Out" callback={signout} />
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