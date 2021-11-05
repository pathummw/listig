import { set } from '@firebase/database'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'


const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(104, 104, 104, 0.31);
    height: 100vh;
`
const Modal = styled.div`
    display: flex;
    flex-direction: column;
    width: 80vw;
    /* height: 200px; */
    background-color: whitesmoke;
    padding: 20px;
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 0 30px;
`
const Button = styled.button`
    background-color: #C4C4C4;
    color: white;
    border: none;
    text-align: center;
    font-family: Roboto;
    border-radius: 10px;
    padding: 5px 10px;
    text-transform: uppercase;
    width: 100px;
    margin: 10px;

    ${props => props.create && css`
    background: #26AE60;
    
  `}
`
const Input = styled.input`
    border: none;
    border-bottom: 1px solid #57B894;
    background-color: transparent;
    padding: 5px;
    font-style: italic;
    color: rgba(2, 2, 2, 0.48);
    margin-bottom: 10px;
`



export default function NewListPopup() {

    const [listName, setListName] = useState('');

    useEffect(() => {
        const today = new Date();

        setListName(`Handla ${today.toDateString()}`)
        return () => {
            //cleanup
        }
    }, [])

    const handleChange = (e) => {
        setListName(e.target.value);
    }

    return (
        <Container>
            <Modal>
                <h2>Skapa inköpslista</h2>
                <p>Skriv in det namn du vill ha på din inköpslista.</p>
                <Input type="text" onChange={handleChange} value={listName} />
                <ButtonContainer>
                    <Link to="/">
                        <Button>Cancel</Button>
                    </Link>
                    <Link
                        to={{
                            pathname: "/shopping-list",
                            state: {
                                name: listName,
                                new_list: true
                            }
                        }}
                    >
                        <Button create>Create</Button>
                    </Link>

                </ButtonContainer>
            </Modal>

        </Container>
    )
}
