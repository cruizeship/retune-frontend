import React, { useState, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import { isAllInputsValidLogin } from "../helpers/auth";
import {
    TouchableWithoutFeedback,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Keyboard,
    Image,
} from "react-native";
import { asyncSignIn } from "../helpers/auth";
import { UserContext } from "../contexts/UserContext";

export default function Login({ navigation }) {
    const [emailorusername, setEmailorUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const ref_input2 = useRef();
    const { setUser } = React.useContext(UserContext);

    const onPress = async () => {
        if (isAllInputsValidLogin(emailorusername, password, setErrorMessage)) {
            let resp = await asyncSignIn(emailorusername, password);
            if (!resp.success) {
                setErrorMessage(resp.message);
            } else {
                setUser(resp.user);
                setErrorMessage("");
            }
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
                <Image
                    source={require("../assets/leftcd.png")}
                    style={styles.leftCD}
                />
                <Image
                    source={require("../assets/rightcd.png")}
                    style={styles.rightCD}
                />

                <StatusBar style="auto" />
                <Text style={styles.back} onPress={() => navigation.goBack()}>
                    &lt;- Back
                </Text>
                <Text style={styles.header}>Sign In</Text>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Username or Email"
                        placeholderTextColor="#000000"
                        onChangeText={(email) => setEmailorUsername(email)}
                        secureTextEntry={false}
                        onSubmitEditing={() => ref_input2.current.focus()}
                        autoCapitalize="none"
                    />
                </View>

                <View style={styles.inputView}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Password"
                        placeholderTextColor="#000000"
                        secureTextEntry
                        onChangeText={(password) => setPassword(password)}
                        ref={ref_input2}
                        autoCapitalize="none"
                    />
                </View>
                {/* <TouchableOpacity>
                    <Text style={styles.forgot_button}>Forgot Password?</Text>
                </TouchableOpacity> */}
                {errorMessage && (
                    <View>
                        <Text style={styles.error}>{errorMessage}</Text>
                    </View>
                )}
                <TouchableOpacity style={styles.login_button} onPress={onPress}>
                    <Text style={styles.loginText}>Log In</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#EE9B00",
        alignItems: "center",
        justifyContent: "flex-start",
        paddingTop: 125,
    },
    error: {
        fontFamily: "ShareTechMono",
        color: "#9B2226",
        padding: 10,
        fontSize: 15,
        textAlign: "center",
        width: "100%",
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
        fontSize: 48,
        fontWeight: "bold",
        marginBottom: 20,
        fontFamily: "GochiHand",
    },
    inputView: {
        backgroundColor: "#F8FDF4",
        borderRadius: 10,
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

    textInput: {
        height: 50,
        fontSize: 20,
        flex: 1,
        textAlign: "center",
        width: "100%",
        fontFamily: "ShareTechMono",
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
        marginTop: 10,
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
        fontWeight: "400",
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
        lineHeight: 23,
        margin: 10,
    },

    leftCD: {
        flex: 1,
        width: "35%",
        height: "35%",
        resizeMode: "cover",
        position: "absolute",
        opacity: 0.3,
        top: 470,
        left: 40,
    },

    rightCD: {
        flex: 1,
        //width: '35%',
        //height: '35%',
        resizeMode: "cover",
        position: "absolute",
        opacity: 0.3,
        top: 500,
        left: 200,
    },
});
