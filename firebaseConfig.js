// firebaseConfig.js (en la raíz)
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBW0EK_NFOsv-mDzb-vTB7huEbfmk1eZrQ",
  authDomain: "apk-tickets-pixibytes.firebaseapp.com",
  projectId: "apk-tickets-pixibytes",
  storageBucket: "apk-tickets-pixibytes.firebasestorage.app",
  messagingSenderId: "380950127402",
  appId: "1:380950127402:web:dc68b4efe0c1df95e3f453"
};

// Inicializa la app
const app = initializeApp(firebaseConfig);

// Configura Auth con persistencia en React Native
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

// Firestore y Storage
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
