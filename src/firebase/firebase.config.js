import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCABqUPBStE8feFwszlDcUE9mk6kli4iS0",
  authDomain: "spark-web-app-cb681.firebaseapp.com",
  projectId: "spark-web-app-cb681",
  storageBucket: "spark-web-app-cb681.firebasestorage.app",
  messagingSenderId: "1080837465502",
  appId: "1:1080837465502:web:8c292b568d4a81dbe7a28f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export default app;
