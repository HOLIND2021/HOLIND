const { initializeApp } = require("firebase/app");
import firebase from "firebase/app";
const { getAuth, signInWithEmailAndPassword } = require("firebase/auth");
const { getFirestore, collection, doc, getDoc, query, getDocs, setDoc } = require("firebase/firestore");
import { attachCustomCommands } from "cypress-firebase";

const fbConfig = {
    apiKey:"AIzaSyAx0rkiVOeY1gkpz8Y99fEMd_siEKai540",
    authDomain:"holind-a4624.firebaseapp.com",
    projectId:"holind-a4624",
    storageBucket:"holind-a4624.appspot.com",
    messagingSenderId:"122590760249",
    appId:"1:122590760249:web:f3a80100b3907f022c6ce8",
    measurementId:"G-99NJ961GLR"
};


initializeApp(fbConfig);
const auth = getAuth();
const db = getFirestore();


attachCustomCommands({ Cypress, cy, firebase });



// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
