import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDRSztD15QqWToXa0MQ1OYrEeeKjBpoDyg",
  authDomain: "musicplayer-198d3.firebaseapp.com",
  projectId: "musicplayer-198d3",
  storageBucket: "musicplayer-198d3.firebasestorage.app",
  messagingSenderId: "37319870663",
  appId: "1:37319870663:web:e8894cb7840db9ceb216e2",
  measurementId: "G-ZRG4BZ6MEN"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
