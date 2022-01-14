import React, { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  StyleSheet,
  Platform,
  StatusBar
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "../components/spacer";
import { Context as AuthContext } from "../context/AuthContext";

const ChangeUsernameScreen = () => {
  const [username, setUsername] = useState("");
  const { state, changeUsername } = useContext(AuthContext);
  const input = React.createRef();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <SafeAreaView forceInset={{ top: "always" }} style={{paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}}>
          <View style={styles.container}>
            <Spacer>
              <Text style={styles.textContainer}>
                Change Username For Tracker
              </Text>
            </Spacer>
            <Spacer />
            <Input
              label="Username"
              placeholder="Enter the new username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
              autoCorrect={false}
              ref={input}
              errorMessage={state.errorMessage}
              errorStyle={styles.errorMessage}
            />
            <Spacer>
              <Button
                title="Proceed"
                onPress={() => {
                  changeUsername(username, state.email, input.current.shake);
                }}
              />
            </Spacer>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

ChangeUsernameScreen.navigationOptions = { headerShown: false };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: "center",
    marginBottom: 5,
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
  },
  textContainer: {
    color: "#067bef",
    fontSize: 24,
    textAlign: "center",
  },
});

export default ChangeUsernameScreen;
