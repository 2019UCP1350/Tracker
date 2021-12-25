import React,{useContext} from 'react';
import {Context as AuthContext } from "../context/AuthContext";
import AuthForm from "../components/AuthForm";
import {StyleSheet} from 'react-native';

const SignupScreen=({navigation})=>{
	const {error,state,signup}=useContext(AuthContext);
	return <AuthForm type="Sign Up" state={state} callback={signup} text="Already have an account ? Login Instead" navigationCallback={()=>{error("");navigation.navigate('Signin')}} />
};

SignupScreen.navigationOptions={headerShown:false};

const styles=StyleSheet.create({});

export default SignupScreen;