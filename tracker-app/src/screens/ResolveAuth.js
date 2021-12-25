import React,{useContext,useEffect} from "react";
import {Context as AuthContext} from "../context/AuthContext";
import {ActivityIndicator} from "react-native";

const ResolveAuthScreen=()=>{
	const {tryLocalLogin}=useContext(AuthContext);
	useEffect(()=>{tryLocalLogin()},[]);
	return <ActivityIndicator size="large" style={{flexDirection: "row",
		justifyContent: "space-around",flex:1}} />;
};

export default ResolveAuthScreen;