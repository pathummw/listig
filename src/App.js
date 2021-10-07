import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useEffect, useState, useContext } from 'react'
import { AuthUserContext } from './SignIn'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home from "./Home";

function App() {



  const [currentUser, setCurrentUser] = useState(null)
  /* const [uid, setUid] = useState(); */

  /*  const value = useContext(AuthUserContext); */

  const auth = getAuth();
  useEffect(() => {


    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User signed In: OnAuthstatgeChanged")
        const uid = user.uid;
        console.log("UID: " + uid)
        setCurrentUser(uid)
        console.log("Current USER: " + currentUser)
      } else {
        console.log("User signed out: OnAuthstatgeChanged")
        setCurrentUser(null)
      }
    })




  }, [])

  const setUser = (e) => {
    console.log("Callback func")
    console.log("Call back E: " + e);
  }



  return (
    <div>
      <h1>Hello App</h1>
      {/* <SignUp /> */}
      <SignIn />
      <h3>Current user {currentUser}</h3>
      {currentUser && (

        <Home currentUser={currentUser} />
      )

      }

    </div>
  );
}

export default App;



/* const newContext = React.createContext({ color: 'black' });

const value = useContext(newContext);

console.log(value); */ // this will return { color: 'black' }