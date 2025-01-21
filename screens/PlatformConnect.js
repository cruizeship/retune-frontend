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

const discovery = {
  authorizationEndpoint: 'https://accounts.spotify.com/authorize',
  tokenEndpoint: 'https://accounts.spotify.com/api/token',
};

//const redirectUri = "exp://127.0.0.1:8081"
//const client_id = '32c467118f9c4fc38f72501738a50b70'; 
//const client_secret = '64e5a50a9fa34197b4784475a19c7ac4'; 

export default function PlatformConnect({ tokens }) {
  const { User, setUser } = React.useContext(UserContext);
  var { client_id, redirect_uri: redirectUri, scope: scopes } = tokens;
    const [request, response, promptAsync] = useAuthRequest(
      {
        clientId: client_id,
        scopes: [
          "user-read-playback-state",
          "user-read-recently-played",
          "user-read-currently-playing",
          "user-read-private",
          "user-follow-read",
          "user-library-read",
          "user-library-modify",
          "user-read-email",
          "playlist-read-collaborative",
          "playlist-modify-private",
          "playlist-modify-public",
          "user-top-read",
      ],
        usePKCE: false,
        redirectUri,
      },
      discovery
    );

    const connectWithSpotify = async () => {
      try {
          await promptAsync();
      } catch (error) {
          console.log("Error retrieving token data from Spotify: ", error);
      }
  };

  useEffect(() => {
      const upload = async () => {
          if (response?.type === "success") {
              const { code } = response.params;
              console.log("Spotify auth code: ", code);
              try {
                  const { access_token, refresh_token, expires_in } =
                      await getSpotifyTokens(tokens, code); // no need for code_verifier, as it's handled by expo-auth-session
                  console.log("Access token received: ", access_token);

                  // Optionally upload tokens to your backend here
                  if (access_token && refresh_token) {
                      //const user = JSON.parse(User);
                      //console.log(user)
                      const id = User._id;  // Use user ID to associate with the correct account
                      const data = await uploadSpotifyTokens(id, access_token, refresh_token, expires_in);
                      if (data.success) {
                          setUser(data.user);
                      } 
                      console.log(data.user)                     
                  }
              } catch (error) {
                  console.error("Error fetching Spotify tokens: ", error);
              }
          }
      };

      upload();
  }, [response]);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.header}>
                        Connect with a music platform of your choice!
                    </Text>
                </View>

                <TouchableOpacity
                    style={styles.connect_spotify}
                    onPress={connectWithSpotify}
                >
                    <Text style={styles.connectSpotify}>
                        CONTINUE WITH
                        <Text style={styles.connectSpotifyGreen}> SPOTIFY</Text>
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.unavailable_connect}>
                    <Text style={styles.unavailableConnect}>
                        CONTINUE WITH APPLE MUSIC
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.unavailable_connect}>
                    <Text style={styles.unavailableConnect}>
                        CONTINUE WITH SOUNDCLOUD
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text
                        style={styles.why_connect}
                        onPress={() =>
                            Alert.alert(
                                "Retune needs access to Spotify so you can explore what other users are listening to.",
                                ""
                            )
                        }
                    >
                        Why connect?
                    </Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#EE9B00",
        alignItems: "center",
        justifyContent: "center",
    },
    back: {
        alignItems: "stretch",
        justifyContent: "center",
        fontFamily: "GochiHand",
        position: "absolute",
        width: 95,
        height: 20,
        left: 20,
        top: 50,
        fontSize: 24,
    },
    header: {
        fontSize: 36,
        fontWeight: "normal",
        marginBottom: 30,
        fontFamily: "GochiHand",
        textAlign: "center",
    },

    forgot_button: {
        height: 30,
        marginTop: 0,
        marginBottom: 0,
        fontFamily: "ShareTechMono",
    },

    sign_up_button: {
        height: 30,
        marginBottom: 30,
        fontFamily: "ShareTechMono",
    },

    login_button: {
        width: "35%",
        borderWidth: 3,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10,
        backgroundColor: "#A5A6F6",
        fontFamily: "ShareTechMono",
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },

    loginText: {
        fontFamily: "ShareTechMono",
        fontSize: 24,
        fontWeight: "400", //not working ugghhhh
    },
    checkbox: {
        backgroundColor: "#F22424",
        borderRadius: 10,
        borderColor: "#000000",
        borderWidth: 3,
    },

    label: {
        fontFamily: "ShareTechMono",
        fontSize: 20,
        marginLeft: 20,
        lineHeight: 23,
    },

    connect_spotify: {
        backgroundColor: "#F8FDF4",
        borderRadius: 25,
        borderWidth: 1,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },
    connectSpotify: {
        height: 50,
        fontSize: 18,
        flex: 1,
        fontFamily: "ShareTechMono",
        color: "black",
        marginTop: 10,
    },

    connectSpotifyGreen: {
        height: 50,
        fontSize: 18,
        flex: 1,
        fontFamily: "ShareTechMono",
        color: "#1DBA54",
    },

    unavailable_connect: {
        backgroundColor: "#B27400",
        borderRadius: 25,
        borderWidth: 1,
        width: "70%",
        height: 45,
        marginBottom: 20,
        alignItems: "center",
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },

    unavailableConnect: {
        height: 50,
        fontSize: 18,
        flex: 1,
        fontFamily: "ShareTechMono",
        color: "#865700",
        marginTop: 10,
    },

    why_connect: {
        height: 30,
        marginTop: 0,
        marginBottom: 0,
        fontFamily: "ShareTechMono",
        color: "#9B2226",
        marginTop: 40,
        fontSize: 20,
    },
    title: {
        width: 302,
        alignItems: "center",
        marginBottom: 20,
    },
});
