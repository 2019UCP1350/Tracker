import axios from "axios";
import {AsyncStorage} from "react-native";

const instance= axios.create({
	baseURL:'https://323f-210-89-59-180.ngrok.io'
});

instance.interceptors.request.use(
	async (config)=>{
		const token=await AsyncStorage.getItem('token');
		if(token){
			config.headers.Authorization=`Bearer ${token}`;
		}
		return config;
	},(err)=>{
		Promise.reject(err);
	}
);

export default instance;