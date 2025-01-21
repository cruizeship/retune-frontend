import AsyncStorage from "@react-native-async-storage/async-storage";
import apiUrl from "../config";

const authRequestWrapper = async (url, config = {}) => {
    var accessJWT = await AsyncStorage.getItem("@access_jwt");
    const refreshJWT = await AsyncStorage.getItem("@refresh_jwt");

    config["headers"].Authorization = `Bearer ${accessJWT}`;
    let response = await fetch(url, config);

    // if access token is invalid
    if (response.status === 403) {
        if (!(await refreshJWTtoken(refreshJWT))) {
            return;
        }
        accessJWT = await AsyncStorage.getItem("@access_jwt");
        config["headers"].Authorization = `Bearer ${accessJWT}`;
        return await fetch(url, config);
    } else if (response.status == 401) {
        await asyncDeleteJWTtoken();
    } else {
        return response;
    }
};

const refreshJWTtoken = async (refreshJWT) => {
    return await fetch(`${apiUrl}/jwt/refresh`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshJWT}`,
        },
    })
        .then((res) => {
            if (res._bodyBlob.type === "text/plain") {
                throw new Error("Not signed in");
            }
            return res.json();
        })
        .then(async (data) => {
            if (!data.success) {
                await asyncDeleteJWTtoken();
                return false;
            } else {
                await AsyncStorage.setItem("@access_jwt", data.accessJWT);
                return true;
            }
        })
        .catch(async (error) => {
            await asyncDeleteJWTtoken();
            return false;
        });
};

const asyncDeleteJWTtoken = async () => {
    await AsyncStorage.removeItem("@access_jwt");
    await AsyncStorage.removeItem("@refresh_jwt");
};

export {
    authRequestWrapper,
    refreshJWTtoken,
    asyncDeleteJWTtoken as deleteJWTtoken,
};
