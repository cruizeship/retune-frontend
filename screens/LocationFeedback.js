import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Linking,
    ScrollView,
} from "react-native";
import RetuneButton from "../components/RetuneButton";

export default function LocationFeedback() {
    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>{"without a location, Retune won't work"}</Text>
                <Text style={styles.subtitle}>{"HOW RETUNE WORKS"}</Text>
                <Text style={styles.text}>{"Enabling location access will provide us the ingredients needed to let you discover new music based on where you are located. By changing the music suggestion paradigm from similarity to location-based, we're making it easier than ever for you to discover new and amazing music!"}</Text>
                <Text style={styles.subtitle}>{"LISTEN IN PEACE"}</Text>
                <Text style={styles.text}>{"We do not share location or music data with anyone. All personal information is kept private and secure."}</Text>
                <Text style={styles.smalltitle}>{"Will You Enable Us To Access Your Location?"}</Text>
                <RetuneButton
                    label="Go to Settings"
                    onPress={() => Linking.openSettings()}
                ></RetuneButton>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
    },
    title: {
        paddingTop: 90,
        padding: 36,
        fontSize: 36,
        fontFamily: "GochiHand",
        color: "#e8a138",
        textAlign: "center",
    },
    smalltitle: {
        padding: 32,
        fontSize: 28,
        fontFamily: "GochiHand",
        color: "#e8a138",
        textAlign: "center",
    },
    subtitle: {
        padding: 10,
        fontSize: 20,
        fontFamily: "GochiHand",
        color: "#a2d2bf",
        textAlign: "center",
    },
    text: {
        padding: 24,
        fontSize: 18,
        fontFamily: "MontserratSemiBold",
        color: "#b0a483",
        textAlign: "center",
    },
});
