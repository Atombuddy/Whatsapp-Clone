import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyCbxLpKIQ0p28elkTSW8ujybIwCvEYNOXs",
    authDomain: "whatsapp-clone-5f602.firebaseapp.com",
    projectId: "whatsapp-clone-5f602",
    storageBucket: "whatsapp-clone-5f602.appspot.com",
    messagingSenderId: "930601455873",
    appId: "1:930601455873:web:ae5738f19028f2d7688b00"
};

const firebaseApp=firebase.initializeApp(firebaseConfig)
const db=firebaseApp.firestore()
const auth=firebaseApp.auth()
const provider = new firebase.auth.GoogleAuthProvider();

export {auth,provider}
export default db;