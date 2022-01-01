import React, { useState, useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Button, Input } from "react-native-elements";
import Spacer from "../components/spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { navigate } from "../navigationRef";

const EmailScreen = ({ navigation }) => {
  const [otp, setOtp] = useState("");
  const { otpverify, resendEmail, deleteUser, state,error } = useContext(AuthContext);
  const [seconds, setSeconds] = useState(state.time);
  const toShow = navigation.getParam("toShow");
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        clearInterval(myInterval);
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.textcontainer}>
            {`Enter the Verification code send to ${state.email}.`}
          </Text>
          <Spacer>
            <Input
              value={otp}
              onChangeText={setOtp}
              autoCapitalize="none"
              secureTextEntry={false}
              placeholder="Enter OTP"
            />
          </Spacer>
          {state.errorMessage ? (
            <>
              <Text style={{ ...styles.textcontainer, color: "red" }}>
                {state.errorMessage}
              </Text>
              <Spacer />
            </>
          ) : null}
          <Button
            title="Submit"
            style={styles.button}
            onPress={() => {
              otpverify(otp, state.email,(toShow?'ChangePassword':"mainFlow"));
            }}
          />
          <Spacer />
          {seconds ? (
            <Text style={styles.textcontainer}>
              {`OTP valid for ${seconds} seconds`}
            </Text>
          ) : (
            <TouchableOpacity
              onPress={() => {
                resendEmail(setSeconds);
              }}
            >
              <Text style={styles.textcontainer}>Resend Email</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              if (toShow) {
                navigate('RegisterEmail');
              } else {
                deleteUser();
              }
              error('');
            }}
          >
            <Spacer />
            <Text style={styles.textcontainer}>Want to go back?</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

EmailScreen.navigationOptions = { headerShown: false };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 15,
  },
  textcontainer: {
    color: "blue",
    fontSize: 18,
    textAlign: "center",
  },
  button: {
    marginLeft: 5,
    marginRight: 5,
  },
});

export default EmailScreen;
