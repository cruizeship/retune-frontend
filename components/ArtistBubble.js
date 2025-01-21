import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    TouchableOpacity,
} from "react-native";
import ImageColors from "react-native-image-colors";

// const generateColor = () => {
//   const randomColor = Math.floor(Math.random() * 16777215)
//     .toString(16)
//     .padStart(6, "0");
//   return `#${randomColor}`;
// };

// const result = await ImageColors.getColors(image, {
//   fallback: "#000000",
// });

export const ArtistBubble = (props) => {
    const image = props.image;

    return (
        <TouchableOpacity
            onPress={() => {
                Alert.alert("Proceed to Spotify?");
            }}
        >
            <View
                style={styles.artistBubble}
                backgroundColor={props.backgroundColor}
                textColor={props.textColor}
            >
                <Image source={{ uri: image }} style={styles.artist_pic} />
                <Text style={styles.artistName}>{props.name}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    artistBubble: {
        alignItems: "center",
        padding: 8,
        borderRadius: 10,
        alignSelf: "flex-start",
        margin: 3,
        flexDirection: "row",
        justifyContent: "flex-start",
    },
    artist_pic: {
        width: 20,
        height: 20,
        borderRadius: 10,
        marginRight: 5,
    },
    artistName: {
        color: "white",
        fontFamily: "MontserratSemiBold",
        fontSize: 14,
    },
});
