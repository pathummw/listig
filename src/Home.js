import React, { useState } from 'react'
import { doSignOut } from "./firebase"
import { Link, useHistory } from 'react-router-dom'

export default function Home(props) {

    const [error, setError] = useState('')
    const history = useHistory()


    async function handleSignOut() {
        setError('')

        try {
            await doSignOut()
            history.push('/signin')
        } catch {
            setError('Failed to sign out')
        }

    }
    return (
        <div>
            <h3>Hello home component{props.currentUser}</h3>
            <button onClick={() => handleSignOut()}>Sign out</button>
            <Link to="/create-new-list">Ny list</Link>
            {/* <CreateList /> */}
        </div>
    )
}

function CreateList() {
    return (
        <div>
            <button>Ny lista +</button>
        </div>

    );
}