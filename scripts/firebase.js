import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";

const firebaseConfig = {
     apiKey: "AIzaSyCi4062bVYgTOR1XKJ6GllMP-PWRhKkYH0",
     authDomain: "form-65052.firebaseapp.com",
     databaseURL: "https://form-65052-default-rtdb.asia-southeast1.firebasedatabase.app",
     projectId: "form-65052",
     storageBucket: "form-65052.appspot.com",
     messagingSenderId: "555563236817",
     appId: "1:555563236817:web:33fb4181747edbd41b34f0",
     measurementId: "G-MCTQ644LX8"
}

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default {app,analytics}