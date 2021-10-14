const firebase = require("firebase/app");
const auth = require("firebase/auth");
const database = require("firebase/database");

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
const app = firebase.initializeApp(firebaseConfig);
const getAuth = auth.getAuth();
const db = database.getDatabase(app);

auth.signInWithEmailAndPassword(getAuth, process.env.FIREBASE_USER, process.env.FIREBASE_PASS)
    .then(user => {
        console.log('Signed into firebase')
    }).catch(error => {
        console.log(error)
    })
    
const dbRef = database.ref(db);

exports.apiTest = async (req, res, next) => {
    database.get(database.child(dbRef, `test`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            res.status(200).json({
                body: snapshot.val()
            });
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
};