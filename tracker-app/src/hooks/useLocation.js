import {useState,useEffect} from "react";
import {requestForegroundPermissionsAsync,watchPositionAsync,Accuracy} from "expo-location";

export default (shouldTrack,callback)=>{
	const [err,setErr]=useState(null);
	useEffect(()=>{
			let subscriber;
			const startWatching= async ()=>{
				try{
					await requestForegroundPermissionsAsync();
					subscriber=await watchPositionAsync({
						accuracy:Accuracy.BestForNavigation,
						timeInterval:1000,
						distanceInterval:10,
					},callback);
					setErr("");
				}catch(e){
					setErr("Please enable location services");
					console.log(e.message);
				}
			}
			if (shouldTrack){
				startWatching();
			}else{
				if(subscriber) {
					subscriber.remove();
				}
				subscriber=null;
			}
			return ()=>{					// return function in useEffect is called when it is called second time and return function is referenced to useEffect call of previous time
											// return function of useEffect is called first than the function in useEffect
				if(subscriber){				// we need this as;callback may change many times so each time we call start watching
					subscriber.remove(); 	// might might gives a number of instances of start watching so we need to cleanup the previous instance if
				}							// if it exists so we called subscriber.remove() to clear previous instance
			}
		},
		[shouldTrack,callback]
	);
	return [err];
}