import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { GROCERY_ITEMS_DATA } from './data'
import Checkbox from '@mui/material/Checkbox';
import styled from 'styled-components'
import { saveItem, deleteItem } from './firebase'

const Container = styled.div`
    display: flex; 
    flex-direction: column;
    height: 100vh;
`

const Ul = styled.ul`
    list-style-type: none;
    padding: 0;
`

const Li = styled.li`
    display: flex;
    height: 70px;
    background-color: whitesmoke;
    margin: 10px;
    align-items: center;
    border-radius: 10px;
`

const Button = styled.button`
    position: absolute;
    bottom: 5px;
    border-radius: 5px;
    border: none;
    background-color: #111827;
    padding: 5px 20px;
    color: white;
    cursor: pointer;
    :hover{
        background-color: #374151;
    }
`

export default function Alternative() {

    const location = useLocation();
    const item = location.state?.item;
    const authUserId = location.state?.authUserId;
    const listName = location.state?.listName;

    console.log(location.state)

    const [alternativeItemsArray, setAlternativeItemsArray] = useState([]);

    useEffect(() => {


        const result = GROCERY_ITEMS_DATA.filter(i => i.group === item.group && i.value !== item.value)

        setAlternativeItemsArray(result);

        return () => {
            //cleanup
        }
    }, [])

    const handleChangeCheckbox = (data) => {
        console.log(data)
        saveItem(authUserId, listName, data); //Send selected item to firebase save function to save to db

        //Delete item after slecting the alternative item
        deleteItem(authUserId, listName, item);

    }

    const onClickChangeItem = () => {

    }

    return (

        <Container>
            <h1>Hej Alternativ varor </h1>
            <Ul>
                {alternativeItemsArray && alternativeItemsArray.map(data => (
                    <Li key={data.id}> <Checkbox onChange={() => handleChangeCheckbox(data)} />
                        <span>{data.label}</span> <GreenPointsPercentage green_points={data.green_points} />
                    </Li>
                ))
                }
            </Ul>


            <Button onClick={onClickChangeItem}>BYT UT VARAN</Button>
        </Container>
    )
}


const PercentageContainer = styled.div`
    display: flex;
    height: 50px;
    width: 50px;
    border-radius: 50%;
    background-color: ${props => props.percentage > 50 ? 'green' : 'red'};
    position: absolute;
    right: 80px;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: large;
    span{
        font-size: 0.6rem;
    }
`

const GreenPointsPercentage = ({ green_points }) => {

    const percentage = ((green_points / 5) * 100);

    return (

        <PercentageContainer percentage={percentage} >
            {percentage} <span>%</span>
        </PercentageContainer>

    )
}
