import { initializeApp } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-app.js";
import { getAuth, signInAnonymously } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-auth.js";


import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/12.14.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyDFoCckEnk_OGR0iKNHikVvbUB6nlcSfQc",
  authDomain: "sekino-ap.firebaseapp.com",
  projectId: "sekino-ap",
  storageBucket: "sekino-ap.firebasestorage.app",
  messagingSenderId: "1005332313738",
  appId: "1:1005332313738:web:8732f604340bbfb7259f73",
  measurementId: "G-EL390K6TXS"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

signInAnonymously(auth)
.then(async (userCredential) => {

    const uid = userCredential.user.uid;

await setDoc(
    doc(db, "users", uid),
    {
        coins: Number(localStorage.getItem("coins")) || 20,
        xp: Number(localStorage.getItem("xp")) || 0,
        tickets: Number(localStorage.getItem("tickets")) || 0,
        streak: Number(localStorage.getItem("streak")) || 1
    },
    { merge: true }
);

    localStorage.setItem(
        "firebaseUid",
        uid
    );

    console.log("Firebase UID:", uid);

})
.catch((error) => {

    console.log(
        "Firebase Error:",
        error.code,
        error.message
    );

});