import React,{useContext,useEffect} from 'react';
import {StyleSheet,FlatList,SafeAreaView} from 'react-native';
import {ListItem} from "react-native-elements";
import {NavigationEvents} from "react-navigation";
import {Context as TrackContext } from "../context/TrackContext";
import {navigate} from "../navigationRef"
const TrackListScreen=()=>{
	const {state,fetchTracks}=useContext(TrackContext);
	useEffect(()=>{fetchTracks()},[]);
	return <SafeAreaView forceInset={{top:"always"}}>
		{/* <NavigationEvents onWillFocus={fetchTracks}/>  */}
				<FlatList
				data={state}
				keyExtractor={item=>item._id}
				renderItem={({item})=>{
					return (
							<ListItem topDivider onPress={()=>navigate('TrackDetail',{_id:item._id})}>
								<ListItem.Title>
									{item.name}
								</ListItem.Title>
								<ListItem.Chevron/>
							</ListItem>
					)
				}
				}
			/>
		</SafeAreaView>
};
TrackListScreen.navigationOptions={title: 'Tracks'};
const styles=StyleSheet.create({});

export default TrackListScreen;