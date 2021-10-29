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

export default function QuantityComponent(props) {

    const [quantity, setQuantity] = useState(1);
    const [quantityType, setQuantityType] = useState('st');

    const handlePlus = () => {
        setQuantity(quantity + 1);
        props.handleCallback(quantity + 1); //Call back funtion to send quantity data to parent component
    }
    const handleMinus = () => {
        /* if (quantity === 1) {
            alert("Vänta..want to delete item")
        } else */ {  //When user click the (-) button, delete the item when the Q is = 0
            setQuantity(quantity - 1);
            props.handleCallback(quantity - 1);
        }

    }

    const handleOnChange = (e) => {
        setQuantity(e.target.value);
        props.handleCallback(e.target.value)
    }

    return (
        <Container>
            <Component>
                <ButtonMinus onClick={handleMinus}>-</ButtonMinus>
                <input type="text" value={quantity} onChange={handleOnChange} />
                <ButtonPlus onClick={handlePlus}>+</ButtonPlus>
            </Component>

            <span>{quantityType}</span>
        </Container>
    )
}
