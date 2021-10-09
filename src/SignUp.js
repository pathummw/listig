import React, { useRef, useState } from 'react'
import { signup } from "./firebase"
import { Link, useHistory } from 'react-router-dom';

export default function SignUp() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Password do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            history.push('/')
        } catch {
            setError('Failed to create an account')
        }

        setLoading(false)


    }


    return (
        <form onSubmit={handleSubmit}>
            {error}
            <input type="email" ref={emailRef} placeholder="E-mail" />
            <input type="password" ref={passwordRef} placeholder="Password" />
            <input type="password" ref={passwordConfirmRef} placeholder="Confirm password" />
            <button disabled={loading} type="submit">Sign up</button>

            <span>Already have an account? <Link to="/signin">Sign in</Link> </span>
        </form>
    )
}

