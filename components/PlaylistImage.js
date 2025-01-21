import { StyleSheet, View, Image } from "react-native";
import React from "react";

export default PlaylistImage = (props) => {
    const { images } = props;

    return (
        <View style={styles.playlistImagesContainer}>
            {renderImages(images)}
        </View>
    );
};

const renderImages = (images) => {
    switch (images.length) {
        case 1:
        case 2:
        case 3: {
            return (
                <View style={styles.playlistImagesContainer}>
                    <Image
                        style={styles.playlist1Image}
                        source={{ uri: images[0].url }}
                    />
                </View>
            );
        }
        case 4: {
            return (
                <View style={styles.playlistImagesContainer}>
                    {images.map((image, iterator) => (
                        <Image
                            style={styles.playlist4Image}
                            source={{ uri: image.url }}
                            key={iterator}
                        />
                    ))}
                </View>
            );
        }
        default: {
            return (
                <Image
                    style={styles.playlist1Image}
                    source={require("../assets/playlistdefaultimage.png")}
                />
            );
        }
    }
};

const styles = StyleSheet.create({
    playlistImagesContainer: {
        width: 50,
        height: 50,
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        backgroundColor: "green",
    },
    // One image fills whole image
    playlist1Image: {
        width: 50,
        height: 50,
    },
    // Four images take up image
    playlist4Image: {
        width: 25,
        height: 25,
    },
});
