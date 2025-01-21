import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";

import PlaylistImage from "./PlaylistImage";

export const Playlist = (props) => {
    const { images, name, user, totalTracks } = props;

    return (
        <View>
            <TouchableOpacity>
                <View style={styles.playlistContainer}>
                    <PlaylistImage images={images} />
                    <View style={styles.playlistTextContainer}>
                        <Text
                            style={styles.playlistTitle}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            {name}
                        </Text>
                        <Text style={styles.playlistInfo} numberOfLines={1}>
                            {user ? `by ${user}` : ``}
                            {user && totalTracks ? ` • ` : ``}
                            {totalTracks ? `${totalTracks} tracks` : ``}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    playlistTitle: {
        fontWeight: "600",
        color: "white",
        paddingBottom: 6,
        paddingRight: 15,
    },
    playlistTextContainer: {
        paddingLeft: 20,
    },
    playlistInfo: {
        color: "white",
        color: "#BEBEBE",
    },
    playlistImagesContainer: {
        width: 50,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        flexWrap: "wrap",
    },
    playlistContainer: {
        display: "flex",
        flexDirection: "row",
        paddingBottom: 25,
        justifyContent: "center",
        paddingLeft: 45,
        paddingRight: 25,
        width: "100%",
    },
});
