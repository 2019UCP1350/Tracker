import React from "react";
import AccountScreen from "./src/screens/AccountScreen";
import SigninScreen from "./src/screens/SigninScreen";
import SignupScreen from "./src/screens/SignupScreen";
import TrackListScreen from "./src/screens/TrackListScreen";
import TrackDetailScreen from "./src/screens/TrackDetailScreen";
import TrackCreateScreen from "./src/screens/TrackCreateScreen";
import EmailScreen from "./src/screens/EmailScreen";
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {Provider as LocationProvider} from "./src/context/LocationContext";
import {Provider as AuthProvider} from "./src/context/AuthContext";
import {setNavigator} from "./src/navigationRef";
import ResolveAuthScreen from "./src/screens/ResolveAuth";
import {Provider as TrackProvider} from "./src/context/TrackContext"
import { Entypo } from '@expo/vector-icons';

const trackListFlow=createStackNavigator({
    TrackList:TrackListScreen,
    TrackDetail:TrackDetailScreen
});

trackListFlow.navigationOptions={
    title:'Tracks',
    tabBarIcon:<Entypo name="list" size={24} color="black" />
}

const switchNavigator=createSwitchNavigator({
    ResolveAuth:ResolveAuthScreen,
    Email:EmailScreen,
    loginFlow:createStackNavigator({
        Signup:SignupScreen,
        Signin:SigninScreen
    }),
    mainFlow: createBottomTabNavigator({
        trackListFlow ,
        TrackCreate:TrackCreateScreen,
        // TrackCreate:createStackNavigator({
        //     Home:{
        //     screen:TrackCreateScreen,
        //     navigationOptions:{
        //         title:'Create Track'
        //     }
        // }}),
        Account:AccountScreen
    })
});
const App=createAppContainer(switchNavigator);

export default ()=>{
    return <TrackProvider>
        <LocationProvider>
            <AuthProvider>
                <App ref={(navigator)=>{ setNavigator(navigator) }} />
         </AuthProvider>
        </LocationProvider>
    </TrackProvider>
};