import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, Dimensions } from "react-native";
import { UserContext } from "../contexts/UserContext";
import UserMarker from "./UserMarker";
import OtherUsersMarker from "./OtherUsersMarker";

export default function Map(props) {
    const {
        currentLatitude,
        setCurrentLatitude,
        currentLongitude,
        setCurrentLongitude,
        markers,
        bottomSheetData,
        setBottomSheetData,
        bottomSheetRef,
    } = props;

    const { User } = React.useContext(UserContext);

    return (
        <MapView
            style={styles.map}
            initialRegion={{
                latitude: currentLatitude - 0.0015,
                longitude: currentLongitude,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
            }}
            showsUserLocation={true}
            showsMyLocationButton={true}
            showsCompass={false}
            onUserLocationChange={(e) => {
                setCurrentLatitude(e.nativeEvent["coordinate"]["latitude"]);
                setCurrentLongitude(e.nativeEvent["coordinate"]["longitude"]);
            }}
        >
            <UserMarker
                currentLatitude={currentLatitude}
                currentLongitude={currentLongitude}
                onPress={() => {
                    if (bottomSheetData.username === User.username)
                        bottomSheetRef.current?.expand();
                    else
                        setBottomSheetData({
                            songsPlayed: User.songsPlayed,
                            username: User.username,
                        });
                }}
            />

            {markers.map((marker, index) => (
                <OtherUsersMarker
                    key={index}
                    uri={marker.albumImage}
                    latitude={marker.latitude}
                    longitude={marker.longitude}
                    onPress={() => {
                        if (bottomSheetData.username === marker.username)
                            bottomSheetRef.current?.expand();
                        else
                            setBottomSheetData({
                                songsPlayed: marker.songsPlayed,
                                username: marker.username,
                            });
                    }}
                />
            ))}
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        zIndex: 0,
    },
});
