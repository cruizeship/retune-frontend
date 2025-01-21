///////////////////////////////////////////////////////////////////////
// Component: Displays user's songs played on Home screen's bottomsheet
///////////////////////////////////////////////////////////////////////
import React, { useState } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
} from "react-native";
import { TopAlbum } from "./TopAlbum";
import { SongEntryMain } from "./SongEntry";
import { AudioPlayer } from "./AudioPlayer.js";

const audioPlayer = new AudioPlayer();

export default function IconInfo(props) {
    const logo = require("../assets/logo.png");
    const { recentlyPlayed, username } = props;
    const [isSongPlayingState, setIsSongPlayingState] = useState(false);

    console.log("recent tab")

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.container}>
                <TopAlbum
                    image={recentlyPlayed[0].albumImage}
                    songTitle={recentlyPlayed[0].songName}
                    albumTitle={recentlyPlayed[0].albumName}
                    artistName={recentlyPlayed[0].artistName.join(", ")}
                    timePlayed={recentlyPlayed[0].timePlayed}
                    spotifyUrl={recentlyPlayed[0].spotifyUrl}
                    playbackURL={recentlyPlayed[0].playbackUrl}
                    uniqueSongPlayId={
                        recentlyPlayed[0].songUri + recentlyPlayed[0].timePlayed
                    }
                    isSongPlayingState={isSongPlayingState}
                    setIsSongPlayingState={setIsSongPlayingState}
                    audioPlayer={audioPlayer}
                />
                <View
                    style={{
                        flexDirection: "row",
                        alignSelf: "flex-start",
                        justifyContent: "center",
                        marginLeft: 20,
                        marginBottom: 7,
                    }}
                >
                    <Text style={styles.recentTitle}>
                        {username + "'s Recent "}
                    </Text>
                    <Image style={{ width: 70, height: 25 }} source={logo} />
                    <Text style={styles.recentTitle}>{"'s"}</Text>
                </View>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={recentlyPlayed.slice(1)} // Puts all songs in recently played after the first one, which goes in the TopAlbum component
                    renderItem={({ item }) => {
                        return (
                            <SongEntryMain
                                song={item.songName}
                                uniqueSongPlayId={
                                    item.songUri + item.timePlayed
                                }
                                name={item.artistName.join(", ")}
                                image={item.albumImage}
                                playbackURL={item.playbackUrl}
                                spotifyUrl={item.spotifyUrl}
                                isSongPlayingState={isSongPlayingState}
                                setIsSongPlayingState={setIsSongPlayingState}
                                audioPlayer={audioPlayer}
                            />
                        );
                    }}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
    },
    recentSubtitle: {
        fontFamily: "MontserratSemiBold", //make this medium
        color: "#000000",
        fontSize: 13,
        lineHeight: 20,
        marginLeft: 10,
        marginBottom: 10,
    },
    recentTitle: {
        alignSelf: "flex-start",
        fontFamily: "MontserratSemiBold", //make this medium
        color: "#000000",
        fontSize: 16,
        marginTop: 4,
    },
    smallPlayIcon: {
        marginRight: 15,
        width: 13,
        height: 17,
    },
    smallPlusIcon: {
        marginRight: 15,
        width: 16.25,
        height: 16.25,
    },
    smallSpotifyIcon: {
        marginRight: 15,
        width: 22,
        height: 20.29,
    },
});
