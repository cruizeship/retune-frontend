import React from "react";
import { Marker } from "react-native-maps";
import { View, Text } from "react-native";

export default function UserMarker({
    onPress,
    currentLatitude,
    currentLongitude,
}) {
    return (
        <Marker
            coordinate={{
                latitude: currentLatitude,
                longitude: currentLongitude,
            }}
            onPress={onPress}
        >
            <View
                style={{
                    opacity: "0",
                    backgroundColor: "green",
                    width: 20,
                    height: 20,
                    borderRadius: 20 / 2,
                }}
            >
                <Text></Text>
            </View>
        </Marker>
    );
}
