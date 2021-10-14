import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export default function NewListPopup() {

    const [listName, setListName] = useState('');
    const listNameRef = useRef()
    /* const test = listNameRef.current.value */
    const handleChange = (e) => {
        setListName(e.target.value);
    }

    return (
        <div>
            <h2>Create new list</h2>
            <input type="text" onChange={handleChange} />
            <Link
                to={{
                    pathname: "/shopping-list",
                    state: {
                        name: listName,
                        new_list: true
                    }
                }}
            >
                <button>Create</button>
            </Link>
            <Link to="/">
                <button>Cancel</button>
            </Link>
        </div>
    )
}
