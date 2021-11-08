import React, { useEffect, useState } from 'react'
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
        background-color: #5F5F5F;
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
    color: whitesmoke;
`
const ButtonPlus = styled.button`
    border-radius: 0 3px 3px 0;
    color: whitesmoke;
`

const QTypeSpan = styled.span`
    padding-left: 5px;
`

export default function QuantityComponent(props) {

    const [quantity, setQuantity] = useState(1);
    const [quantityType, setQuantityType] = useState('st');

    useEffect(() => {
        let isLoading = true;

        if (isLoading) {
            setQuantity(props.quantity); //Set the quantity on Q input that get from db
            setQuantityType(props.quantity_type)
        }

        return () => {
            isLoading = false;
        }
    }, [])


    const handlePlus = () => {
        setQuantity(Number(quantity) + 1);
        props.handleCallback(Number(quantity) + 1); //Call back funtion to send quantity data to parent component
    }
    const handleMinus = () => {
        /* if (quantity === 1) {
            alert("Vänta..want to delete item")
        } else */ {  //When user click the (-) button, delete the item when the Q is = 0
            setQuantity(Number(quantity) - 1);
            props.handleCallback(Number(quantity) - 1);
        }

    }

    const handleOnChange = (e) => {
        setQuantity(Number(e.target.value));
        props.handleCallback(Number(e.target.value))
    }

    return (
        <Container>
            <Component>
                <ButtonMinus onClick={handleMinus}>-</ButtonMinus>
                <input type="text" value={quantity} onChange={handleOnChange} />
                <ButtonPlus onClick={handlePlus}>+</ButtonPlus>
            </Component>

            <QTypeSpan>{quantityType}</QTypeSpan>
        </Container>
    )
}
