const firebaseConfig = {
  apiKey: "AIzaSyBvRzBBRw_NWWEKRyiM6yxvXDVQ5Dqxh1E",
  authDomain: "risherley-enterprises-llc.firebaseapp.com",
  projectId: "risherley-enterprises-llc",
  storageBucket: "risherley-enterprises-llc.firebasestorage.app",
  messagingSenderId: "389503467514",
  appId: "1:389503467514:web:6231bf53907778ab0b2e43",
  measurementId: "G-KRMJQMQB5N"
};

// ✅ THIS is the important line
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

// Google login
document.getElementById("loginBtn").onclick = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider);
};

// Logout
document.getElementById("logoutBtn").onclick = () => {
  auth.signOut();
};

// Auth state
auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("logoutBtn").style.display = "inline";
  } else {
    document.getElementById("loginBtn").style.display = "inline";
    document.getElementById("logoutBtn").style.display = "none";
  }
});