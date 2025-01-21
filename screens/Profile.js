import React, { useState } from "react";
import {
    TouchableWithoutFeedback,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    SectionList,
    FlatList,
} from "react-native";
import { SongEntryMain } from "../components/SongEntry";

import { ArtistBubble } from "../components/ArtistBubble";
import { ProfilePlaylist } from "../components/ProfilePlaylist";
import ImageColors from "react-native-image-colors";
import { AudioPlayer } from "../components/AudioPlayer";
import RetuneButton from "../components/RetuneButton";
import {
    asyncDeleteSpotifyData,
    asyncSignOut,
    asyncDeleteUser,
} from "../helpers/auth";

// TO DO: show top artists and playlists

const Data = [
    {
        song: "Turn Me Down",
        name: "Julia Jacklin",
        image: "https://media.pitchfork.com/photos/5c67125be6b62749928fd69f/1:1/w_600/JuliaJacklin_Crushing.jpg",
    },
    {
        song: "Yuck",
        name: "Charli XCX",
        image: "https://i.scdn.co/image/ab67616d0000b273f629eb64fd8ef76a97b154f5",
    },
    {
        song: "Summer's End - Spotify Singles",
        name: "Phoebe Bridgers",
        image: "https://images.genius.com/f7fa9ddeca903435506d1387e5c878bc.640x640x1.jpg",
    },
    {
        song: "You're here that's the thing",
        name: "beabadoobee",
        image: "https://media.pitchfork.com/photos/623a9d636597466fa9d6e2ba/master/w_1280%2Cc_limit/beabadoobee-Beatopia.jpg",
    },
    {
        song: "On Melancholy Hill",
        name: "Gorillaz",
        image: "https://i.scdn.co/image/ab67616d0000b273661d019f34569f79eae9e985",
    },
];

const Playlists = [
    {
        name: "Retune Added Songs",
        image: "https://media.pitchfork.com/photos/5c67125be6b62749928fd69f/1:1/w_600/JuliaJacklin_Crushing.jpg",
    },
    {
        name: "Daily Mix 1",
        image: "https://dailymix-images.scdn.co/v2/img/ab6761610000e5ebb78f77c5583ae99472dd4a49/1/en/large",
    },
    {
        name: "Daily Mix 2",
        image: "https://dailymix-images.scdn.co/v2/img/ab6761610000e5eb9e3acf1eaf3b8846e836f441/2/en/large",
    },
];
const audioPlayer = new AudioPlayer();

export default function Profile(props) {
    const { onRequestClose, recentlyPlayed, username, setUser } = props;
    const [isSongPlayingState, setIsSongPlayingState] = useState(false);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    onRequestClose();
                    audioPlayer.pauseSound();
                }}
                style={styles.back}
            >
                <Image
                    style={styles.backImage}
                    source={require("../assets/back.png")}
                />
            </TouchableOpacity>

            <FlatList
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={
                    <View>
                        <View style={styles.profilePictureContainer}>
                            <Image
                                source={require("../assets/accounticon.png")}
                                style={styles.profileImage}
                            />
                            <Text style={styles.username}>{username}</Text>
                            {/* Add once we get signed up at date */}
                            {/* <Text
                                style={{
                                    color: "#FFFFFF",
                                    fontFamily: "MontserratRegular",
                                    paddingTop: 10,
                                }}
                            >
                                Since November 21, 2022
                            </Text> */}
                        </View>
                        <View style={styles.recents}>
                            <Text style={styles.title}>Recent Retunes</Text>
                        </View>
                    </View>
                }
                data={recentlyPlayed}
                renderItem={({ item }) => {
                    return (
                        <View style={{ alignItems: "center" }}>
                            <SongEntryMain
                                song={item.songName}
                                name={item.artistName}
                                image={item.albumImage}
                                textColor={"white"}
                                spotifyUrl={item.spotifyUrl}
                                playbackURL={item.playbackUrl}
                                uniqueSongPlayId={
                                    item.songUri + item.timePlayed
                                }
                                audioPlayer={audioPlayer}
                                isSongPlayingState={isSongPlayingState}
                                setIsSongPlayingState={setIsSongPlayingState}
                            />
                        </View>
                    );
                }}
                // Add when we have implemented backend route

                // ListFooterComponent={
                //     <View style={{ marginTop: 20 }}>
                //         <Text style={styles.title}>Top Artists</Text>

                //         <View style={styles.topArtistContainer}>
                //             <FlatList
                //                 columnWrapperStyle={styles.columnWrapper}
                //                 numColumns={5}
                //                 data={Data}
                //                 renderItem={({ item }) => {
                //                     return (
                //                         <ArtistBubble
                //                             name={item.name}
                //                             image={item.image}
                //                             textColor={"white"}
                //                             backgroundColor={"black"}
                //                         />
                //                     );
                //                 }}
                //             />
                //         </View>

                //         <Text style={styles.title}>My Playlists</Text>
                //         <View
                //             style={{
                //                 width: Dimensions.get("window").width * 0.9,
                //                 marginTop: 10,
                //                 marginBottom: 40,
                //             }}
                //         >
                //             <View>
                //                 <FlatList
                //                     horizontal={true}
                //                     data={Playlists}
                //                     renderItem={({ item }) => {
                //                         return (
                //                             <ProfilePlaylist
                //                                 image={item.image}
                //                                 playlistName={item.name}
                //                             />
                //                         );
                //                     }}
                //                 />
                //             </View>
                //         </View>
                //     </View>
                // }

                ListFooterComponent={
                    <View style={styles.signOutButton}>
                        <RetuneButton
                            label="Sign out"
                            onPress={() =>
                                asyncSignOutUserAndNavigate(
                                    setUser,
                                    onRequestClose
                                )
                            }
                        ></RetuneButton>
                        <RetuneButton
                            label="Delete account"
                            onPress={() =>
                                asyncDeleteUserAndNavigate(
                                    setUser,
                                    username,
                                    onRequestClose
                                )
                            }
                        ></RetuneButton>
                        <RetuneButton
                            label="Disconnect Spotify account from Retune"
                            onPress={() =>
                                asyncRemoveSpotifyDataAndNavigate(
                                    setUser,
                                    onRequestClose
                                )
                            }
                        ></RetuneButton>
                    </View>
                }
            />
        </View>
    );
}

const asyncRemoveSpotifyDataAndNavigate = async (setUser, onRequestClose) => {
    const newUser = await asyncDeleteSpotifyData();
    setUser(newUser);
    onRequestClose();
};

const asyncSignOutUserAndNavigate = async (setUser, onRequestClose) => {
    await asyncSignOut();
    setUser(null);
    onRequestClose();
};

const asyncDeleteUserAndNavigate = async (
    setUser,
    username,
    onRequestClose
) => {
    await asyncDeleteUser(username);
    setUser(null);
    onRequestClose();
};

const styles = StyleSheet.create({
    signOutButton: {
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
        marginTop: 30,
    },
    container: {
        backgroundColor: "#1C1B1B",
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
    },
    back: {
        flexDirection: "row",
        alignSelf: "flex-start",
        marginLeft: 20,
        marginTop: 50,
        padding: 10,
        borderRadius: 100,
        backgroundColor: "#404040",
    },
    backImage: {
        width: 15,
        height: 15,
    },
    profilePictureContainer: {
        flexDirection: "column",
        paddingTop: 10,
        paddingBottom: 25,
        alignItems: "center",
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 100,
    },
    username: {
        fontFamily: "MontserratSemiBold",
        color: "#FFFFFF",
        fontSize: 18,
        marginTop: 10,
    },
    recents: {
        width: Dimensions.get("window").width * 0.9,
    },
    title: {
        fontFamily: "MontserratSemiBold",
        color: "#FFFFFF",
        fontSize: 18,
        marginBottom: 5,
    },
    topArtistContainer: {
        width: Dimensions.get("window").width * 0.9,
        marginTop: 10,
        backgroundColor: "#363434",
        padding: 10,
        borderRadius: 15,
        flexDirection: "row",
        justifyContent: "flex-start",
        marginBottom: 20,
    },
    columnWrapper: {
        flexWrap: "wrap",
    },
    playlistHeader: {
        fontFamily: "MontserratSemiBold",
        fontSize: 18,
        fontFamily: "MontserratSemiBold",
        color: "#FFFFFF",
        marginBottom: 10,
    },
});
