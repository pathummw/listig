import React from 'react'
import { useLocation } from 'react-router-dom'

export default function ClimateImpact() {

    const location = useLocation();
    const item = location.state?.item;

    return (
        <div>
            <h1>Hej Climate påverkan {item.value}</h1>
            {console.log(item)}
        </div>
    )
}
