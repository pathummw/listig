import { useRef, useState, createContext } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { signin } from "./firebase"
import styled from 'styled-components';
import { devices } from './GlobalStyles';
import BackgroundImage from './img/trees.svg'

/* const history = useHistory() */
/* const AuthUserContext = createContext(); */

const SignInContainer = styled.div`
    background-color: #DEDEDE;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: auto;
    background-image: url(${BackgroundImage});
    background-repeat: no-repeat;
    /* background-position: center; */
    background-position: 30% 200px;
    /* background-size: cover; */ /* Resize the background image to cover the entire container */
`

const Form = styled.form`
    width: 65vw;
    background: #F7F7F7;
    text-align: left;
    padding: 25px;
    border-radius: 10px;
    @media ${devices.tablet} {
        /* margin: 10px; */
    }
`

const Input = styled.input`
    display: block;
    padding: 10px 6px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    color: #E2E2E2;
    background-color: green;
    border-radius: 10px;
    margin: 20px 0;
    background: green;
`

const Button = styled.button`
    width: 100%;
    background: #FFD449;
    border: 0;
    padding: 10px 20px;
    margin: 30px 0;
    color: #3E3E3E;
    border-radius: 10px;

`

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
            /*  setError('')
             setLoading(true) */
            await signin(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch {
            /* setError("Failed to sign in") */
        }

        /* setLoading(false) */
    }



    return (

        <SignInContainer>
            <h1>LISTIG</h1>
            <Form onSubmit={handleSubmit}>
                <Input type="email" ref={emailRef} />
                <Input type="password" ref={passwordRef} />
                <Button>LOGGA IN</Button>
            </Form>
            {/* <span>{sessionStorage.getItem('authUser')}</span> */}
            <span>Need an account? <Link to="/signup">Sign up</Link> </span>

        </SignInContainer>
    )

    /*  export default AuthUserContext; */
}

/* export { AuthUserContext }; */

