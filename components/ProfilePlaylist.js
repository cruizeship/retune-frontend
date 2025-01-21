import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    Alert,
    TouchableOpacity,
} from "react-native";

export const ProfilePlaylist = (props) => {
    const image = props.image;

    return (
        <TouchableOpacity
            onPress={() => {
                Alert.alert("Proceed to Spotify?");
            }}
        >
            <View style={styles.playlistContainer}>
                <Image source={{ uri: image }} style={styles.playlistCover} />
                <Text style={styles.playlistName}>{props.playlistName}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    playlistContainer: { flexDirection: "column" },
    playlistName: {
        width: Dimensions.get("window").width * 0.4,
        maxHeight: 20,
        fontFamily: "MontserratSemiBold",
        color: "#FFFFFF",
        fontSize: 14,
        marginTop: 10,
    },
    playlistCover: {
        width: Dimensions.get("window").width * 0.4,
        height: Dimensions.get("window").width * 0.4,
        marginRight: 10,
    },
});
