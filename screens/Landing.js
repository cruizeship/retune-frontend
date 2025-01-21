import React, { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
    TouchableWithoutFeedback,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Keyboard,
} from "react-native";
import RetuneButton from "../components/RetuneButton";

export default function Landing({ navigation }) {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <StatusBar style="auto" />

                <View styles={styles.uppercontainer}>
                    <Text style={styles.header1}>Retune</Text>
                    <Text style={styles.header2}>Retune</Text>
                    <Text style={styles.header3}>Retune</Text>
                    <Text style={styles.header4}>Retune</Text>
                    <Text style={styles.slogan}>
                        Music discovery reimagined.
                    </Text>
                </View>

                <View style={styles.lowercontainer}>
                    <RetuneButton
                        label="Create Account"
                        onPress={() => navigation.navigate("Signup")}
                    ></RetuneButton>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={styles.sign_in}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#9B2226",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        justifyContent: "space-between",
    },

    uppercontainer: {
        alignItems: "center",
        position: "absolute",
        flex: 1,
        justifyContent: "center",
    },

    //farthest bottom header
    header1: {
        fontSize: 64,
        fontWeight: "bold",
        fontFamily: "Pacifico",
        color: "#0A9396", //blue
        position: "absolute",
        top: 147,
        left: -100,
    },
    header2: {
        fontSize: 64,
        fontWeight: "bold",
        fontFamily: "Pacifico",
        color: "#94D2BD",
        margin: 0,
        position: "absolute",
        top: 143,
        left: -96,
    },
    header3: {
        fontSize: 64,
        fontWeight: "bold",
        fontFamily: "Pacifico",
        color: "#E9D8A6",
        margin: 0,
        position: "absolute",
        top: 139,
        left: -92,
    },
    //farthest top header
    header4: {
        fontSize: 64,
        fontWeight: "bold",
        fontFamily: "Pacifico",
        color: "#EE9B00", //orange
        margin: 0,
        position: "absolute",
        top: 135,
        left: -88,
    },

    lowercontainer: {
        alignItems: "center",
        position: "absolute",
        flex: 1,
        justifyContent: "center",
        padding: 40,
        marginTop: 500,
    },

    slogan: {
        color: "#E9D8A6",
        fontFamily: "ShareTechMono",
        fontSize: 20,
        position: "absolute",
        top: 276,
        right: -150,
    },

    terms: {
        fontFamily: "ShareTechMono",
        color: "#94D2BD",
        fontSize: 12,
        textAlign: "center",
    },

    sign_in: {
        fontFamily: "ShareTechMono",
        fontSize: 24,
        color: "#E9D8A6",
        fontWeight: "bold",
    },
});
