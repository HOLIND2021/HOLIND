const { initializeApp } = require("firebase/app");
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");
const { getFirestore, collection, doc, getDoc, query, getDocs, addDoc, setDoc, updateDoc, arrayUnion, arrayRemove } = require("firebase/firestore");
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
    }).catch(error => {
        console.log(error)
    })

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
        let patientObject = Object.assign({uid: doc.id}, doc.data())
        patientArray.push(patientObject);
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
    const role = body.role;
    const pid = body.pid;

    if (pid) {
        await setDoc(doc(db, "users", uid), {
            firstName,
            lastName,
            role,
            pid
        })
    } else {
        await setDoc(doc(db, "users", uid), {
            firstName,
            lastName,
            role        
        })
    }

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

exports.createPatient = async (req, res, next) => {
    const body = req.body;
    const first = body.first;
    const last = body.last;
    const cuid = body.cuid;

    const docRef = await addDoc(collection(db, 'patients'), {
        first,
        last,
        cuid,
        exercises: [],
        registered: false
    })

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        res.status(201).json({
            body: docSnap.data()
        })
    } else {
        res.status(500).json({
            message: "Error creating patient"
        })
    }
}

exports.updatePatient = async (req, res, next) => {
    const body = req.body;
    const uid = body.puid;
    const title = body.title;
    const status = body.status;
    const caldate = body.caldate;
    const registered = body.registered;

    if (registered) {
        await updateDoc(doc(db, "patients", uid), {
            registered
        })
    } else {
        await updateDoc(doc(db, "patients", uid), {
            exercises: arrayUnion({name: title, due: caldate, status: status})
        })
    }

    const docRef = doc(db, "patients", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        res.status(201).json({
            body: docSnap.data()
        })
    } else {
        res.status(500).json({
            message: "Error modifying patient document"
        })
    }
}

exports.updateExercise = async (req, res, next) => {
    const body = req.body;
    const uid = body.puid;
    const oldTitle = body.oldTitle;
    const title = body.title;
    const status = body.status;
    const caldate = body.caldate

    const docRef = doc(db, "patients", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        let exercises = docSnap.data().exercises;
        exercises = exercises.map((exercise) => {
            if (exercise.name === oldTitle) {
                return {
                    due: caldate,
                    name: title,
                    status: status
                }
            } else return exercise;
        })

        await updateDoc(doc(db, "patients", uid), {
            exercises: exercises
        })
        res.status(204);
        res.json({
            "exercises": docSnap.data()
        });
    } else {
        res.status(500).json({
            message: "Error modifying patient document"
        })
    }
    
}

exports.getPatient = async (req, res, next) => {
    const uid = req.params.uid;

    const docRef = doc(db, "patients", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        res.status(200).json({
            body: docSnap.data()
        })
    } else {
        res.status(404).json({
            message: "Patient not found"
        })
    }
}

exports.deleteTask = async (req, res, next) => {
    const body = req.body;
    const uid = body.puid;
    const title = body.title;
    const status = body.status;
    const caldate = body.caldate

    await updateDoc(doc(db, "patients", uid), {
        exercises: arrayRemove({due: caldate, name: title, status: status})
    })

    const docRef = doc(db, "patients", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        res.status(200).json({
            body: docSnap.data()
        })
    } else {
        res.status(404).json({
            message: "Error deleting task"
        })
    }
}
exports.deleteUser = async (req, res, next) => {
    const uid = req.params.uid;

    const docRef = doc(db, "users", uid);
    await deleteDoc(docRef);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        res.status(500).json({
            message: 'Failed to delete user: ' + uid
        })
    } else {
        res.status(204).json({
            message: 'User deleted: ' + uid
        })
    }
}