// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyDdD1eQm9mHr2StkwJhJlTEI-pAJXoaNd4",
//   authDomain: "packets-96e95.firebaseapp.com",
//   projectId: "packets-96e95",
//   storageBucket: "packets-96e95.firebasestorage.app",
//   messagingSenderId: "476670515525",
//   appId: "1:476670515525:web:1908cb34e1e5a638a4462c",
//   measurementId: "G-W1C8679L8X",
// };

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
console.log(firebaseConfig);

const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
const maxFileSizeInKB = 100;
export const storage = getStorage(app);
export const handleUploadFile = async (uploadFile: File | null) => {
  if (!uploadFile) {
    //showErrorToast("No file selected.");
    console.log("No file selected.");

    return null;
  }

  // Only validate images
  // if (fileType === "image" && !isImageValid(uploadFile)) {
  //   //showErrorToast("Invalid image file.");
  //   console.log("Invalid image file.");
  //   return null;
  // }

  try {
    const fileRef = ref(storage, uploadFile.name);
    const snapshot = await uploadBytes(fileRef, uploadFile);
    const url = await getDownloadURL(snapshot.ref);
    console.log(url);

    //showSuccessToast("File uploaded successfully");
    return url;
  } catch (error) {
    console.error("Upload error:", error);
    //showErrorToast("Failed to upload file");
    return null;
  }
};
export const isImageValid = (file: File) => {
  const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
  const maxFileSizeInBytes = maxFileSizeInKB * 1024;

  if (!validImageTypes.includes(file.type)) {
    return false;
  }

  if (file.size > maxFileSizeInBytes) {
    return false;
  }
  return true;
};
