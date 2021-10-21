import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    input{
        width: 30px;
        text-align: center;
    }
`

export default function QuantityComponent() {

    const [number, setNumber] = useState(1);
    const [quantityType, setQuantityType] = useState('st');

    const handlePlus = () => {
        setNumber(number + 1);
    }
    const handleMinus = () => {
        if (number === 1) {
            alert("Vänta..want to delete item")
        } else {  //When user click the (-) button, delete the item when the Q is = 0
            setNumber(number - 1);
        }


    }



    return (
        <Container>
            <button onClick={handleMinus}>-</button>
            <input type="text" value={number} />
            <button onClick={handlePlus}>+</button>
            <span>{quantityType}</span>
        </Container>
    )
}
