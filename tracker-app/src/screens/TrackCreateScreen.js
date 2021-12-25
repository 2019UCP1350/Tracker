import "./_mocklocation";
import React, { useContext, useCallback } from "react";
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Text } from "react-native-elements";
import { SafeAreaView, withNavigationFocus } from "react-navigation";
import Map from "../components/Map";
import { Context as LocationContext } from "../context/LocationContext";
import useLocation from "../hooks/useLocation";
import TrackForm from "../components/TrackForm";
import { AntDesign } from "@expo/vector-icons";

const TrackCreateScreen = withNavigationFocus(({ isFocused }) => {
  const {
    state: { recording },
    addLocation,
  } = useContext(LocationContext);
  const callback = useCallback(
    (location) => {
      addLocation(location, recording);
    },
    [recording]
  );
  const [err] = useLocation(isFocused || recording, callback);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
		<ScrollView>
			<SafeAreaView forceInset={{ top: "always" }} style={{marginBottom:20}}>
				<Text h2 style={{ textAlign: "center"}}>
					Create Track
				</Text>
				<Map />
				<Text style={styles.text_container}>{err}</Text>
				<TrackForm />
			</SafeAreaView>
		</ScrollView>
    </KeyboardAvoidingView>
  );
});

const styles = StyleSheet.create({
  text_container: {
    textAlign: "center",
  },
});
TrackCreateScreen.navigationOptions = {
  title: "Add Track",
  tabBarIcon: <AntDesign name="plus" size={24} color="black" />,

};

export default TrackCreateScreen;
