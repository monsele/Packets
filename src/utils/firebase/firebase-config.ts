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
  apiKey: "AIzaSyDZfPzBYJlx9nl8J6i5e0ix82k_w6bPPjc",
  authDomain: "coinamix-60511.firebaseapp.com",
  databaseURL: "https://coinamix-60511-default-rtdb.firebaseio.com",
  projectId: "coinamix-60511",
  storageBucket: "coinamix-60511.appspot.com",
  messagingSenderId: "3534630108",
  appId: "1:3534630108:web:7e2e8c5ce68a3b8fd59819",
  measurementId: "G-BPBH35J0XZ",
};

// Initialize Firebase
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
}
export const isImageValid = (file: File) => {
  const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
  const maxFileSizeInBytes = maxFileSizeInKB * 1024;

  if (!validImageTypes.includes(file.type)) {
    return false;
  }

  if (file.size > maxFileSizeInBytes) {
    return false;
  }
  return true;
}
