import { useRef, useState, createContext } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { signin } from "./firebase"

/* const history = useHistory() */


/* const AuthUserContext = createContext(); */

export default function SignIn() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const [authUid, setAuthUid] = useState();





    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError('')
            setLoading(true)
            await signin(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch {
            setError("Failed to sign in")
        }

        setLoading(false)
    }



    return (

        <div>
            <h1>Sign in</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" ref={emailRef} />
                <input type="password" ref={passwordRef} />
                <button>Sign in</button>
            </form>
            <span>{sessionStorage.getItem('authUser')}</span>
            <span>Need an account? <Link to="/signup">Sign up</Link> </span>

        </div>
    )

    /*  export default AuthUserContext; */
}

/* export { AuthUserContext }; */

