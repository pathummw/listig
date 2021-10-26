import React from 'react'
import { useLocation } from 'react-router-dom'

export default function Alternative() {

    const location = useLocation();
    const item = location.state?.item;

    return (
        <div>
            <h1>Hej Alternativ varor </h1>
            {console.log(item)}
        </div>
    )
}
