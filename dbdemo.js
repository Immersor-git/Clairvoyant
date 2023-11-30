// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { doc, setDoc, deleteDoc, getFirestore, getDocs, collection } from "firebase/firestore"; 

import readLine from 'node:readline';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoxmHtBtOCBbFIufp6YYk0XTJAEO8XBxs",
  authDomain: "clairvoyant-test-base.firebaseapp.com",
  projectId: "clairvoyant-test-base",
  storageBucket: "clairvoyant-test-base.appspot.com",
  messagingSenderId: "366901813876",
  appId: "1:366901813876:web:bfafe96cc6850faef66721"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

var rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

var prompts = ["a","Matt","a","Jaelyn","a","Amelia","a","Angelo","r"]
var pc = -1

function tprompt(msg, func) {
    pc += 1
    console.log(msg)
    if (pc >= prompts.length) {
        console.log("Out of inputs")
        return
    }
    console.log(prompts[pc])
    func(prompts[pc])
}

async function writeName(name) {
    setDoc(doc(db, "Stored_Data", name), {
        value: name
    });
}

async function deleteName(name) {
    deleteDoc(doc(db, "Stored_Data", name));
}

async function displayList() {
    console.log("")
    console.log("----Saved Words----");
    const querySnapshot = await getDocs(collection(db,"Stored_Data"))
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id.toString());
    });
    console.log("-------------------");
    console.log("")
}

async function userSelection(c) {

    if (c == "r") {
        console.log("Refreshing...")
        dbDemo()
    } else if (c == "a") {
        tprompt("(?)Enter a word to add:",(s) => {
            writeName(s)
            dbDemo()
        })
    } else if (c == "d") {
        tprompt("(?)Enter a word to remove:",(s) => {
            deleteName(s)
            dbDemo()
        })       
    } else if (c == "q") {
        console.log("Quitting!")
        return;
    } else {
        console.log("Invalid entry. Please try again.")
        dbDemo()
    }
}

async function dbDemo() {
    console.log("")
    await displayList()
    console.log("Commands: q - QUIT / r - refresh database / a - add an item / d - delete an item");
    tprompt("(?) What would you like to do?:",(c) => {
        userSelection(c)
        //console.log("Concluded")
        //rl.close()
    })
}

dbDemo();