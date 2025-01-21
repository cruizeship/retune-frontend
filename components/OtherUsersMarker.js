/////////////////////////////////////////////////////////
// Component: Marker design for each user displayed on map
//////////////////////////////////////////////////////////
import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Marker } from "react-native-maps";
export default function OtherUsersMarker({
    uri,
    latitude,
    longitude,
    onPress,
}) {
    return (
        <Marker
            coordinate={{
                latitude: latitude,
                longitude: longitude,
            }}
            onPress={onPress}
        >
            <View style={styles.albumImageContainer}>
                <Image source={{ uri: uri }} style={styles.albumImage} />
            </View>
        </Marker>
    );
}
const styles = StyleSheet.create({
    albumImageContainer: {
        height: 40,
        width: 40,
        borderRadius: 40 / 2,
        borderWidth: 10,
        position: "relative",
    },
    albumImage: {
        width: 20,
        height: 20,
        borderRadius: 20 / 2,
    },
});
