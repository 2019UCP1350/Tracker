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
        email: action.payload.email,
        username: action.payload.username,
        isEmailVerified: false,
      };
    case "signin":
      return {
        token: action.payload.token,
        isEmailVerified: action.payload.isEmailVerified,
        time: action.payload.time,
        email: action.payload.email,
        username: action.payload.username,
        errorMessage: "",
      };
    case "signout":
      return { errorMessage: "", token: null, isEmailVerified: null };
    case "otp_verify":
      return {
        ...state,
        isEmailVerified: action.payload,
        time: 0,
        errorMessage:"",
      };
    case "add_time":
      return { ...state, time: action.payload,errorMessage: "" };
    case "add_email":
      return { ...state, email: action.payload };
    case "delete":
      return action.payload;
    case "add_username":
      return { ...state, username: action.payload };
    default:
      return state;
  }
};

const signup = (dispatch) => {
  return async ({ email, password, confirmPassword }) => {
    try {
      const response = await trackerapi.post("/signup", { email, password,confirmPassword });
      if(response.error){
        dispatch({type:"add_error",payload:response.error});
        return
      }
      await AsyncStorage.setItem("token", response.data.token);
      const time = Math.max(
        response.data.time - parseInt(Date.now() / 1000),
        0
      );
      dispatch({
        type: "signup",
        payload: {
          token: response.data.token,
          time: time,
          username: response.data.username,
          email: response.data.email,
        },
      });
      navigate("Email",{ toShow:2 });
    } catch (err) {
      console.log("Error with signup", err.message);
      dispatch({
        type: "add_error",
        payload: "Something went wrong with Sign Up",
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
      if(response.data.error){
        dispatch({type:"add_error",payload:response.data.error});
        return
      }
      await AsyncStorage.setItem("token", response.data.token);
      if (response.data.isEmailVerified) {
        dispatch({
          type: "signin",
          payload: {
            token: response.data.token,
            isEmailVerified: true,
            time: 0,
            email: response.data.email,
            username: response.data.username,
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
            email: response.data.email,
            username: response.data.username,
          },
        });
        navigate("Email");
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
  return async (otp, email, page) => {
    try {
      const time = parseInt(Date.now() / 1000);
      const response = await trackerapi.post("/otpverify", {
        otp,
        time,
        email,
      });
      if (response.data.isEmailVerified) {
        await AsyncStorage.setItem("isEmailVerified", "true");
        dispatch({ type: "otpverify", payload: true });
        navigate(page, { page: "Signin" });
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
      try {
        const response = await trackerapi.get("/info");
        const isEmailVerified = response.data.isEmailVerified;
        if (isEmailVerified) {
          dispatch({
            type: "signin",
            payload: { ...response.data, token },
            time: 0,
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
              ...response.data,
              token,
              time,
            },
          });
          navigate("Email");
        }
      } catch (err) {
        console.log("Error from get time", err);
      }
    } else {
      navigate("Signup");
    }
  };
};

const signout = (dispatch) => async () => {
  try {
    await AsyncStorage.removeItem("token");
    dispatch({ type: "signout" });
    navigate("loginFlow");
  } catch (err) {
    console.log("Error from signout", err);
  }
};

const checkUser = (dispatch) => {
  return async (email, callback) => {
    try {
      if (!email) {
        dispatch({
          type: "add_error",
          payload: "Email field cannot be empty.",
        });
        callback();
        return;
      }
      const response = await trackerapi.post("/usercheck", { email });
      if (response.data.error) {
        dispatch({ type: "add_error", payload: "User not registered." });
        callback();
        return;
      }
      const time = Math.max(
        response.data.time - parseInt(Date.now() / 1000),
        0
      );
      dispatch({ type: "add_email", payload: email });
      dispatch({ type: "add_time", payload: time });
      navigate("Email", { toShow: 1 });
    } catch (err) {
      console.log("Error from checking user", err);
    }
  };
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
        payload: "Something went wrong with sending email.",
      });
    }
  };
};

const changePassword = (dispatch) => {
  return async (newPassword, confirmPassword, page, callback, email) => {
    if (!newPassword) {
      dispatch({ type: "add_error", payload: "Enter new Password" });
      callback();
      return;
    }
    if (newPassword != confirmPassword) {
      dispatch({
        type: "add_error",
        payload: "New Password and Confirm Password doesnot match.",
      });
      callback();
      return;
    }
    try {
      await trackerapi.post("/changepassword", {
        email,
        password: newPassword,
      });
      dispatch({ type: "add_error", payload: "" });
      navigate(page);
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with changing password.",
      });
      console.log("Error from change password", err);
    }
  };
};

const deleteUser = (dispatch) => {
  return async () => {
    try {
      await trackerapi.delete("/user", {});
      await AsyncStorage.removeItem("token");
      dispatch({
        type: "delete",
        payload: {
          email: "",
          token: "",
          username: "",
          time: 0,
          errorMessage: "",
          isEmailVerified: false,
        },
      });
      navigate("Signup");
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong while Going Back.",
      });
      console.log("error from deleting user", err);
    }
  };
};

const changeUsername = (dispatch) => {
  return async (username, email, callback) => {
    try {
      console.log("hi");
      await trackerapi.post("/changeusername", { username, email });
      console.log("bye");
      dispatch({ type: "add_username", payload: username });
      navigate("AccountS");
    } catch (err) {
      dispatch({
        type: "add_error",
        payload: "Something went wrong with changing Username.",
      });
      callback();
      console.log("Error while changing username", err);
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
    checkUser,
    changePassword,
    changeUsername,
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
