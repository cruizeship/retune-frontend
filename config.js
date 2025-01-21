let apiUrl;

if (__DEV__) {
    // Development server URL
    apiUrl = "http://localhost:9000";
} else {
    // Production server URL
    apiUrl = "https://retune-backend.herokuapp.com";
}

export default apiUrl;
