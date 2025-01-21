import React, { useState, useEffect } from "react";
import {
    TouchableWithoutFeedback,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    Keyboard,
    Linking,
} from "react-native";
import { getSpotifyTokens, uploadSpotifyTokens } from "../helpers/auth";
import { UserContext } from "../contexts/UserContext";
import apiUrl from "../config";
import {
    useAuthRequest,
    makeRedirectUri,
    ResponseType,
} from "expo-auth-session";
import PlatformConnect from "./PlatformConnect";

export default function PlatformConnectLoader({ navigation }) {
    const { User, setUser } = React.useContext(UserContext);
    const [isLoading, setIsLoading] = useState(false);
    const [connectTokens, setConnectTokens] = useState(null);
    console.log("initialize PlatformConnectLoader")

    useEffect(() => {
        const myfunction = async () => {
            console.log("running async myfunction")
            const response = await fetch(`${apiUrl}/auth/spotify-credentials`);
            const tokens = await response.json();
            console.log("generated these guys: " + tokens);
            setConnectTokens(tokens);
            setIsLoading(false);
            console.log("finishing async myfunction")
        };
        myfunction();
    }, []);

    console.log("tokens before render: " + connectTokens)
    console.log(connectTokens == null)

    if (connectTokens == null) {
      return (<Text>hi</Text>);
    } else {
      return (<PlatformConnect tokens={connectTokens}></PlatformConnect>)
    }
}

const styles = StyleSheet.create({
    ViewContainer: {
        height: "100%",
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "green",
    },
});
