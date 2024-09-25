import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDVEiaYRBjr7y8zGFwLuxNbQPF6k0LOBfM",
  authDomain: "job-marketplace-34397.firebaseapp.com",
  projectId: "job-marketplace-34397",
  storageBucket: "job-marketplace-34397.appspot.com",
  messagingSenderId: "455296465362",
  appId: "1:455296465362:web:3c2a918083e7f93dfef00b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
