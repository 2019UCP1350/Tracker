import React,{useContext} from "react";
import {Button,Input} from "react-native-elements";
import {View} from "react-native";
import Spacer from "./spacer";
import {Context as LocationContext } from "../context/LocationContext";
import useSaveTrack from "../hooks/useSaveTrack";

const TrackForm=()=>{
    const { state:{name,recording,locations},startRecording,stopRecording,changeName}=useContext(LocationContext);
    const [saveTrack]=useSaveTrack();
    return <View>
        <Spacer>
        <Input placeholder="Enter name" value={name} onChangeText={(text)=>changeName(text)}/>
        {recording ? <Button title="Stop Recording" onPress={stopRecording}/>:<Button title="Start Recording" onPress={startRecording}/>}
        </Spacer>
        <Spacer>
            {!recording && locations.length ? <Button title="Save" onPress={saveTrack} />:null }
        </Spacer>
    </View>
}
export default TrackForm;