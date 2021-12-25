import React, { useState ,useContext} from "react";
import {
  View,
  StyleSheet,
  Keyboard,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Platform,
} from "react-native";
import { Button, Input } from "react-native-elements";
import Spacer from "../components/spacer";
import {Context as AuthContext } from "../context/AuthContext";

const EmailScreen = () => {
  const [otp, setOtp] = useState("");
  const {otpverify,state}=useContext(AuthContext);
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.textcontainer}>
            Enter the Verification code just send to your email.
          </Text>
          <Spacer>
            <Input
              value={otp}
              onChangeText={setOtp}
              autoCapitalize="none"
              secureTextEntry
              placeholder="Enter OTP"
            />
          </Spacer>
          {state.errorMessage ? (
            <Spacer>
              <Text style={styles.errorMessage}>{state.errorMessage}</Text>
            </Spacer>
          ) : null
          }
          <Button
            title="Submit"
            style={styles.button}
            onPress={()=>{otpverify(parseInt(otp))}}
          ></Button>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

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
  button:{ 
      marginLeft: 5, 
      marginRight: 5 
    }
});

export default EmailScreen;
