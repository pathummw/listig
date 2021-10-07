import { useRef, useState, createContext } from 'react'
import { signin } from "./firebase"
import { doSignOut } from "./firebase"

const AuthUserContext = createContext();

export default function SignIn() {
    const emailRef = useRef()
    const passwordRef = useRef()

    const [authUid, setAuthUid] = useState();





    const handleSubmit = (e) => {
        e.preventDefault();
        (signin(emailRef.current.value, passwordRef.current.value))


    }

    const handleSignOut = () => {
        doSignOut()
    }

    return (

        <AuthUserContext.Provider value={5} >
            <div>
                <form onSubmit={handleSubmit}>
                    <input type="email" ref={emailRef} name="" id="" />
                    <input type="password" ref={passwordRef} name="" id="" />
                    <button>Sign in</button>
                </form>
                <span>{sessionStorage.getItem('authUser')}</span>

                <button onClick={() => handleSignOut()}>Sign out</button>
            </div>
        </AuthUserContext.Provider>
    )

    /*  export default AuthUserContext; */
}

export { AuthUserContext };

