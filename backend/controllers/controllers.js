const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");
const { getFirestore, collection, doc, getDoc } = require("firebase/firestore");
const firebaseConfig = {
    apiKey: process.env.apiKey,
    authDomain: process.env.authDomain,
    projectId: process.env.projectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.messagingSenderId,
    appId: process.env.appId,
    measurementId: process.env.measurementId
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

signInWithEmailAndPassword(auth, process.env.FIREBASE_USER, process.env.FIREBASE_PASS)
    .then(user => {
        console.log('Signed into firebase')
    }).catch(error => {
        console.log(error)
    })

exports.apiTest = async (req, res, next) => {
    const docRef = doc(db, "test", "test document");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        res.status(200).json({
            body: docSnap.data()
        });
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
};