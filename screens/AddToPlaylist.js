import {
    StyleSheet,
    ImageBackground,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import React from "react";

import { Playlist } from "../components/Playlist";

export default function AddToPlaylist() {
    return (
        <View style={styles.container}>
            <View style={styles.newPlaylistContainer}>
                <ImageBackground
                    source={require("../assets/new_playlist_button_bg.png")}
                >
                    <TouchableOpacity>
                        <Text style={styles.newPlaylistText}>New Playlist</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
            {/* To-do, add actual playlists to display */}
            {Array(1, 2, 3).map((item, iterator) => (
                <Playlist
                    name="This is a playlist name that is incredilyasdas asdasdon asdasdoknson asdas"
                    user="userJake"
                    totalTracks="20"
                    images={[
                        {
                            url: "https://upload.wikimedia.org/wikipedia/en/d/d3/LetMeGetBy.jpg",
                        },
                        {
                            url: "https://upload.wikimedia.org/wikipedia/en/d/d3/LetMeGetBy.jpg",
                        },
                        {
                            url: "https://upload.wikimedia.org/wikipedia/en/d/d3/LetMeGetBy.jpg",
                        },
                        {
                            url: "https://upload.wikimedia.org/wikipedia/en/d/d3/LetMeGetBy.jpg",
                        },
                    ]}
                    key={`playlist${iterator}`}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "black",
        color: "white",
    },
    newPlaylistContainer: {
        marginTop: 70,
        marginBottom: 40,
        width: "auto",
        backgroundColor: "red",
        borderRadius: 100,
        fontSize: 20,
        fontWeight: 600,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    newPlaylistText: {
        fontSize: 20,
        fontWeight: "600",
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 45,
        paddingRight: 45,
    },
});
