import CreateDataContext from "./CreateDataContext";

const LocationReducer = (state, action) => {
  switch (action.type) {
    case "add_current_location":
      return { ...state, currentLocation: action.payload };
    case "add_location":
      return { ...state, locations: [...state.locations, action.payload] };
    case "start_recording":
      return { ...state, recording: true };
    case "stop_recording":
      return { ...state, recording: false };
    case "change_name":
      return { ...state, name: action.payload };
    case "reset":
      return { ...state, name: "", locations: [] };
    default:
      return state;
  }
};

const addLocation = (dispatch) => {
  return (location, recording) => {
    dispatch({ type: "add_current_location", payload: location });
    if (recording) {
      dispatch({ type: "add_location", payload: location });
    }
  };
};

const startRecording = (dispatch) => {
  return () => {
    dispatch({ type: "start_recording" });
  };
};

const stopRecording = (dispatch) => {
  return () => {
    dispatch({ type: "stop_recording" });
  };
};

const changeName = (dispatch) => {
  return (name) => {
    dispatch({ type: "change_name", payload: name });
  };
};

const reset = (dispatch) => {
  return () => {
    dispatch({ type: "reset" });
  };
};
export const { Context, Provider } = CreateDataContext(
  LocationReducer,
  { addLocation, changeName, startRecording, stopRecording, reset },
  {
    locations: [],
    recording: false,
    currentLocation: null,
    name: "",
  }
);
