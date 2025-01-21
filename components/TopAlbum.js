import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { A } from "@expo/html-elements";
import { dateDiffFromNow } from "../helpers/date";

export const TopAlbum = (props) => {
    const {
        playbackURL,
        timePlayed,
        spotifyUrl,
        uniqueSongPlayId,
        isSongPlayingState,
        setIsSongPlayingState,
        audioPlayer,
    } = props;

    return (
        <View style={styles.topAlbumView}>
            <Image
                source={{
                    uri: props.image,
                }}
                style={styles.topAlbumImage}
            />
            <View style={styles.topAlbumInfo}>
                <Text style={styles.recentTitle}>{props.songTitle}</Text>

                <View style={{ flexDirection: "column" }}>
                    <Text style={styles.recentSubtitle}>
                        {props.albumTitle}
                    </Text>
                    <Text
                        style={{
                            flexDirection: "row",
                            marginLeft: 10,
                            fontSize: 13,
                        }}
                    >
                        <Text>by </Text>
                        {props.artistName}
                    </Text>
                </View>

                <View style={{ flexDirection: "row", marginTop: 7 }}>
                    <Image
                        source={require("../assets/calendar.png")}
                        style={styles.calendarIcon}
                    />
                    <Text style={{ fontSize: 10, marginLeft: 5 }}>
                        {dateDiffFromNow(timePlayed)}
                    </Text>
                </View>
                <View
                    style={{
                        flexDirection: "row",
                        marginTop: 20,
                        justifyContent: "space-evenly",
                    }}
                >
                    {/* Add once this works */}
                    {/* <TouchableOpacity
            onPress={() => {
              Alert.alert("Added to Playlist!");
            }}
          >
            <Image
              source={require("../assets/plus_black_large.png")}
              style={styles.largeIcon}
            />
          </TouchableOpacity> */}
                    <TouchableOpacity
                        onPress={() => {
                            // Different song is playing
                            if (
                                isSongPlayingState &&
                                isSongPlayingState !== uniqueSongPlayId
                            ) {
                                if (playbackURL) {
                                    console.log("Pause from top album");
                                    audioPlayer.pauseSound();
                                    audioPlayer.playSound(playbackURL);
                                    setIsSongPlayingState(uniqueSongPlayId);
                                }
                            }
                            // No song is playing
                            else if (!isSongPlayingState) {
                                if (playbackURL) {
                                    audioPlayer.playSound(playbackURL);
                                    setIsSongPlayingState(uniqueSongPlayId);
                                }
                                // Pause song
                            } else {
                                audioPlayer.pauseSound();
                                setIsSongPlayingState(false);
                            }
                        }}
                    >
                        <Image
                            source={
                                isSongPlayingState === uniqueSongPlayId
                                    ? require("../assets/pause_gradient.png")
                                    : require("../assets/play_gradient.png")
                            }
                            style={styles.largeIcon}
                        />
                    </TouchableOpacity>
                    <A href={spotifyUrl}>
                        <TouchableOpacity>
                            <Image
                                source={require("../assets/spotifyicon_black_large.png")}
                                style={styles.largeIcon}
                            />
                        </TouchableOpacity>
                    </A>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    calendarIcon: {
        marginLeft: 10,
        width: 13,
        height: 11,
    },
    largeIcon: {
        marginRight: 10,
        width: 35,
        height: 35,
    },
    topAlbumView: {
        // flex: 1,
        paddingTop: 15,
        paddingBottom: 20,
        flexDirection: "row",
        // backgroundColor: "red",
    },
    topAlbumInfo: {
        flex: 1,
        flexDirection: "column",
    },
    recentSubtitle: {
        fontFamily: "MontserratRegular", //make this medium
        color: "#000000",
        fontSize: 13,
        lineHeight: 20,
        marginLeft: 10,
    },
    recentTitle: {
        fontFamily: "MontserratSemiBold", //make this medium
        color: "#000000",
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 10,
    },
    topAlbumImage: {
        width: 155,
        height: 155,
        marginLeft: 21,
    },
});
