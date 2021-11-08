import React from 'react'
import styled from 'styled-components'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Button = styled.button`
    display: flex;
    align-items: center;
    font-style: italic;
    font-size: 15px;
    border: none;
    background-color: transparent;
    margin-top: 20px;
`

export default function BackButton() {
    return (
        <div>
            <Button> <ArrowBackIcon /> Back</Button>
        </div>
    )
}
