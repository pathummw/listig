import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, ref, set, remove } from "firebase/database";
import swal from 'sweetalert';



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

            swal({
                title: `${errorCode}`,
                text: `${errorMessage}`,
                icon: "error",
                button: "Okej",
            });
        })
}



export function signin(email, password) {

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            //console.log("Signed in")
            /* sessionStorage.setItem('authUser', auth.currentUser.uid); */  //Save the signed in user id in session storage

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            swal({
                title: `${errorCode}`,
                text: `${errorMessage}`,
                icon: "error",
                button: "Okej",
            });
        })
}
//To get the current user, when user isn't signed in ,return null
export function User() {
    return auth.currentUser;
}




export function doSignOut() {
    signOut(auth).then(() => {
        // Remove all saved data from sessionStorage
        /* sessionStorage.clear(); */
        // Sign-out successful.
        swal({
            title: "Loggade ut",
            icon: "success",
            button: "Okej",
        });
    }).catch((error) => {
        // An error happened.
        swal({
            title: `${error}`,
            icon: "error",
            button: "Okej",
        });
    });
}

//update list items 2021/10/27

export function saveItem(currentUser, listName, item) {

    const db = getDatabase();
    set(ref(db, 'users/' + currentUser + '/lists/' + listName + '/' + item.value), {
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
            //console.log("Item saved successfully")
        })
        .catch((error) => {
            swal({
                title: `${error}`,
                icon: "error",
                button: "Okej",
            });
        })
}

export function deleteItem(currentUser, listName, item) {

    const db = getDatabase();

    remove(ref(db, 'users/' + currentUser + '/lists/' + listName + '/' + item.value))
        .then(() => {
            //console.log("Item deleted")
        })
        .catch((error) => {
            swal({
                title: `${error}`,
                icon: "error",
                button: "Okej",
            });
        })
}




