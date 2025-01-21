import React, {
    useState,
    useEffect,
    useRef,
    useMemo,
} from "react";
import {
    AppState,
    StyleSheet,
    Modal,
    Text,
    View,
    Image,
    TouchableOpacity,
} from "react-native";
import * as Location from "expo-location";
import Profile from "./Profile";
import IconInfo from "../components/IconInfo";
import BottomSheet from "@gorhom/bottom-sheet";
import { UserContext } from "../contexts/UserContext";
import { getNearbyUsers, updateLocation } from "../helpers/location";
import Loading from "../screens/Loading";
import LocationFeedback from "../screens/LocationFeedback";
import { isEmpty } from "../helpers/array";
import Map from "../components/Map";

export default function Home() {
    const [markers, setMarkers] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [currentLongitude, setCurrentLongitude] = useState(null);
    const [currentLatitude, setCurrentLatitude] = useState(null);
    const [isProfilePageOpen, setIsProfilePageOpen] = useState(false);
    const { User, setUser } = React.useContext(UserContext);
    const [bottomSheetData, setBottomSheetData] = useState({
        songsPlayed: User.songsPlayed,
        username: User.username,
    });
    const [permissionGranted, setPermissionGranted] =  useState(false);
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        const locationUpdatesByDist = async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === "granted") {
                setPermissionGranted(true);
            }
            else {
                setPermissionGranted(false);
            }
            await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    distanceInterval: 80,
                },
                async (location) => {
                    console.log(location);
                    const { latitude, longitude } = location.coords;
                    setCurrentLatitude(latitude);
                    setCurrentLongitude(longitude);
                    updateLocation(
                        latitude,
                        longitude,
                        User?._id,
                        setUser,
                        setErrorMessage
                    );
                    getNearbyUsers(latitude, longitude, setMarkers, User._id);
                }
            );
        };
        locationUpdatesByDist();

        const locationUpdatesByTime = async () => {
            if (currentLatitude !== null && currentLongitude !== null) {
                getNearbyUsers(
                    currentLatitude,
                    currentLongitude,
                    setMarkers,
                    User._id
                );
            }
        };
        const interval = setInterval(locationUpdatesByTime, 10000);

        const subscription = AppState.addEventListener('change', nextAppState => {
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                locationUpdatesByDist();
            }
            appState.current = nextAppState;
        });

        return () => {
            clearInterval(interval);
            subscription.remove();
        };
    }, []);

    const profileMemo = useMemo(() => {
        return (
            <Profile
                recentlyPlayed={User.songsPlayed}
                username={User.username}
                setUser={setUser}
                onRequestClose={() => setIsProfilePageOpen(false)}
            />
        );
    }, [User]);

    // ref
    const bottomSheetRef = useRef(null);

    // variables
    const snapPoints = useMemo(() => ["30%", "75%"], []);

    const loadingScreen = useMemo(() => <Loading></Loading>, []);
    const locationFeedbackScreen = useMemo(() => <LocationFeedback></LocationFeedback>, []);

    return currentLatitude === null || currentLongitude === null || !permissionGranted ? (
        //loadingScreen
        permissionGranted === true ? ( loadingScreen ) : ( locationFeedbackScreen )
    ) : (
        <View style={styles.container}>
            {/* Profile icon */}
            <TouchableOpacity
                onPress={() => setIsProfilePageOpen(!isProfilePageOpen)}
                style={styles.accountIconContainer}
            >
                <Image
                    source={require("../assets/account.png")}
                    style={styles.accountIcon}
                />
            </TouchableOpacity>
            {/* Map */}
            <Map
                markers={markers}
                currentLongitude={currentLongitude}
                setCurrentLongitude={setCurrentLongitude}
                currentLatitude={currentLatitude}
                setCurrentLatitude={setCurrentLatitude}
                bottomSheetData={bottomSheetData}
                setBottomSheetData={setBottomSheetData}
                bottomSheetRef={bottomSheetRef}
            />
            {/* Bottom sheet */}
            {!isEmpty(User.songsPlayed) && (
              
                <BottomSheet
                    ref={bottomSheetRef}
                    index={1}
                    snapPoints={snapPoints}
                    enablePanDownToClose={false}
                    enableDynamicSizing={false}
                > 
                 
                    <IconInfo
                        recentlyPlayed={bottomSheetData.songsPlayed}
                        username={bottomSheetData.username}
                    />
                </BottomSheet>
            )}
            {/* Open profile page */}
            {isProfilePageOpen && (
                <Modal animationType="slide">{profileMemo}</Modal>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    accountIconContainer: {
        position: "absolute",
        top: 40,
        right: 5,
        zIndex: 1,
    },
    accountIcon: {
        height: 40,
        width: 40,
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        zIndex: -1,
    },
});
