import { useRef, useState, createContext, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { signin } from "./firebase"
import styled from 'styled-components';
import { devices } from './GlobalStyles';
import BackgroundImage from './img/trees.svg'
import { Redirect } from "react-router";
import { AuthContext } from "./Auth.js";
import swal from 'sweetalert';




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
    background-size: cover; 
    @media ${devices.iPhone5}{
        background-position: 30% 150px;
    }
    @media ${devices.iphone6_7_8_X}{
        background-position: 30% 220px;
    }
    
`

const Form = styled.form`
    width: 65vw;
    background: #F7F7F7;
    text-align: left;
    padding: 50px 25px;
    border-radius: 10px;
    margin-bottom: 60px;
    @media ${devices.tablet} {
    }
`

const Input = styled.input`
    display: block;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
    border: none;
    color: #000000;
    border-radius: 10px;
    margin: 20px 0;
    font-family:  "Roboto";
    background-color: #E2E2E2;
    &:-webkit-autofill,   //to change the auto complete browser background color for inputs
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
    -webkit-transition: "background-color";
    -webkit-transition-delay: 9999s;
    }
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
const H3 = styled.h3`
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #E6E6E6;
    line-height: 0.1em;
    margin: 10px 0 20px;
    span{
        background: #F7F7F7;
        padding: 0 10px;
        color: #000000;
        font-weight: 300;
        font-size: small;
    }
`

const SignupSpan = styled.span`
    font-weight: 300;
    font-size: small;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
`

const Listig = styled.h1`
    font-family: "Ubuntu";
    margin-bottom: 50px;
    font-weight: 400;
    font-size: 3rem;
`
const H4 = styled.h4`
   margin-bottom: 20px; 
`

export default function SignIn() {
    const emailRef = useRef('email')
    const passwordRef = useRef('lösenord')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()



    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await signin(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch {
            swal({
                title: "Något gick fel",
                text: "Försök igen",
                icon: "error",
                button: "Okej",
            });

        }

        /* setLoading(false) */
    }

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/" />;
    }


    return (

        <SignInContainer>
            <Listig>LISTIG</Listig>
            <H4>KLIMATSMARTA INKÖPSLISTOR</H4>
            <Form onSubmit={handleSubmit}>
                <Input type="email" ref={emailRef} />
                <Input type="password" ref={passwordRef} />
                <Button>LOGGA IN</Button>
                <H3><span>Eller</span></H3>
                <SignupSpan>Behöver ett konto?&nbsp; <Link to="/signup"> &nbsp;Skapa konto </Link> </SignupSpan>
            </Form>


        </SignInContainer>
    )

}




