import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { getDatabase, ref, set, remove } from "firebase/database";




const firebaseConfig = {
    apiKey: "AIzaSyDN_2b0rIJfdOyfJIbjAKWq8F856C178L4",
    authDomain: "listig-47879.firebaseapp.com",
    databaseURL: "https://listig-47879-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "listig-47879",
    storageBucket: "listig-47879.appspot.com",
    messagingSenderId: "311045276627",
    appId: "1:311045276627:web:e2e2850cd0c9d3a0472526",
    measurementId: "G-LRR32ZHYJK"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth();


export function signup(email, password) {

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            //Signed in
            const user = userCredential.user;
            console.log(user)
            /* console.log(auth) */
            const db = getDatabase();
            set(ref(db, 'users/' + user.uid), {
                /* username: name, */
                email: email,
                /* profile_picture : imageUrl */
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage)
        })
}


/* import { getDatabase, ref, set } from "firebase/database";

function writeUserData(userId, name, email, imageUrl) {
  const db = getDatabase();
  set(ref(db, 'users/' + userId), {
    username: name,
    email: email,
    profile_picture : imageUrl
  });
}
 */





export function signin(email, password) {

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            //Signed in
            console.log("Signed in")
            /* const user = userCredential.user; */
            /* console.log("user: " + user) */


            /* if (user !== null) {
                console.log(user.email)
                console.log(user.uid)
            } */
            /* sessionStorage.setItem('authUser', auth.currentUser.uid); */  //Save the signed in user id in session storage

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        })
}
//To get the current user, when user isn't signed in ,return null
const user = auth.currentUser;



//This onAuthStateChanged called automatically after signin fun. and sign out func.
/* onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("User signed In: OnAuthstatgeChanged")
        const uid = user.uid;

        console.log("UID: " + uid)
        setUserId(uid)

    } else {
        //User signed out
        console.log("User signed out: OnAuthstatgeChanged")

    }
}) */




export function doSignOut() {
    signOut(auth).then(() => {
        // Remove all saved data from sessionStorage
        /* sessionStorage.clear(); */
        // Sign-out successful.
        console.log("Sign-out successful")
    }).catch((error) => {
        // An error happened.
        console.log("Erro Sign-out")
    });
}

//update list items 2021/10/27

export function saveItem(authUserId, listName, item) {

    const db = getDatabase();
    set(ref(db, 'users/' + authUserId + '/lists/' + listName + '/' + item.value), {
        id: item.id,
        label: item.label,
        green_points: item.green_points,
        quantity_type: item.quantity_type,
        quantity: '1',
        category: item.category,
        group: item.group,
        isSelected: false
    })
        .then(() => {
            console.log("Item saved successfully")
        })
        .catch((error) => {
            console.log(error);
        })
}

export function deleteItem(authUserId, listName, item) {

    const db = getDatabase();

    remove(ref(db, 'users/' + authUserId + '/lists/' + listName + '/' + item.value))
        .then(() => {
            console.log("Item deleted")
        })
        .catch((error) => {
            console.log(error);
        })
}




