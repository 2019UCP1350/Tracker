import CreateDataContext from "./CreateDataContext";
import trackerapi from "../api/tracker";
import { navigate } from "../navigationRef";
const TrackReducer = (state, action) => {
  switch (action.type) {
    case "fetch_tracks":
      return action.payload;
    case "add":
      return [...state, action.payload];
    case "delete":
      return state.filter((item) => item._id != action.payload);
    default:
      return state;
  }
};

const fetchTracks = (dispatch) => {
  return async () => {
    try {
      const response = await trackerapi.get("/track");
      //   while (!Array.isArray(response.data)){
      //       response=await trackerapi.get('/track');
      //   }
      dispatch({ type: "fetch_tracks", payload: response.data });
      navigate("Bottom");
    } catch (err) {
      console.log(err);
    }
  };
};

const createTrack = (dispatch) => {
  return async (name, locations, reset) => {
    try {
      const response = await trackerapi.post("/tracks", { name, locations });
      navigate("TrackList");
      dispatch({ type: "add", payload: response.data });
      reset();
    } catch (err) {
      console.log(err);
    }
  };
};

const deleteTrack = (dispatch) => {
  return async (id, callback) => {
    try {
      await trackerapi.delete("/track", { data: { id: id } });
      dispatch({ type: "delete", payload: id });
      callback(false);
    } catch (err) {
      console.log("error from deleting Track", err);
    }
  };
};

export const { Provider, Context } = CreateDataContext(
  TrackReducer,
  { fetchTracks, createTrack, deleteTrack },
  []
);
