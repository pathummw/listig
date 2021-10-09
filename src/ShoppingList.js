import React from 'react'
import { useLocation } from 'react-router-dom'

export default function ShoppingList() {
    const location = useLocation()
    const name = location.state?.name

    return (
        <div>
            <h1>Here is your shopping list {name}</h1>
            {console.log(name)}
        </div>
    )
}
