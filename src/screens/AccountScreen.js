import React, { useContext } from "react";
import { StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-navigation";
import Spacer from "../components/spacer";
import { Context as AuthContext } from "../context/AuthContext";
import UpdateButton from "../components/updatebutton";
import ShowButton from "../components/showbutton";
import { navigate } from "../navigationRef";

/*
	we can use this to make sure that our content always be inside the dispaly screen
	import SafeAreaView from "react-navigation"
	<SafeAreaView forceInset={{top:'always'}}>
*/
const AccountScreen = () => {
  const { signout, state } = useContext(AuthContext);
  return (
    <SafeAreaView forceInset={{ top: "always" }} style={{ marginBottom: 20 }}>
      <Text style={styles.text_container}> AccountScreen</Text>
      <Spacer />
      <ShowButton title="Username:" value={state.username} width={33}/>
      <ShowButton title="Email:" value={state.email} bottomDivider={true} width={20} />
      <UpdateButton
        title="Change Username"
        callback={() => {
          navigate("ChangeUsername");
        }}
      />
      <UpdateButton
        title="Change Password"
        callback={() => {
          navigate("ChangePassword", { page: "Account" });
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

AccountScreen.navigationOptions = { headerShown: false };

export default AccountScreen;
