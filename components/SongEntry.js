import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
} from "react-native";
import { A } from "@expo/html-elements";

export const SongEntryMain = (props) => {
    const {
        image,
        spotifyUrl,
        playbackURL,
        isSongPlayingState,
        setIsSongPlayingState,
        uniqueSongPlayId,
        audioPlayer,
        textColor,
    } = props;

    return (
        <View
            style={{
                width: Dimensions.get("window").width * 0.9,
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "space-between",
            }}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignContent: "flex-start",
                    //   width: Dimensions.get("window").width * 0.5,
                }}
            >
                <Image source={{ uri: image }} style={styles.retune1img} />

                <View style={{ marginTop: 5 }}>
                    {textColor === "white" && (
                        <>
                            <Text
                                style={styles.retuneTextWhite}
                                numberOfLines={1}
                            >
                                {props.song}
                            </Text>
                            <Text style={styles.retuneTextWhite2}>
                                {props.name}
                            </Text>
                        </>
                    )}
                    {textColor !== "white" && (
                        <>
                            <Text style={styles.retuneText} numberOfLines={1}>
                                {props.song}
                            </Text>
                            <Text style={styles.retuneText2}>{props.name}</Text>
                        </>
                    )}
                </View>
            </View>

            <View
                style={{
                    flexDirection: "row",
                    marginLeft: 5,
                    marginTop: 15,
                    justifyContent: "space-between",
                }}
            >
                {/* Add once we have add to playlist working */}
                {/* <TouchableOpacity
          onPress={() => {

            Alert.alert("Added to Playlist!");
          }}
        >
          <Image
            source={require("../assets/plus_black.png")}
            style={styles.smallPlusIcon}
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
                    {textColor === "white" && (
                        <Image
                            source={
                                isSongPlayingState === uniqueSongPlayId
                                    ? require("../assets/pause_white.png")
                                    : require("../assets/play.png")
                            }
                            style={styles.smallPlayIcon}
                        />
                    )}
                    {textColor !== "white" && (
                        <Image
                            source={
                                isSongPlayingState === uniqueSongPlayId
                                    ? require("../assets/pause_black.png")
                                    : require("../assets/play_black.png")
                            }
                            style={styles.smallPlayIcon}
                        />
                    )}
                </TouchableOpacity>

                {/* Needs to be updated to navigate */}
                <A href={spotifyUrl}>
                    <TouchableOpacity>
                        {textColor === "white" && (
                            <Image
                                source={require("../assets/spotifyicon_green.png")}
                                style={styles.smallSpotifyIcon}
                            />
                        )}
                        {textColor !== "white" && (
                            <Image
                                source={require("../assets/spotifyicon_black.png")}
                                style={styles.smallSpotifyIcon}
                            />
                        )}
                    </TouchableOpacity>
                </A>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    retuneText: {
        width: Dimensions.get("window").width * 0.5,
        maxHeight: 20,
        fontFamily: "MontserratSemiBold",
        color: "#000000",
        fontSize: 13,
        margin: 1,
    },
    retuneText2: {
        width: Dimensions.get("window").width * 0.5,
        maxHeight: 20,
        fontFamily: "MontserratRegular", //make this medium
        color: "#000000",
        fontSize: 10,
        margin: 1,
    },
    retuneTextWhite: {
        width: Dimensions.get("window").width * 0.5,
        maxHeight: 20,
        fontFamily: "MontserratSemiBold",
        color: "white",
        fontSize: 13,
        margin: 1,
    },
    retuneTextWhite2: {
        width: Dimensions.get("window").width * 0.5,
        maxHeight: 20,
        fontFamily: "MontserratRegular", //make this medium
        color: "white",
        fontSize: 10,
        margin: 1,
    },

    retune1img: {
        width: 45,
        height: 45,
        padding: 2,
        marginRight: 10,
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
        width: 22,
        height: 22,
    },
});

const styles2 = StyleSheet.create({
    retuneText: {
        width: Dimensions.get("window").width * 0.5,
        maxHeight: 20,
        fontFamily: "MontserratSemiBold", //make this medium
        color: "#FFFFFF",
        fontSize: 13,
        margin: 1,
    },
    retuneText2: {
        width: Dimensions.get("window").width * 0.5,
        maxHeight: 20,
        fontFamily: "MontserratRegular", //make this medium
        color: "#FFFFFF",
        fontSize: 10,
        margin: 1,
    },
});
