import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebase.config";
const initilizeAuthentication = () => {
    initializeApp(firebaseConfig);
}

export default initilizeAuthentication;