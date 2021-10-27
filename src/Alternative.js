import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { GROCERY_ITEMS_DATA } from './data'

export default function Alternative() {

    const location = useLocation();
    const item = location.state?.item;

    const [alternativeItemsArray, setAlternativeItemsArray] = useState([]);

    useEffect(() => {


        const result = GROCERY_ITEMS_DATA.filter(i => i.group === item.group && i.value !== item.value)

        setAlternativeItemsArray(result);

        return () => {
            //cleanup
        }
    }, [])

    return (

        <div>
            <h1>Hej Alternativ varor </h1>
            {alternativeItemsArray && alternativeItemsArray.map(data => (
                <li>
                    <p>{data.label}</p>
                </li>
            ))
            }
        </div>
    )
}
