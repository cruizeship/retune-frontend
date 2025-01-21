import { authRequestWrapper } from "./jwt.js";
import apiUrl from "../config.js";

///////////////////////////////////////////////////////
// Grab user's current location data
// If permission granted, returns
// Object {
//  "coords": Object {
//     "accuracy",
//     "altitude",
//     "altitudeAccuracy",
//     "heading",
//     "latitude",
//     "longitude",
//     "speed",
//   },
//   "timestamp",
// }
// More info:
//  https://docs.expo.dev/versions/latest/sdk/location/
///////////////////////////////////////////////////////

const updateLocation = async (
    latitude,
    longitude,
    userID,
    setUser,
    setErrorMessage
) => {
    return await authRequestWrapper(`${apiUrl}/location/update`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            latitude: latitude,
            longitude: longitude,
            userID: userID, // ? since user may not have signed in dev
        }),
    })
        .then((res) => res.json())
        .then((data) => {
            if (!data.success) {
                setErrorMessage(data.message);
            } else {
                setUser(data.user);
                setErrorMessage("");
            }
        })
        .catch((error) => {
            return error;
        });
};

const getNearbyUsers = async (latitude, longitude, setMarkers, userID) => {
    return await authRequestWrapper(
        `${apiUrl}/location/nearby?latitude=${latitude}&longitude=${longitude}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    )
        .then((res) => res.json())
        .then((data) => {
            setMarkers(
                data.nearbyLocations
                    .filter((user) => userID !== user._id)
                    .map((user) => ({
                        ...user,
                        latitude: user.currentLocation.coordinates[0],
                        longitude: user.currentLocation.coordinates[1],
                        albumImage: user.songsPlayed[0].albumImage,
                    }))
            );
        })
        .catch((error) => {
            console.log(error);
            return error;
        });
};

export { updateLocation, getNearbyUsers };
