import React, { useRef, useState } from 'react'
import { signup } from "./firebase"
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components'
import BackgroundImage from './img/trees.svg'
import { devices } from './GlobalStyles';
import swal from 'sweetalert';

const SignUpContainer = styled.div`
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
    padding: 25px;
    border-radius: 10px;
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
    font-family:  Roboto;
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

export default function SignUp() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        if (validateEmail(emailRef.current.value) && passwordRef.current.value !== passwordConfirmRef.current.value) {
            swal({
                title: "Lösenordet matchar inte",
                text: "Försök igen",
                icon: "error",
                button: "Okej",
            });


            passwordRef.current.value = '';
            passwordConfirmRef.current.value = '';

        } else {
            try {
                setLoading(true)
                await signup(emailRef.current.value, passwordRef.current.value)
                history.push('/')
            } catch {
                swal({
                    title: "Det gick inte att skapa ett konto",
                    text: "Försök igen",
                    icon: "error",
                    button: "Okej",
                });
            }
        }



        setLoading(false)

    }

    const validateEmail = (email) => {
        var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (email.match(validRegex)) {
            return true;
        } else {
            return false;
        }
    }


    return (
        <SignUpContainer>
            <Form onSubmit={handleSubmit}>
                <Input type="email" ref={emailRef} placeholder="E-mail" />
                <Input type="password" ref={passwordRef} placeholder="Lösenord" />
                <Input type="password" ref={passwordConfirmRef} placeholder="Bekräfta lösenord" />
                <Button disabled={loading} type="submit">SKAPA KONTO</Button>

                <span>Har du redan ett konto? <Link to="/signin">Logga in</Link> </span>
            </Form>
        </SignUpContainer>
    )
}

