import React, { useState, useEffect, Fragment } from "react";
import { Text } from "react-native";
import { refreshJWTtoken } from "../helpers/jwt";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../contexts/UserContext";
import apiUrl from "../config";

const PersistLogin = (props) => {
    const [isLoading, setIsLoading] = useState(true);

    const { setUser } = React.useContext(UserContext);

    useEffect(() => {
        (async () => {
            const verifyRefreshToken = async () => {
                try {
                    const refreshJWT = await AsyncStorage.getItem(
                        "@refresh_jwt"
                    );

                    await refreshJWTtoken(refreshJWT);
                } catch (err) {
                    console.error(err);
                }
            };

            // Avoids unwanted call to verifyRefreshToken

            await verifyRefreshToken();
            var access_jwt = await AsyncStorage.getItem("@access_jwt");
            if (access_jwt !== null) {
                await fetch(`${apiUrl}/jwt/sign-in`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${access_jwt}`,
                    },
                })
                    .then((res) => res.json())
                    .then((data) => {
                        setUser(data.user);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }
            setIsLoading(false);
        })();
    }, []);
    return <>{isLoading ? <></> : <>{props.children}</>}</>;
};

export default PersistLogin;
