import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Home from "./screens/Home";
import Login from "./screens/Login";
import PlatformConnectLoader from "./screens/PlatformConnectLoader";
import Signup from "./screens/Signup";
import Landing from "./screens/Landing";
import Profile from "./screens/Profile";
import IconInfo from "./components/IconInfo";
import { Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { UserContext } from "./contexts/UserContext";
import PersistLogin from "./components/PersistLogin";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import applyGlobalPolyfills from "./helpers/applyGlobalPolyfills"
applyGlobalPolyfills()

// User isn't signed in
const Stack = createNativeStackNavigator();
const Authenticate = () => {
    return (
        // <Home/>
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Landing">
                <Stack.Screen
                    name="Landing"
                    component={Landing}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Signup"
                    component={Signup}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

// User is signed in but hasn't connected to a music platform
const SecuredWithoutTokens = (info) => {
    console.log("Secured without tokens: " + info)
    console.log("type: " + Object.prototype.toString.call(info))
    return <PlatformConnectLoader />;
};

// User is signed in and has connected to a music platform
const Secured = (info) => {
    console.log("Secured with tokens: " + info)
    return <Home />;
};

export default function App() {
    const [User, setUser] = useState(null);
    const [fontsLoaded] = useFonts({
        MontserratSemiBold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
        MontserratRegular: require("./assets/fonts/MontserratRegular.ttf"),
        MontserratMedium: require("./assets/fonts/MontserratMedium.ttf"),
        ShareTechMono: require("./assets/fonts/ShareTechMono-Regular.ttf"),
        Pacifico: require("./assets/fonts/Pacifico-Regular.ttf"),
        GochiHand: require("./assets/fonts/GochiHand-Regular.ttf"),
    });
    if (!fontsLoaded) return null;

    return (
        <GestureHandlerRootView disallowInterruption={true} style={{ flex: 1 }}>
            <UserContext.Provider value={{ User, setUser }}>
                <PersistLogin>
                    {User ? (
                        User?.tokenData ? (
                            <Secured info={User.tokenData}/>
                        ) : (
                            <SecuredWithoutTokens info={User.tokenData} />
                        )
                    ) : (
                        <Authenticate />
                    )}
                </PersistLogin>
            </UserContext.Provider>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        textAlign: "center",
    },
});
