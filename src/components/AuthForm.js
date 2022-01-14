import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { Input, Text, Button } from "react-native-elements";
import Spacer from "./spacer";
import { Ionicons } from "@expo/vector-icons";
import { navigate } from "../navigationRef";

const AuthForm = ({
  text,
  type,
  state,
  callback,
  navigationCallback,
  showPassword,
  setShowPassword,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        <SafeAreaView
          forceInset={{ top: "always" }}
          style={{ marginBottom: 20 ,paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0}}
        >
          <View style={styles.container}>
            <Spacer>
              <Text h3 style={{ textAlign: "center", color: "#067bef" }}>
                {type} for Tracker
              </Text>
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
              secureTextEntry={!showPassword}
              rightIcon={
                <Ionicons
                  name={showPassword ? "eye-outline" : "eye-off-outline"}
                  onPress={() => {
                    setShowPassword(!showPassword);
                  }}
                  size={30}
                  color="#067bef"
                />
              }
            />
            {type === "Sign Up" ? (
              <Input
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={!showConfirmPassword}
                rightIcon={
                  <Ionicons
                    name={
                      showConfirmPassword ? "eye-outline" : "eye-off-outline"
                    }
                    onPress={() => {
                      setShowConfirmPassword(!showConfirmPassword);
                    }}
                    size={30}
                    color="#067bef"
                  />
                }
              />
            ) : null}
            {state.errorMessage ? (
              <Spacer>
                <Text style={styles.errorMessage}>{state.errorMessage}</Text>
              </Spacer>
            ) : null}
            <Spacer>
              <Button
                title={type}
                onPress={() => {
                  if (type === "Sign Up") {
                    callback({ email, password, confirmPassword });
                  } else callback({ email, password });
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
            {type === "Sign In" ? (
              <Spacer>
                <TouchableOpacity
                  onPress={() => {
                    navigate('RegisterEmail');
                  }}
                >
                  <Text style={styles.link}>Forgot Password ?</Text>
                </TouchableOpacity>
              </Spacer>
            ) : null}
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    justifyContent: "center",
    marginBottom: 5,
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
  },
  link: {
    color: "blue",
    fontSize: 18,
    textAlign: "center",
  },
});

export default AuthForm;
