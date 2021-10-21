import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    /* display: flex; */
    
    input{
        width: 30px;
    }
`

export default function QuantityComponent() {
    return (
        <Container>
            <button>-</button>
            <input type="text" />
            <button>+</button>
        </Container>
    )
}
