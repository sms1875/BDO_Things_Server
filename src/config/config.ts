import dotenv from "dotenv";

dotenv.config();

interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId?: string;
}

interface Config {
    port: string | undefined;
    //firebaseConfig: FirebaseConfig;
}

const config: Config = {
    port: process.env.PORT || "8080"
    /*
    firebaseConfig: {
        apiKey: process.env.FIREBASE_API_KEY ?? "YOUR_API_KEY",
        authDomain: process.env.FIREBASE_AUTH_DOMAIN ?? "YOUR_AUTH_DOMAIN",
        projectId: process.env.FIREBASE_PROJECT_ID ?? "YOUR_PROJECT_ID",
        storageBucket:
            process.env.FIREBASE_STORAGE_BUCKET ?? "YOUR_STORAGE_BUCKET",
        messagingSenderId:
            process.env.FIREBASE_MESSAGING_SENDER_ID ??
            "YOUR_MESSAGING_SENDER_ID",
        appId: process.env.FIREBASE_APP_ID ?? "YOUR_APP_ID",
        measurementId:
            process.env.FIREBASE_MEASUREMENT_ID || "YOUR_MEASUREMENT_ID"
    }
    */
};

export default config;
