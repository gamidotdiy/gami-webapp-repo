import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const fallbackConfig = {
  apiKey: "AIzaSyCAQax-Zv7cRc0P6BXVvJeRNWE1_2HZi00",
  authDomain: "gami-dashboard.firebaseapp.com",
  projectId: "gami-dashboard",
  appId: "1:361459041850:web:f15a39999dcad54f039703",
};

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? fallbackConfig.apiKey,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? fallbackConfig.authDomain,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? fallbackConfig.projectId,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? fallbackConfig.appId,
};

function assertConfig(config: typeof firebaseConfig) {
  const missing = Object.entries(config)
    .filter(([, value]) => !value)
    .map(([key]) => key);
  if (missing.length) {
    throw new Error(
      `Missing Firebase config values: ${missing.join(", ")}. Please set NEXT_PUBLIC_FIREBASE_* env vars.`,
    );
  }
}

assertConfig(firebaseConfig);

const firebaseApp = getApps().length ? getApp() : initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
