import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  Platform
} from "react-native";
import { Input, Text, Button } from "react-native-elements";
import Spacer from "./spacer";

const AuthForm = ({ text, type, state, callback, navigationCallback }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Spacer>
            <Text h3>{type} for Tracker</Text>
          </Spacer>
          <Spacer />
          <Input
            label="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <Input
            label="Password"
            value={password}
            onChangeText={setPassword}
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry
          />
          {state.errorMessage ? (
            <Spacer>
              <Text style={styles.errorMessage}>{state.errorMessage}</Text>
            </Spacer>
          ) : null}
          <Spacer>
            <Button
              title={type}
              onPress={() => {
                callback({ email, password });
              }}
            />
          </Spacer>
          <Spacer>
            <TouchableOpacity
              onPress={() => {
                navigationCallback();
              }}
            >
              <Text style={styles.link}>{text}</Text>
            </TouchableOpacity>
          </Spacer>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
	padding:5,
    marginBottom: 5,
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
  },
  link: {
    color: "blue",
    fontSize: 18,
  },
});

export default AuthForm;
