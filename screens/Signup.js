import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import { isAllInputsValidSignUp } from "../helpers/auth";
import {
    TouchableWithoutFeedback,
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Keyboard,
    Image,
    Linking,
    Platform,
} from "react-native";
import { asyncSignUp } from "../helpers/auth";
import RNDatePicker from "@react-native-community/datetimepicker";
import { UserContext } from "../contexts/UserContext";
import { Link } from "@react-navigation/native";

export default function Signup({ navigation }) {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [dob, setDob] = useState(new Date());
    const [inviteCode, setInviteCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { setUser } = useContext(UserContext);

    const onPress = async () => {
        if (
            isAllInputsValidSignUp(
                email,
                username,
                password,
                confirmpassword,
                dob,
                setErrorMessage
            )
        ) {
            const resp = await asyncSignUp(
                username,
                email,
                password,
                dob,
                inviteCode
            );
            if (!resp.success) setErrorMessage(resp.message);
            else {
                setUser(resp.user);
                console.log(resp.user);
                setErrorMessage("");
            }
        }
    };

    const ExternalLink = ({ url, text }) => {
        const handleLinkPress = () => {
            Linking.openURL(url);
        };
        return (
            <TouchableOpacity onPress={handleLinkPress}>
                <View>
                    <Text style={styles.termsLinks}>{text}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={styles.content}>
                    <StatusBar style="auto" />
                    <Image
                        source={require("../assets/walkman.png")}
                        style={styles.image}
                    />
                    <Text
                        style={styles.back}
                        onPress={() => navigation.goBack()}
                    >
                        &lt;- Back
                    </Text>
                    <View style={styles.mainscreen}>
                        <Text style={styles.header}>Sign Up</Text>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Email"
                                placeholderTextColor="#000000"
                                onChangeText={(email) => setEmail(email)}
                                secureTextEntry={false}
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Username"
                                placeholderTextColor="#000000"
                                onChangeText={(username) =>
                                    setUsername(username)
                                }
                                secureTextEntry={false}
                                autoCapitalize="none"
                            />
                        </View>
                        <View>
                            <Text style={styles.warning}>
                                *may be shown with your location
                            </Text>
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Create Password"
                                placeholderTextColor="#000000"
                                secureTextEntry
                                onChangeText={(password) =>
                                    setPassword(password)
                                }
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Confirm Password"
                                placeholderTextColor="#000000"
                                secureTextEntry
                                onChangeText={(confirmpassword) =>
                                    setConfirmPassword(confirmpassword)
                                }
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputView}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Invite code"
                                placeholderTextColor="#000000"
                                onChangeText={(inviteCode) =>
                                    setInviteCode(inviteCode)
                                }
                                secureTextEntry={false}
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={styles.birthdayContainer}>
                            <Text style={styles.birthdayText}>Birthday:</Text>
                            <RNDatePicker
                                value={dob}
                                style={styles.birthdayDatePicker}
                                onChange={(datePickerEvent, dob) => {
                                    console.log(dob);
                                    setDob(dob);
                                }}
                            />
                        </View>
                        {errorMessage && (
                            <Text style={styles.error}>{errorMessage}</Text>
                        )}
                        <View style={styles.terms}>
                            <Text style={styles.termsText}>
                                By signing up for Retune, you agree to our
                                <ExternalLink
                                    url="https://docs.google.com/document/d/1TlYSkbjrKW-zhu9C2Nwe8_p4CoRex9UsH5zuCoxJuVM/edit?usp=sharing"
                                    text="Privacy Policy"
                                />
                                {" and "}
                                <ExternalLink
                                    url="https://docs.google.com/document/d/1jDrW9ZyrrwbDBGdqfZQQGmz-in7sAnI_KINwGHxtiP4/edit?usp=sharing"
                                    text="Terms of Service"
                                />
                                .
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={styles.sign_up_button}
                            onPress={onPress}
                        >
                            <Text style={styles.sign_up_text}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    birthdayContainer: {
        width: 322,
        height: 45,
        // backgroundColor: "red",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    birthdayText: {
        fontFamily: "ShareTechMono",
        fontSize: 20,
    },
    birthdayDatePicker: {},
    container: {
        flex: 1,
        backgroundColor: "#EE9B00",
        alignItems: "center",
    },

    content: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        justifyContent: "flex-start",
        paddingTop: 75,
    },

    mainscreen: {
        alignItems: "center",
        marginTop: 55,
    },

    image: {
        position: "absolute",
        resizeMode: "cover",
        height: 580,
        width: 410,
        top: 20,
        right: 0,
    },

    back: {
        //probably need to change the location of the back to work for all screens?
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

    terms: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        marginTop: 10,
        fontSize: 15,
        bottom: 10,
    },

    termsText: {
        fontFamily: "ShareTechMono",
        color: "black",
        textAlign: "center",
        lineHeight: 20,
    },

    termsLinks: {
        fontFamily: "ShareTechMono",
        color: "black",
        textAlignVertical: "center",
        textDecorationLine: "underline",
    },

    error: {
        fontFamily: "ShareTechMono",
        color: "#9B2226",
        padding: 10,
        fontSize: 15,
    },

    warning: {
        fontFamily: "ShareTechMono",
        color: "#9B2226",
        bottom: 10,
        right: 40,
    },

    header: {
        fontSize: 40,
        fontWeight: "bold",
        marginBottom: 20,
        fontFamily: "GochiHand",
    },

    inputView: {
        backgroundColor: "#F8FDF4",
        borderRadius: 10,
        width: 322,
        height: 45,
        marginBottom: 20,
        alignItems: "center",
        borderWidth: 1,
        flexDirection: "row",
        paddingLeft: 10,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },

    textInput: {
        height: 50,
        flex: 1,
        fontSize: 20,
        fontFamily: "ShareTechMono",
        color: "#000000",
        textAlign: "left",
    },

    sign_up_button: {
        width: 179,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#A5A6F6",
        borderWidth: 3,
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 4,
    },

    sign_up_text: {
        fontFamily: "ShareTechMono",
        fontSize: 24,
        fontWeight: "bold", //figure out how to make bold
    },
});
