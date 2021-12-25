import React,{useContext} from 'react';
import {StyleSheet} from 'react-native';
import AuthForm from "../components/AuthForm";
import {Context as AuthContext } from "../context/AuthContext";

/* in order to clear message we can also do the following
	import {NavigationEvents} from "react-natigation";
	they can be called as a components inside our return as
	<NavigationEvents onWillBlur={()=>{error("")}} />
	other event handles which can be applied are
	onWillFocus ,onDidFocus,onDidBlur
*/
const SigninScreen=({navigation})=>{
	const {error,state,signin}=useContext(AuthContext);
	return <AuthForm type="Sign In" state={state} callback={signin}  navigationCallback={()=>{error("");navigation.navigate('Signup');  }} text="Don't have a account ? Go back to sign up."  />
};
 
const styles=StyleSheet.create({});
 
SigninScreen.navigationOptions={headerShown:false};
 
export default SigninScreen;