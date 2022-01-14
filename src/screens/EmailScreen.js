import React, { useState, useContext, useEffect,useRef } from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
  TouchableOpacity,
  Animated,
  Dimensions,
  AppState,
  StatusBar
} from "react-native";
import { SafeAreaView } from "react-navigation";
import { Button, Input } from "react-native-elements";
import Spacer from "../components/spacer";
import { Context as AuthContext } from "../context/AuthContext";
import { navigate } from "../navigationRef";

const EmailScreen = ({ navigation }) => {
  const appState = useRef(AppState.currentState);
  const [otp, setOtp] = useState("");
  const { otpverify, resendEmail, deleteUser, state, error } =
    useContext(AuthContext);
  const [seconds, setSeconds] = useState(0);
  const opacity = useState(new Animated.Value(0))[0];
  const toShow = navigation.getParam("toShow");

  useEffect(() => {
    const time = Math.max(
      state.time - parseInt(Date.now() / 1000),
      0
    );
    setSeconds(time);
    const event=AppState.addEventListener("change", handleAppStateChange);
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        clearInterval(myInterval);
      }
    }, 1000);
    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
      clearInterval(myInterval);
    };
  });

  const handleAppStateChange = async (nextAppState) => {
    if (appState.current.match(/inactive|background/) && nextAppState === "active") {
      const time = Math.max(
        state.time - parseInt(Date.now() / 1000),
        0
      );
      setSeconds(time);
    }
    appState.current = nextAppState;
  };

  const fadeOut = () => {
    Animated.timing(opacity, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: true,
    }).start();
  };

  const fadeIn = () => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      fadeOut();
    });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView
          forceInset={{ top: "always" }}
          style={{ marginBottom: 20,paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 }}
        >
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
              otpverify(
                otp,
                state.email,
                toShow == 1 ? "ChangePassword" : "mainFlow"
              );
            }}
          />
          <Spacer />
          {seconds ? (
            <Text style={styles.textcontainer}>
              {`OTP valid for ${seconds} seconds`}
            </Text>
          ) : (
            <TouchableOpacity
              onPress={async () => {
                fadeIn();
                await resendEmail(setSeconds);
              }}
            >
              <Text style={styles.textcontainer}>Resend Email</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => {
              if (toShow == 1) {
                navigate("RegisterEmail");
              } else if (toShow == 2) {
                deleteUser();
              } else {
                navigate("Signin");
              }
              error("");
            }}
          >
            <Spacer />
            <Text style={styles.textcontainer}>Want to go back?</Text>
          </TouchableOpacity>
          <Animated.View
            style={{
              backgroundColor: "#067bef",
              opacity,
              position: "absolute",
              bottom: 5,
              padding: 10,
              width: Dimensions.get("window").width - 10,
              left: 5,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "white", fontSize: 20, textAlign: "center" }}>
              Email has been sent.
            </Text>
          </Animated.View>
        </View>
        </SafeAreaView>
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
