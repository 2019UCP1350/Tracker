import React, { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { Input, Text, Button } from "react-native-elements";
import { navigate } from "../navigationRef";
import Spacer from "../components/spacer";
import { Ionicons } from "@expo/vector-icons";
import { Context as AuthContext } from "../context/AuthContext";

const ChangePasswordScreen = ({ navigation }) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { state, changePassword } = useContext(AuthContext);
  const input = React.useRef();
  const page = navigation.getParam("page");
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
          style={{ marginBottom: 20 }}
        >
          <View style={styles.container}>
            <Spacer>
              <Text h3 style={{ textAlign: "center", color: "#067bef" }}>
                Change Password for Tracker
              </Text>
            </Spacer>
            <Spacer />
            <Input
              label="New Password"
              value={newPassword}
              onChangeText={setNewPassword}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={!showNewPassword}
              rightIcon={
                <Ionicons
                  name={showNewPassword ? "eye-outline" : "eye-off-outline"}
                  onPress={() => {
                    setShowNewPassword(!showNewPassword);
                  }}
                  size={30}
                  color="#067bef"
                />
              }
            />
            <Input
              ref={input}
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry={!showConfirmPassword}
              rightIcon={
                <Ionicons
                  name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                  onPress={() => {
                    setShowConfirmPassword(!showConfirmPassword);
                  }}
                  size={30}
                  color="#067bef"
                />
              }
              errorMessage={state.errorMessage}
              errorStyle={styles.errorMessage}
            />
            <Spacer>
              <Button
                title="Submit"
                onPress={() => {
                  changePassword(
                    newPassword,
                    confirmPassword,
                    page,
                    input.current.shake,
                    state.email
                  );
                }}
              />
            </Spacer>
            <Spacer>
              <TouchableOpacity
                onPress={() => {
                  navigate(page);
                }}
              >
                <Text style={{ ...styles.textContainer, color: "blue" }}>
                  Want to go back ?
                </Text>
              </TouchableOpacity>
            </Spacer>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

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
    fontSize: 18,
    textAlign: "center",
  },
});

ChangePasswordScreen.navigationOptions = { headerShown: false };

export default ChangePasswordScreen;
