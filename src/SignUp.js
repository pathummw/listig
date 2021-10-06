import React, { useRef } from 'react'

import { signup } from "./firebase"

export default function SignUp() {

    const emailRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = (e) => {

        e.preventDefault()
        signup(emailRef.current.value, passwordRef.current.value)
        console.log(emailRef.current.value)
    }


    return (
        <form onSubmit={handleSubmit}>
            <input type="email" ref={emailRef} name="" id="" />
            <input type="password" ref={passwordRef} name="" id="" />
            <input type="password" name="" id="" />
            <button type="submit">Sign up</button>
        </form>
    )
}

