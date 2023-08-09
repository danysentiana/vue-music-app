// Import the functions you need from the SDKs you need
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCatU1gvODWS7y6Ec9EAMMVXK-AtW1TteM',
  authDomain: 'vue-music-app-7afe8.firebaseapp.com',
  projectId: 'vue-music-app-7afe8',
  storageBucket: 'vue-music-app-7afe8.appspot.com',
  appId: '1:802043124208:web:a393c2634fb1b1216fe535'
}

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig)
