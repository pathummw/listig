import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useEffect, useState, useContext, Component, createContext } from 'react'
/* import { AuthUserContext } from './SignIn' */
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Home from "./Home";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from "./PrivateRoute";
import NewListPopup from "./NewListPopup";
import ShoppingList from "./ShoppingList";
import ClimateImpact from "./ClimateImpact";
import Alternative from "./Alternative";

const AuthUserContext = createContext();

function App() {



  const [currentUser, setCurrentUser] = useState(null)
  const [isUserSignedIn, setIsUserSignedIn] = useState(false)
  /* const [uid, setUid] = useState(); */

  /*  const value = useContext(AuthUserContext); */

  const auth = getAuth();
  useEffect(() => {


    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("User signed In: OnAuthstatgeChanged")
        const uid = user.uid;
        console.log("UID: " + uid)
        setCurrentUser(uid)
        setIsUserSignedIn(true)
        console.log("Current USER: " + currentUser)
      } else {
        console.log("User signed out: OnAuthstatgeChanged")
        setCurrentUser(null)
        setIsUserSignedIn(false)
      }
    })

    return unsubscribe;  //when unmount component, unsubscribe onAuthStateChanged


  }, [])


  return (
    <AuthUserContext.Provider value={currentUser} >
      <Router>
        <div>
          <Switch>
            {/* <Route path="/signin" component={SignIn} /> */}
            <PrivateRoute exact path="/" component={Home} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route path="/create-new-list" component={NewListPopup} />
            <Route path="/shopping-list" component={ShoppingList} />
            <Route path="/climate-impact" component={ClimateImpact} />
            <Route path="/alternative" component={Alternative} />
          </Switch>
        </div>
      </Router>
    </AuthUserContext.Provider>
  );


}

export default App;
export { AuthUserContext };


/* const newContext = React.createContext({ color: 'black' });

const value = useContext(newContext);

console.log(value); */ // this will return { color: 'black' }