import React, { useState, useMemo } from "react";
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Image,
    Animated,
    Easing,
} from "react-native";

const LOADING_TEXT_OPTIONS = [
    "Tuning the last string...",
    "Waiting for the drummer...",
    "Looking over the setlist one last time...",
    "Listening to the opener...",
    "Almost there...",
    "Almost there...",
    "Finding the right rhythm...",
    "Preparing your musical discovery...",
    "Loading musical awesomeness...",
    "Caffeinating the DJ...",
    "Rounding up the melodic unicorns...",
];

export default function Loading() {
    [rotationValue, setRotationValue] = useState(new Animated.Value(0));

    const loading_text = useMemo(
        () =>
            LOADING_TEXT_OPTIONS[
                Math.floor(Math.random() * LOADING_TEXT_OPTIONS.length)
            ],
        []
    );

    Animated.loop(
        Animated.timing(rotationValue, {
            toValue: 1,
            duration: 3000,
            easing: Easing.linear,
            useNativeDriver: true,
        })
    ).start();

    const interpolatedRotation = rotationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ["0deg", "360deg"],
    });

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{loading_text}</Text>
            <View style={styles.record_container}>
                <Image
                    style={styles.record_base}
                    source={require("../assets/record_base.png")}
                ></Image>
                <Animated.Image
                    style={{
                        position: "absolute",
                        left: Dimensions.get("window").width / 2 - 189 / 2,
                        top: 30,
                        height: 189,
                        width: 189,
                        transform: [{ rotate: interpolatedRotation }],
                    }}
                    source={require("../assets/record_disk.png")}
                ></Animated.Image>
                <Image
                    style={styles.record_rod}
                    source={require("../assets/record_rod.png")}
                ></Image>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "#E9D8A6",
    },
    text: {
        paddingTop: 120,
        padding: 56,
        fontSize: 36,
        fontFamily: "GochiHand",
    },
    record_container: {
        width: "100%",
        top: "10%",
    },
    record_base: {
        position: "absolute",
        left: Dimensions.get("window").width / 2 - 126,
        height: 270,
        width: 270,
    },
    record_rod: {
        position: "absolute",
        left: Dimensions.get("window").width / 2 - 16,
        top: 35,
        height: 160,
        width: 101,
    },
});
