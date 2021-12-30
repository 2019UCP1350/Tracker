import CreateDataContext from "./CreateDataContext";
import trackerapi from "../api/tracker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigate } from "../navigationRef";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "add_error":
      return { ...state, errorMessage: action.payload };
    case "signup":
      return {
        errorMessage: "",
        token: action.payload.token,
        time: action.payload.time,
      };
    case "signin":
      return {
        token: action.payload.token,
        isEmailVerified: action.payload.isEmailVerified,
        time: action.payload.time,
      };
    case "signout":
      return { errorMessage: "", token: null, isEmailVerified: null };
    case "otp_verify":
      return { ...state, isEmailVerified: action.payload, time: 0 };
    case "add_time":
      return { ...state, time: action.paload, errorMessage: "" };
    default:
      return state;
  }
};

const signup = (dispatch) => {
  return async ({ email, password, confirmPassword }) => {
    try {
      if (password != confirmPassword) {
        dispatch({
          type: "add_error",
          payload: "Password and Confirm-Password doesnot match.",
        });
        return;
      }
      const response = await trackerapi.post("/signup", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      const time = Math.max(
        response.data.time - parseInt(Date.now() / 1000),
        0
      );
      dispatch({
        type: "signup",
        payload: { token: response.data.token, time: time },
      });
      navigate("Email", { email });
    } catch (err) {
      console.log("Error with signup", err.message);
      dispatch({
        type: "add_error",
        payload: "Something went wrong with Sign Up ",
      });
    }
    // make an api request to add new userAgent
    // if sucess change our state and navigate
  }; // else print some error message message
};

const signin = (dispatch) => {
  return async ({ email, password }) => {
    try {
      const response = await trackerapi.post("/signin", { email, password });
      await AsyncStorage.setItem("token", response.data.token);
      if (response.data.isEmailVerified) {
        await AsyncStorage.setItem("isEmailVerified", "true");
        dispatch({
          type: "signin",
          payload: {
            token: response.data.token,
            isEmailVerified: true,
            time: 0,
          },
        });
        navigate("mainFlow");
      } else {
        const time = Math.max(
          response.data.time - parseInt(Date.now() / 1000),
          0
        );
        dispatch({
          type: "signin",
          payload: {
            token: response.data.token,
            isEmailVerified: false,
            time: time,
          },
        });
        navigate("Email", { email });
      }
    } catch (err) {
      console.log("Sign-in", err);
      dispatch({
        type: "add_error",
        payload: "Something went wrong with Sign In",
      });
    }
    // make an api request to signin
    // if sucess change our state and navigate to some other page
    // else print some error
  };
};

const error = (dispatch) => {
  return (err) => {
    dispatch({ type: "add_error", payload: err });
  };
};

const otpverify = (dispatch) => {
  return async (otp) => {
    try {
      const time = parseInt(Date.now() / 1000);
      const response = await trackerapi.post("/otpverify", { otp, time });
      if (response.data.isEmailVerified) {
        await AsyncStorage.setItem("isEmailVerified", "true");
        dispatch({ type: "otpverify", payload: true });
        navigate("mainFlow");
      } else {
        dispatch({ type: "add_error", payload: response.data.error });
      }
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong please try again.",
      });
    }
  };
};

const tryLocalLogin = (dispatch) => {
  return async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      const isEmailVerified = await AsyncStorage.getItem("isEmailVerified");
      if (isEmailVerified === "true") {
        dispatch({
          type: "signin",
          payload: { token, isEmailVerified },
          time: 0,
        });
        navigate("mainFlow");
      } else {
        try {
          const response = await trackerapi.get("/time");
          const time = Math.max(
            response.data.time - parseInt(Date.now() / 1000),
            0
          );
          dispatch({
            type: "signin",
            payload: {
              token,
              isEmailVerified: false,
              time: time,
            },
          });
          navigate("Email", { email: response.data.email });
        } catch (err) {
          console.log("Error from get time", err);
        }
      }
    } else {
      navigate("Signup");
    }
  };
};

const signout = (dispatch) => async () => {
  try {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("isEmailVerified");
    dispatch({ type: "signout" });
    navigate("loginFlow");
  } catch (err) {
    console.log("Hi from signout", err);
  }
};

const resendEmail = (dispatch) => {
  return async (callback) => {
    try {
      const response = await trackerapi.post("/email");
      const time = Math.max(
        response.data.time - parseInt(Date.now() / 1000),
        0
      );
      callback(time);
      dispatch({ type: "add_time", payload: time });
    } catch (err) {
      console.log("error from sending email", err);
      dispatch({
        type: "add_error",
        payload: "Something went wrong with sending email",
      });
    }
  };
};

const deleteUser = (dispatch) => {
  return async () => {
    try {
      await trackerapi.delete("/user", {});
      await AsyncStorage.removeItem("token");
      navigate("loginFlow");
    } catch (err) {
      console.log("error from deleting user", err);
    }
  };
};

export const { Context, Provider } = CreateDataContext(
  AuthReducer,
  {
    signup,
    signin,
    signout,
    error,
    tryLocalLogin,
    otpverify,
    resendEmail,
    deleteUser,
  },
  {
    token: null,
    errorMessage: "",
    isEmailVerified: false,
    time: 0,
    email: "",
    username: "",
  }
);
