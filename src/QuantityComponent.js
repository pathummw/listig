import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    padding: none;
`
const Component = styled.div`
    input{
        width: 30px;
        height: 18px;
        text-align: center;
        border: none;
        padding: none;

    }
    & > button{ 
        background-color: #008B52;
        cursor: pointer;
        border: none;
        text-align: center;
        padding: 0;
        height: 20px;
        width: 20px;
    }
    
`

const ButtonMinus = styled.button`
    border-radius: 3px 0 0 3px;
`
const ButtonPlus = styled.button`
    border-radius: 0 3px 3px 0;
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
            <Component>
                <ButtonMinus onClick={handleMinus}>-</ButtonMinus>
                <input type="text" value={number} />
                <ButtonPlus onClick={handlePlus}>+</ButtonPlus>
            </Component>



            <span>{quantityType}</span>
        </Container>
    )
}
