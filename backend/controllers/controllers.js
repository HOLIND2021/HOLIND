const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");
const { getFirestore, collection, doc, getDoc, query, getDocs, setDoc } = require("firebase/firestore");
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

exports.patients = async (req, res, next) => {
    const q = query(collection(db, "patients"));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        res.status(404).json({
            message: "Patients not found"
        })
        return
    }
    let patientArray = [];
    querySnapshot.forEach((doc) => {
        patientArray.push(doc.data());
    })
    res.status(200).json({
        body: patientArray
    });
}

exports.user = async (req, res, next) => {
    const uid = req.params.uid;
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        res.status(200).json({
            body: docSnap.data()
        })
    } else {
        res.status(404).json({
            message: "User not found"
        })
    }
}

exports.createUser = async (req, res, next) => {
    const body = req.body;
    const uid = body.uid;
    const firstName = body.firstName;
    const lastName = body.lastName;

    await setDoc(doc(db, "users", uid), {
        firstName,
        lastName
    })

    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        res.status(201).json({
            body: docSnap.data()
        })
    } else {
        res.status(500).json({
            message: "Error creating user document"
        })
    }
}