import * as AuthSession from "expo-auth-session";
import { useAuthRequest } from "expo-auth-session";
import { encode as btoa } from "base-64";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isUnderage } from "./date";
import apiUrl from "../config";
import { authRequestWrapper, deleteJWTtoken } from "./jwt";
import * as crypto from 'expo-crypto';
//import Crypto from 'react-native-quick-crypto';

export const asyncSignUp = async (
    username,
    email,
    password,
    dob,
    inviteCode
) => {
    return await fetch(`${apiUrl}/auth/sign-up`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            email: email.toLowerCase(),
            password,
            dob,
            invite_code: inviteCode,
        }),
    })
        .then((res) => res.json())
        .then(async (data) => {
            if (data.success) {
                await AsyncStorage.setItem("@access_jwt", data.accessJWT);
                await AsyncStorage.setItem("@refresh_jwt", data.refreshJWT);
            }
            return data;
        })
        .catch((error) => {
            return error;
        });
};

export const asyncSignIn = async (emailorusername, password) => {
    const email = isValidEmail(emailorusername)
        ? emailorusername.toLowerCase()
        : "";
    const username = isValidEmail(emailorusername) ? "" : emailorusername;
    return await fetch(`${apiUrl}/auth/sign-in`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
    })
        .then((res) => res.json())
        .then(async (data) => {
            if (data.success) {
                await AsyncStorage.setItem("@access_jwt", data.accessJWT);
                await AsyncStorage.setItem("@refresh_jwt", data.refreshJWT);
            }
            return data;
        })
        .catch((error) => {
            return error;
        });
};

export const asyncDeleteSpotifyData = async () => {
    return await authRequestWrapper(`${apiUrl}/auth/delete-spotify-data`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                return data.user;
            } else {
                // using null to remove token, since this is used as initial state of setUser to signify nobody signed in
                return null;
            }
        })
        .catch((error) => {
            return error;
        });
};

export const asyncDeleteUser = async (username) => {
    return await authRequestWrapper(`${apiUrl}/auth/delete-account`, {
        method: "DELETE",
        body: JSON.stringify({ username }),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            if (data.success) {
                deleteJWTtoken();
            }
        })
        .catch((error) => {
            return error;
        });
};

export const asyncSignOut = async () => {
    await deleteJWTtoken();
};

export const isAllInputsValidSignUp = (
    email,
    username,
    password,
    confirmpassword,
    dob,
    setErrorMessage
) => {
    if (!email) {
        setErrorMessage("Enter an email.");
        return false;
    } else if (!isValidEmail(email)) {
        setErrorMessage("Enter a valid email.");
        return false;
    } else if (!username) {
        setErrorMessage("Enter a username.");
        return false;
    } else if (username.includes("@")) {
        setErrorMessage("Enter a valid username.");
        return false;
    } else if (!password) {
        setErrorMessage("Enter a password.");
        return false;
    } else if (!confirmpassword) {
        setErrorMessage("Please confirm your password.");
        return false;
    } else if (isUnderage(dob)) {
        setErrorMessage("You must be at least 13 years of age to use Retune.");
        return false;
    } else if (!dob) {
        setErrorMessage("Enter a date of birth.");
        return false;
    } else if (password != confirmpassword) {
        setErrorMessage("Passwords do not match.");
        return false;
    }
    return true;
};

export const isAllInputsValidLogin = (
    emailorusername,
    password,
    setErrorMessage
) => {
    if (!emailorusername) {
        setErrorMessage("Enter an email or username.");
        return false;
    } else if (
        emailorusername.includes("@") &&
        !isValidEmail(emailorusername)
    ) {
        setErrorMessage("Enter a valid email.");
        return false;
    } else if (!password) {
        setErrorMessage("Enter a password.");
        return false;
    }
    return true;
};

const getSpotifyCredentials = async () => {
    const response = await fetch(`${apiUrl}/auth/spotify-credentials`);
    return response.json();
};

export const getSpotifyTokens = async (credentials, authCode) => {
  const credsB64 = btoa(
      `${credentials.client_id}:${credentials.client_secret}`
  );
  const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
          Authorization: `Basic ${credsB64}`,
          "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=authorization_code&code=${authCode}&redirect_uri=exp://localhost:8081`,
  });
  const data = await response.json();
  console.log("Spotify token response:", data);
  return data;
};

export const uploadSpotifyTokens = async (
    id,
    accessToken,
    refreshToken,
    expiresIn
) => {
    const response = await fetch(`${apiUrl}/auth/upload-spotify-token-data`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userID: id,
            accessToken,
            refreshToken,
            expiresIn,
        }),
    });
    const data = await response.json();
    return data;
};

export function isValidEmail(email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}
