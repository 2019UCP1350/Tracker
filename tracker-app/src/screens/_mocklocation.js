import * as Location from "expo-location";

const tenMetersWithDegrees=0.001;

const getlocation=(increment)=>{
	return {
		timestamp:1601275769914,
		coords:{
			speed:-1,
			heading:-1,
			accuracy:28.26569047045815,
			altitudeAccuracy:16.03868293762207,
			altitude:252.6350440979004,
			latitude:30.852033600975243+increment*tenMetersWithDegrees,
			longitude:75.83710601169044+increment*tenMetersWithDegrees,
		}
	};
};

let counter=0;
setInterval(()=>{
	Location.EventEmitter.emit('Expo.locationChanged',{
		watchId:Location._getCurrentWatchId(),
		location:getlocation(counter)
	});
	counter++;
},3000);