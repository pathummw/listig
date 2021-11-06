import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { GROCERY_ITEMS_DATA } from './data'
import Checkbox from '@mui/material/Checkbox';
import styled from 'styled-components'
import { saveItem, deleteItem } from './firebase';
import { Link, useHistory } from 'react-router-dom';
import Alternatives from './img/alternatives.svg'
import { devices } from './GlobalStyles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import swal from 'sweetalert';


const Container = styled.div`
    display: flex; 
    flex-direction: column;
    height: 100vh;
    background-image: url(${Alternatives});
    background-repeat: no-repeat;
    background-size: 60%; 
    @media ${devices.iPhone5}{
        /* background-position: bottom; */
        background-position: 50% 60vh;
    }
    margin: 0 20px;
`

const Ul = styled.ul`
    list-style-type: none;
    padding: 0;
`

const Li = styled.li`
    display: flex;
    height: 70px;
    background-color: whitesmoke;
    align-items: center;
    border-radius: 10px;
    margin: 15px 0;
`
const Button = styled.button`
    display: flex;
    align-items: center;
    font-style: italic;
    font-size: 15px;
    border: none;
    background-color: transparent;
    margin-top: 20px;
`

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
const H1 = styled.h1`
    text-align: center;
`

export default function Alternative() {

    const location = useLocation();
    const item = location.state?.item;
    const authUserId = location.state?.authUserId;
    const listName = location.state?.listName;

    let history = useHistory();


    const [alternativeItemsArray, setAlternativeItemsArray] = useState([]);
    const [itemName, setItemName] = useState('');

    useEffect(() => {

        let isMounted = true;

        const result = GROCERY_ITEMS_DATA.filter(i => i.group === item.group && i.value !== item.value && i.green_points >= 3);
        setAlternativeItemsArray(result);

        if (isMounted) {
            setItemName(item.label);
        }

        return () => {
            isMounted = false;
        }
    }, [])

    const handleChangeCheckbox = (data) => {
        //Send selected item to firebase save function to save to db
        saveItem(authUserId, listName, data)
        //Delete item after slecting the alternative item
        deleteItem(authUserId, listName, item);

        swal({
            title: `${item.label} bytt ut med`,
            text: `${data.label}`,
            icon: "success",
            button: "Okej",
        });

    }



    return (

        <Container>
            <Button onClick={() => history.goBack()}> <ArrowBackIcon /> Back</Button>

            <H1>{itemName} </H1>
            <p> Alternativ till {itemName}</p>

            <Ul>
                {alternativeItemsArray && alternativeItemsArray.map(data => (
                    <Li key={data.id}> <Checkbox onChange={() => handleChangeCheckbox(data)} />
                        <span>{data.label}</span> <GreenPointsPercentage green_points={data.green_points} />
                    </Li>
                ))
                }
            </Ul>

        </Container>
    )
}

const GreenPointsPercentage = ({ green_points }) => {

    const percentage = ((green_points / 5) * 100);

    return (

        <PercentageContainer percentage={percentage} >
            {percentage} <span>%</span>
        </PercentageContainer>

    )
}
