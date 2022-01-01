import React, { useContext, useState } from "react";
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { Text, Input, Button } from "react-native-elements";
import Spacer from "../components/spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { navigate } from "../navigationRef";

const RegisteredEmailScreen = () => {
  const [email, setEmail] = useState("");
  const { state, checkUser, error } = useContext(AuthContext);
  const input = React.createRef();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <SafeAreaView forceInset={{ top: "always" }}>
          <View style={styles.container}>
            <Spacer>
              <Text style={styles.textContainer}>
                Change Password For Tracker
              </Text>
            </Spacer>
            <Spacer />
            <Input
              label="Email"
              placeholder="Enter the registered Email"
              value={email}
              onChangeText={setEmail}
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
                  checkUser(email, input.current.shake);
                }}
              />
            </Spacer>
            <TouchableOpacity
              onPress={() => {
                navigate("Signin");
                error("");
              }}
            >
              <Spacer>
                <Text
                  style={{
                    ...styles.textContainer,
                    fontSize: 18,
                    color: "blue",
                  }}
                >
                  Want to go back?
                </Text>
              </Spacer>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

RegisteredEmailScreen.navigationOptions = { headerShown: false };

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

export default RegisteredEmailScreen;
