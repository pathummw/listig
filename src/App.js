import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { useEffect, useState } from 'react'
import { authStateChanged } from './firebase'

function App() {

  const [user, setUser] = useState()

  useEffect(() => {
    setUser(authStateChanged())
    if (user) {
      console.log("User uid from App: " + user.uid)
    }

  }, [])


  return (
    <div>
      <h1>Hello App</h1>
      {/* <SignUp /> */}
      <SignIn />
    </div>
  );
}

export default App;
