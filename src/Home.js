import React from 'react'

export default function Home(props) {
    return (
        <div>
            <h3>Hello home component{props.currentUser}</h3>
            <CreateList />
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