import CreateDataContext from "./CreateDataContext";
import trackerapi from "../api/tracker"
import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigate} from "../navigationRef";
const AuthReducer=(state,action)=>
{
	switch(action.type)
	{
		case "add_error":
			return {...state,errorMessage:action.payload}
		case "signup":
			return {errorMessage:'',token:action.payload}
		case "signin":
			return {token:action.payload.token,isEmailVerified:action.payload.isEmailVerified}
		case "signout":
			return {errorMessage:'',token:null,isEmailVerified:null}
		case "otp_verify":
			return {...state,isEmailVerified:action.payload}
		default:
			return state;
	}
};

const signin=(dispatch)=>{
	return async ({email,password})=>{
		try{
			const response=await trackerapi.post("/signin",{email,password});
			await AsyncStorage.setItem('token',response.data.token);
			if(response.data.isEmailVerified){
				await AsyncStorage.setItem('isEmailVerified','true')
				dispatch({type:"signin",payload:{token:response.data.token,isEmailVerified:true}});
				navigate('mainFlow');
			}else{	
				navigate('Email');
			}

		}catch(err)
		{
			console.log("Sign-in",err);
			dispatch({type:"add_error",payload:"Something went wrong with Sign In"});
		}
		// make an api request to signin
		// if sucess change our state and navigate to some other page
		// else print some error
	};
};

const signup=(dispatch)=>{
	return  async ({email,password,confirmPassword})=>{
		try{
			console.log("Hi from signup");
			console.log("Bye",password,confirmPassword);
			if(password!=confirmPassword){
				dispatch({type:"add_error",payload:"Password and Confirm-Password doesnot match."});
				return 
			}
			const response=await trackerapi.post("/signup",{email,password});
			await AsyncStorage.setItem('token',response.data.token);
			dispatch({type:"signup",payload:response.data.token});
			navigate('Email');
		}catch(err)
		{
			console.log(err.message);
			dispatch({type:"add_error",payload:"Something went wrong with Sign Up "});
		}
		// make an api request to add new userAgent
		// if sucess change our state and navigate 
	};	// else print some error message message
};

const error=(dispatch)=>{
	return (err)=>{ dispatch({type:"add_error",payload:err})};
}

const otpverify=(dispatch)=>{
	return async(otp)=>{
		try{
			const response=await trackerapi.post("/otpverify",{otp});
			if (response.data.isEmailVerified){
				await AsyncStorage.setItem("isEmailVerified","true");
				dispatch({type:"otpverify",payload:true});
				navigate('mainFlow');
			}else{
				dispatch({type:"add_error",payload:"Incorrect OTP"});
			}
		}catch(err){
			console.log("otp_verify",err.message);
			dispatch({type:"add_error",payload:"Something went wrong please try again."});
		}
	}
}

const tryLocalLogin=(dispatch)=>{
	return async ()=>{
			const token=await AsyncStorage.getItem('token');
			if (token){
				const isEmailVerified=await AsyncStorage.getItem('isEmailVerified');
				if(isEmailVerified==='true'){
					dispatch({type:"signin",payload:{token,isEmailVerified}});
					navigate('mainFlow');
				}else{
					dispatch({type:"signin",payload:{token,isEmailVerified:false}});
					navigate('Email');
				}
			}
			else{
				navigate('Signup');
			}
	};
}

const signout=(dispatch)=> async()=>{
	try{
		await AsyncStorage.removeItem('token');
		await AsyncStorage.removeItem('isEmailVerified');
		dispatch({type:"signout"});
		navigate('loginFlow');
	}catch(err){
		console.log("Hi from signout",err);
	}
};

export const {Context,Provider}=CreateDataContext(AuthReducer,{signup,signin,signout,error,tryLocalLogin,otpverify},{token:null,errorMessage:'',isEmailVerified:false});