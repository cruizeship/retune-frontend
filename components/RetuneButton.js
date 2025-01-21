import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";

const RetuneButton = ({ label, onPress }) => {
    return (
        <View>
            <TouchableOpacity
                style={styles.buttonStyles}
                onPress={() => {
                    onPress && onPress();
                }}
            >
                <Text
                    adjustsFontSizeToFit={true}
                    numberOfLines={1}
                    style={styles.buttonText}
                >
                    {label && label}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    buttonStyles: {
        borderRadius: 50,
        paddingHorizontal: 30,
        marginHorizontal: 30,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#E9D8A6",
        borderWidth: 3,
        marginBottom: 10,
    },
    buttonText: {
        fontFamily: "ShareTechMono",
        fontSize: 24,
        fontWeight: "400",
    },
});

export default RetuneButton;
