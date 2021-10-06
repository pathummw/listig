import React, { useRef } from 'react'
import { signin } from "./firebase"

export default function SignIn() {
    const emailRef = useRef()
    const passwordRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        signin(emailRef.current.value, passwordRef.current.value)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" ref={emailRef} name="" id="" />
                <input type="password" ref={passwordRef} name="" id="" />
                <button>Sign in</button>
            </form>
        </div>
    )
}
